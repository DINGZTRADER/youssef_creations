'use client';
import { useEffect, useState } from 'react';
import { PRODUCTS, STORE } from '../data';
const money=n=>`UGX ${Number(n).toLocaleString('en-UG')}`;
export default function Admin(){
  const [products,setProducts]=useState(PRODUCTS); const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({name:'',category:'Complete Looks',price:'',image:'',badge:''});
  useEffect(()=>{try{const s=localStorage.getItem('yc-products');if(s)setProducts(JSON.parse(s));}catch{}},[]);
  const persist=next=>{setProducts(next);localStorage.setItem('yc-products',JSON.stringify(next));setSaved(true);setTimeout(()=>setSaved(false),1200)};
  const upload=e=>{const f=e.target.files?.[0]; if(!f)return; const r=new FileReader();r.onload=()=>setForm(v=>({...v,image:r.result}));r.readAsDataURL(f)};
  const add=e=>{e.preventDefault();if(!form.name||!form.price||!form.image)return;persist([{...form,id:`custom-${Date.now()}`,price:Number(form.price),inStock:true},...products]);setForm({name:'',category:'Complete Looks',price:'',image:'',badge:''})};
  return <main className="admin-shell"><header className="admin-head"><div><p className="eyebrow">YousefCreationz</p><h1>Shop Manager</h1><p>Add today’s WhatsApp-status products, update prices, or hide sold-out items.</p></div><a className="button button-dark" href="/">View storefront</a></header>
  <aside className="admin-note"><b>Prototype manager:</b> changes persist on this browser for the demonstration. The live client version should use shared cloud storage so updates appear to every customer.</aside>
  <form className="admin-form" onSubmit={add}><h2>Add a new product</h2><div className="admin-grid"><label>Product name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Complete Looks</option><option>Trousers</option><option>Jerseys</option><option>Underwear</option><option>Jewelry</option><option>Accessories</option></select></label><label>Price (UGX)<input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label><label>Badge<input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} placeholder="New in / Best seller"/></label><label className="wide">Product photo<input type="file" accept="image/*" onChange={upload}/></label></div><button className="button button-dark">Publish product</button>{saved&&<span className="saved">Saved</span>}</form>
  <section className="admin-list"><div className="section-heading"><div><p className="eyebrow">Current catalogue</p><h2>{products.length} products</h2></div><button className="text-button" onClick={()=>persist(PRODUCTS)}>Reset demo catalogue</button></div>{products.map(p=><article className="admin-row" key={p.id}><img src={p.image} alt=""/><div><b>{p.name}</b><small>{p.category} · {money(p.price)}</small></div><label className="stock"><input type="checkbox" checked={p.inStock!==false} onChange={e=>persist(products.map(x=>x.id===p.id?{...x,inStock:e.target.checked}:x))}/> In stock</label>{p.id.startsWith('custom-')&&<button className="danger" onClick={()=>persist(products.filter(x=>x.id!==p.id))}>Delete</button>}</article>)}</section>
  <footer className="admin-footer">Orders and enquiries go to WhatsApp {STORE.whatsappDisplay}.</footer></main>
}
