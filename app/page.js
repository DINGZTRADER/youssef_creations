'use client';
import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, STORE } from './data';

const money = n => n == null ? 'Ask for price' : `UGX ${Number(n).toLocaleString('en-UG')}`;
const wa = text => `https://wa.me/${STORE.whatsappIntl}?text=${encodeURIComponent(text)}`;

function useProducts(){
  const [products,setProducts]=useState(PRODUCTS);
  useEffect(()=>{
    try { const saved=localStorage.getItem('yc-products'); if(saved) setProducts(JSON.parse(saved)); } catch{}
  },[]);
  return products.filter(p=>p.inStock!==false);
}

export default function Storefront(){
  const products=useProducts();
  const [category,setCategory]=useState('All');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(null);
  const [bag,setBag]=useState([]);
  const [concierge,setConcierge]=useState(false);
  const [budget,setBudget]=useState('200000');
  const [occasion,setOccasion]=useState('smart casual');

  const categories=['All',...new Set(products.map(p=>p.category))];
  const shown=useMemo(()=>products.filter(p=>{
    const categoryMatch=category==='All'||p.category===category;
    const text=`${p.name} ${p.category} ${p.badge||''} ${p.desc||''}`.toLowerCase();
    return categoryMatch&&text.includes(query.trim().toLowerCase());
  }),[products,category,query]);
  const total=bag.reduce((s,p)=>s+(p.price||0),0);
  const suggestions=useMemo(()=>{
    const max=Number(budget)||Infinity;
    let ranked=products.filter(p=>p.price==null||p.price<=max);
    const o=occasion.toLowerCase();
    if(o.includes('sport')) ranked=ranked.filter(p=>p.category==='T-Shirts'||p.category==='Shorts'||p.category==='Trousers');
    else if(o.includes('smart')||o.includes('date')||o.includes('event')||o.includes('party')) ranked=ranked.filter(p=>['Polos','Knitwear','Trousers','Styled Looks','Sandals'].includes(p.category));
    return ranked.slice(0,4);
  },[products,budget,occasion]);

  const add=p=>{ if(p.price!=null) setBag(v=>[...v,p]); };
  const remove=index=>setBag(v=>v.filter((_,i)=>i!==index));
  const itemMessage=p=>`Hello YousefCreationz, I am interested in:\n\n${p.name}\n${p.category}${p.price!=null?`\n${money(p.price)}`:''}\n\nPlease confirm availability, size/colour options${p.price==null?', price':''} and delivery in Kampala.`;
  const orderBag=()=>{
    const lines=bag.map((p,i)=>`${i+1}. ${p.name} — ${money(p.price)}`).join('\n');
    window.open(wa(`Hello YousefCreationz, I would like to order:\n${lines}\n\nEstimated total: ${money(total)}\nPlease confirm availability, size/colour options, payment instructions and Kampala delivery.`),'_blank','noopener,noreferrer');
  };
  const shareProduct=async p=>{
    const text=`${p.name} — ${money(p.price)} at YousefCreationz. Order on WhatsApp: ${wa(itemMessage(p))}`;
    try{
      if(navigator.share) await navigator.share({title:p.name,text});
      else await navigator.clipboard.writeText(text);
    }catch{}
  };

  const hero=products.find(p=>p.id==='classic-polos')||products[0];

  return <main>
    <header className="site-header">
      <a className="brand official-brand" href="#top"><img className="brand-logo" src={STORE.logo} alt="Yousef Creationz"/></a>
      <nav><a href="#collection">Shop</a><button onClick={()=>setConcierge(true)}>Concierge</button><a className="header-wa" target="_blank" rel="noreferrer" href={wa('Hello YousefCreationz, I am browsing your collection and would like some help.')}>WhatsApp</a><button className="bag-button" onClick={()=>document.getElementById('bag').showModal()}>Bag <span>{bag.length}</span></button></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">Kampala men’s fashion • order on WhatsApp</p><h1>See it. Love it. WhatsApp it.</h1><p className="hero-text">Browse the latest YousefCreationz looks, get instant styling help and send your order straight to WhatsApp. No complicated checkout.</p><div className="hero-actions"><a className="button button-dark" href="#collection">Shop latest products</a><button className="text-button" onClick={()=>setConcierge(true)}>Find my look ↗</button></div><div className="hero-trust"><span><b>01</b> Prices in UGX</span><span><b>02</b> Kampala delivery</span><span><b>03</b> Confirm before payment</span></div></div>
      {hero&&<div className="hero-image-wrap"><img src={hero.image} alt="YousefCreationz featured look"/><div className="hero-sticker"><span>Latest</span><span>Drop</span></div><div className="hero-caption">Tap a product, then order on WhatsApp <span>→</span></div></div>}
    </section>

    <section className="value-strip"><p>New drops <span>•</span> Personal styling <span>•</span> WhatsApp ordering <span>•</span> Kampala delivery</p></section>

    <section className="collection-section" id="collection">
      <div className="section-heading"><div><p className="eyebrow">Latest collection</p><h2>Shop what is available now.</h2></div><button className="concierge-link" onClick={()=>setConcierge(true)}>Need help choosing? Ask the concierge ↗</button></div>
      <div className="shop-tools"><label className="search-box"><span>Search</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search polos, trousers, sandals…"/></label><p>{shown.length} item{shown.length===1?'':'s'}</p></div>
      <div className="category-tabs">{categories.map(c=><button key={c} className={`category-tab ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div className="product-grid">{shown.map((p,i)=><article className={`product-card product-${(i%5)+1}`} key={p.id}><button className="product-image-wrap" onClick={()=>setSelected(p)}><img loading="lazy" src={p.image} alt={p.name}/>{p.badge&&<span className="product-badge">{p.badge}</span>}<span className="quick-add">View details <b>+</b></span></button><div className="product-info"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3></div><p className="product-price">{money(p.price)}</p></div><div className="card-actions"><a className="mini-wa" href={wa(itemMessage(p))} target="_blank" rel="noreferrer">{p.price==null?'Ask on WhatsApp':'Order on WhatsApp'}</a><button onClick={()=>shareProduct(p)} aria-label={`Share ${p.name}`}>Share</button></div></article>)}</div>
      {!shown.length&&<div className="empty-state"><h3>No matching products</h3><p>Try another category or ask us directly on WhatsApp.</p><a className="button button-dark" target="_blank" rel="noreferrer" href={wa('Hello YousefCreationz, I cannot find what I am looking for. Please help me.')}>Ask on WhatsApp</a></div>}
    </section>

    <section className="concierge-banner" id="concierge"><div className="concierge-icon">✦</div><div><p className="eyebrow">Your personal style shortcut</p><h2>Meet the smart concierge.</h2></div><p>Tell it the occasion and budget. It shortlists suitable items, then hands you to WhatsApp when you are ready.</p><button className="button button-light" onClick={()=>setConcierge(true)}>Find my look →</button></section>

    <section className="whatsapp-section"><div><p className="eyebrow">Fastest way to order</p><h2>Message the shop directly.</h2><p>{STORE.whatsappDisplay} • {STORE.city}</p></div><a className="whatsapp-button" href={wa('Hello YousefCreationz, I am browsing your website and would like some help.')} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></section>

    <footer><a className="brand footer-brand official-brand" href="#top"><img className="brand-logo footer-logo" src={STORE.logo} alt="Yousef Creationz"/></a><p>Clothing and style essentials, ordered the way Kampala already shops.</p><span className="footer-actions"><a href="/admin">Shop Manager ↗</a><a href={wa('Hello YousefCreationz, I would like to make an enquiry.')} target="_blank" rel="noreferrer">WhatsApp the shop ↗</a></span></footer>

    <a className="floating-whatsapp" target="_blank" rel="noreferrer" href={wa('Hello YousefCreationz, I am on your website and would like some help.')}>WhatsApp</a>
    <button className="floating-concierge" onClick={()=>setConcierge(true)}><span>✦</span> Concierge</button>
    <nav className="mobile-dock" aria-label="Quick actions"><a href="#collection">Shop</a><button onClick={()=>setConcierge(true)}>Concierge</button><a target="_blank" rel="noreferrer" href={wa('Hello YousefCreationz, I am browsing your website.')}>WhatsApp</a><button onClick={()=>document.getElementById('bag').showModal()}>Bag {bag.length?`(${bag.length})`:''}</button></nav>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="product-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><img src={selected.image} alt={selected.name}/><div><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p className="big-price">{money(selected.price)}</p><p>{selected.desc||'Availability, sizes and exact colour options are confirmed on WhatsApp before payment.'}</p><div className="stack"><a className="button whatsapp-primary" target="_blank" rel="noreferrer" href={wa(itemMessage(selected))}>{selected.price==null?'Ask price & availability':'Order this on WhatsApp'}</a>{selected.price!=null&&<button className="button button-dark" onClick={()=>{add(selected);setSelected(null)}}>Add to bag</button>}<button className="button button-outline" onClick={()=>shareProduct(selected)}>Share item</button></div></div></section></div>}

    {concierge&&<div className="modal-backdrop"><section className="concierge-modal"><button className="close" onClick={()=>setConcierge(false)}>×</button><p className="eyebrow">Smart style concierge</p><h2>What are you dressing for?</h2><label>Occasion<input value={occasion} onChange={e=>setOccasion(e.target.value)} placeholder="e.g. date night, smart casual"/></label><label>Maximum budget (UGX)<input type="number" value={budget} onChange={e=>setBudget(e.target.value)}/></label><div className="suggestions">{suggestions.length?suggestions.map(p=><button key={p.id} onClick={()=>{setConcierge(false);setSelected(p)}}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{money(p.price)}</small></span></button>):<p>No current item matches that budget. Ask the shop for alternatives.</p>}</div><a className="button whatsapp-primary full" target="_blank" rel="noreferrer" href={wa(`Hello YousefCreationz, your website concierge helped me. I need a ${occasion} look with a budget up to ${money(Number(budget)||0)}. Please help me choose.`)}>Continue on WhatsApp</a></section></div>}

    <dialog id="bag" className="bag-dialog"><form method="dialog"><button className="close">×</button></form><p className="eyebrow">Your bag</p><h2>{bag.length?`${bag.length} item${bag.length>1?'s':''}`:'Your bag is empty'}</h2>{bag.map((p,i)=><div className="bag-line" key={`${p.id}-${i}`}><span>{p.name}<button className="remove-item" onClick={()=>remove(i)}>Remove</button></span><b>{money(p.price)}</b></div>)}{bag.length>0&&<><div className="bag-total"><span>Estimated total</span><b>{money(total)}</b></div><button className="button whatsapp-primary full" onClick={orderBag}>Send order to WhatsApp</button></>}</dialog>
  </main>;
}
