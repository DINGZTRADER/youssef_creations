'use client';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { PRODUCTS, STORE } from '../data';

const CLOUDINARY_CLOUD='lnivmgk9';
const CLOUDINARY_PRESET='yousef_products';
const MANAGER_EMAILS=['yousefcreationz@gmail.com','wachaexperience@gmail.com'];
const googleProvider=new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});
const money=n=>n==null?'Ask for price':`UGX ${Number(n).toLocaleString('en-UG')}`;
const categories=['Polos','T-Shirts','Knitwear','Trousers','Shorts','Jerseys','Sandals','Underwear','Jewelry','Accessories','Styled Looks'];
const blank={name:'',category:'Polos',price:'',desc:'',badge:'',photo:null};
const isManager=email=>MANAGER_EMAILS.includes(email?.toLowerCase());

export default function Admin(){
  const [user,setUser]=useState(null);
  const [products,setProducts]=useState([]);
  const [form,setForm]=useState(blank);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);

  useEffect(()=>onAuthStateChanged(auth,async current=>{
    if(current&&!isManager(current.email)){
      await signOut(auth);
      setStatus('This Google account is not authorised for Shop Manager.');
      setUser(null);
      return;
    }
    setUser(current);
  }),[]);
  useEffect(()=>{
    if(!user)return;
    const q=query(collection(db,'products'),orderBy('sortOrder','asc'));
    return onSnapshot(q,s=>setProducts(s.docs.map(d=>({id:d.id,...d.data()}))),e=>setStatus(`Could not load catalogue: ${e.message}`));
  },[user]);

  const login=async e=>{e.preventDefault();setStatus('Signing in…');try{const result=await signInWithEmailAndPassword(auth,email.trim(),password);if(!isManager(result.user.email)){await signOut(auth);setStatus('This account is not authorised for Shop Manager.');return;}setStatus('');}catch(err){setStatus(err.code==='auth/invalid-credential'?'Incorrect email or password.':err.message)}};
  const googleLogin=async()=>{
    setStatus('Opening Google sign in…');
    try{
      const result=await signInWithPopup(auth,googleProvider);
      if(!isManager(result.user.email)){
        await signOut(auth);
        setStatus('This Google account is not authorised for Shop Manager.');
        return;
      }
      setStatus('');
    }catch(err){
      if(err.code==='auth/popup-closed-by-user')setStatus('Google sign in was cancelled.');
      else if(err.code==='auth/operation-not-allowed')setStatus('Google sign in is not enabled in Firebase yet.');
      else setStatus(`Google sign in failed: ${err.message}`);
    }
  };

  const uploadToCloudinary=async file=>{
    const body=new FormData();
    body.append('file',file);
    body.append('upload_preset',CLOUDINARY_PRESET);
    const res=await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,{method:'POST',body});
    const data=await res.json();
    if(!res.ok||!data.secure_url)throw new Error(data?.error?.message||'Cloudinary upload failed');
    return data;
  };

  const upload=async e=>{
    e.preventDefault();
    if(!form.name.trim()||!form.photo)return setStatus('Add a product name and photo.');
    setBusy(true);setStatus('Uploading photo…');
    try{
      const uploaded=await uploadToCloudinary(form.photo);
      setStatus('Saving product…');
      const nextSort=(products.reduce((m,p)=>Math.max(m,Number(p.sortOrder)||0),0)||0)+1;
      await addDoc(collection(db,'products'),{
        name:form.name.trim(),category:form.category,price:form.price===''?null:Number(form.price),desc:form.desc.trim(),badge:form.badge.trim(),image:uploaded.secure_url,cloudinaryPublicId:uploaded.public_id,inStock:true,sortOrder:nextSort,createdAt:serverTimestamp(),updatedAt:serverTimestamp()
      });
      setForm(blank);const input=document.getElementById('product-photo');if(input)input.value='';setStatus('Published to the website.');setTimeout(()=>setStatus(''),2200);
    }catch(err){setStatus(`Upload failed: ${err.message}`)}finally{setBusy(false)}
  };
  const seed=async()=>{
    setBusy(true);setStatus('Publishing current catalogue…');
    try{
      const existing=await getDocs(collection(db,'products'));
      if(!existing.empty&&!confirm('The shared catalogue already has products. Add/update the current starter catalogue as well?')){setBusy(false);setStatus('');return;}
      for(let i=0;i<PRODUCTS.length;i++){
        const p=PRODUCTS[i];
        await setDoc(doc(db,'products',p.id),{...p,sortOrder:i+1,createdAt:serverTimestamp(),updatedAt:serverTimestamp()},{merge:true});
      }
      setStatus('Current catalogue is now shared.');
    }catch(err){setStatus(`Could not publish catalogue: ${err.message}`)}finally{setBusy(false)}
  };
  const toggle=async p=>updateDoc(doc(db,'products',p.id),{inStock:p.inStock===false,updatedAt:serverTimestamp()});
  const edit=async p=>{
    const name=prompt('Product name',p.name);if(name===null)return;
    const price=prompt('Price in UGX (leave blank for Ask for price)',p.price??'');if(price===null)return;
    const desc=prompt('Description',p.desc||'');if(desc===null)return;
    await updateDoc(doc(db,'products',p.id),{name:name.trim(),price:price.trim()===''?null:Number(price),desc:desc.trim(),updatedAt:serverTimestamp()});
  };
  const remove=async p=>{if(!confirm(`Delete ${p.name}?`))return;await deleteDoc(doc(db,'products',p.id));};

  if(!user)return <main className="admin-shell"><header className="admin-head"><div><p className="eyebrow">YousefCreationz</p><h1>Shop Manager</h1><p>Upload products from your phone and publish them directly to the website.</p></div><a className="button button-dark" href="/">View shop</a></header><form className="admin-form" onSubmit={login} style={{maxWidth:520,marginTop:30}}><h2>Manager sign in</h2><button type="button" className="button button-outline" onClick={googleLogin} style={{width:'100%',marginBottom:16}}>Continue with Google</button><div style={{textAlign:'center',margin:'0 0 16px',opacity:.65}}>or use email and password</div><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label><button className="button button-dark">Sign in</button>{status&&<p className="saved">{status}</p>}</form></main>;

  return <main className="admin-shell">
    <header className="admin-head"><div><p className="eyebrow">YousefCreationz</p><h1>Shop Manager</h1><p>Take or choose a photo, add the details and tap Publish. The product appears on the website for everyone.</p></div><div><a className="button button-outline" href="/">View shop</a> <button className="text-button" onClick={()=>signOut(auth)}>Sign out</button></div></header>

    <form className="admin-form" onSubmit={upload} style={{marginTop:30}}><h2>Add a product</h2><div className="admin-grid">
      <label>Product name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Navy knit polo" required/></label>
      <label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
      <label>Price in UGX <small>(optional)</small><input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="50000"/></label>
      <label>Badge <small>(optional)</small><input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} placeholder="New / Best seller"/></label>
      <label className="wide">Description<textarea rows="3" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Colour, material, fit, sizes or styling notes"/></label>
      <label className="wide">Product photo<input id="product-photo" type="file" accept="image/*" capture="environment" onChange={e=>setForm({...form,photo:e.target.files?.[0]||null})} required/></label>
    </div><button className="button button-dark" disabled={busy}>{busy?'Publishing…':'Publish product'}</button>{status&&<span className="saved">{status}</span>}</form>

    {!products.length&&<aside className="admin-note"><b>First-time setup:</b> publish the existing catalogue once, then all future products can be managed here. <button className="button button-outline" onClick={seed} disabled={busy}>Publish current catalogue</button></aside>}

    <section className="admin-list"><div className="section-heading"><div><p className="eyebrow">Live catalogue</p><h2>{products.length} products</h2></div></div>{products.map(p=><article className="admin-row" key={p.id}><img src={p.image} alt=""/><div><b>{p.name}</b><small>{p.category} · {money(p.price)}</small><small>{p.desc||''}</small></div><label className="stock"><input type="checkbox" checked={p.inStock!==false} onChange={()=>toggle(p)}/> In stock</label><div><button className="text-button" onClick={()=>edit(p)}>Edit</button> <button className="danger" onClick={()=>remove(p)}>Delete</button></div></article>)}</section>
    <footer className="admin-footer">Orders and enquiries go to WhatsApp {STORE.whatsappDisplay}.</footer>
  </main>;
}
