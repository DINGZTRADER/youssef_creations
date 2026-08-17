'use client';
import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, STORE } from './data';

const money = n => `UGX ${Number(n).toLocaleString('en-UG')}`;
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
  const [selected,setSelected]=useState(null);
  const [bag,setBag]=useState([]);
  const [concierge,setConcierge]=useState(false);
  const [budget,setBudget]=useState('200000');
  const [occasion,setOccasion]=useState('smart casual');

  const categories=['All',...new Set(products.map(p=>p.category))];
  const shown=category==='All'?products:products.filter(p=>p.category===category);
  const total=bag.reduce((s,p)=>s+p.price,0);
  const suggestions=useMemo(()=>{
    const max=Number(budget)||Infinity;
    const ranked=products.filter(p=>p.price<=max).filter(p=>{
      const o=occasion.toLowerCase();
      if(o.includes('sport')) return p.category==='Jerseys'||p.category==='Trousers';
      if(o.includes('under')) return p.category==='Underwear';
      if(o.includes('casual')||o.includes('date')||o.includes('event')) return p.category==='Complete Looks'||p.category==='Trousers';
      return true;
    });
    return ranked.slice(0,3);
  },[products,budget,occasion]);

  const add=p=>setBag(v=>[...v,p]);
  const orderBag=()=>{
    const lines=bag.map((p,i)=>`${i+1}. ${p.name} — ${money(p.price)}`).join('\n');
    window.open(wa(`Hello YousefCreationz, I would like to order:\n${lines}\n\nTotal: ${money(total)}\nPlease confirm availability, size/options and Kampala delivery.`),'_blank','noopener,noreferrer');
  };

  return <main>
    <header className="site-header">
      <a className="brand" href="#top"><span className="brand-mark">YC</span><span>Yousef<span>Creationz</span></span></a>
      <nav><a href="#collection">Shop</a><button onClick={()=>setConcierge(true)}>Concierge</button><button className="bag-button" onClick={()=>document.getElementById('bag').showModal()}>Bag <span>{bag.length}</span></button></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">Kampala’s edited men’s style store</p><h1>Dress like you planned it.</h1><p className="hero-text">Curated complete looks, trousers, jerseys and underwear — selected to work together and ordered directly on WhatsApp.</p><div className="hero-actions"><a className="button button-dark" href="#collection">Shop the drop</a><button className="text-button" onClick={()=>setConcierge(true)}>Find my look ↗</button></div><div className="hero-trust"><span><b>01</b> Curated weekly</span><span><b>02</b> Kampala delivery</span><span><b>03</b> WhatsApp support</span></div></div>
      <div className="hero-image-wrap"><img src={`${STORE.imageOrigin}/products/congo-look.jpeg`} alt="YousefCreationz featured look"/><div className="hero-sticker"><span>Fresh</span><span>Drop</span></div><div className="hero-caption">Today’s statement look <span>→</span></div></div>
    </section>

    <section className="value-strip"><p>Personal styling <span>•</span> WhatsApp ordering <span>•</span> Delivery confirmed before payment</p></section>

    <section className="collection-section" id="collection">
      <div className="section-heading"><div><p className="eyebrow">The current edit</p><h2>Picked for your next plan.</h2></div><button className="concierge-link" onClick={()=>setConcierge(true)}>Not sure what fits? Ask the concierge ↗</button></div>
      <div className="category-tabs">{categories.map(c=><button key={c} className={`category-tab ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div className="product-grid">{shown.map((p,i)=><article className={`product-card product-${(i%5)+1}`} key={p.id}><button className="product-image-wrap" onClick={()=>setSelected(p)}><img src={p.image} alt={p.name}/>{p.badge&&<span className="product-badge">{p.badge}</span>}<span className="quick-add">View item <b>+</b></span></button><div className="product-info"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3></div><p className="product-price">From {money(p.price)}</p></div></article>)}</div>
    </section>

    <section className="concierge-banner" id="concierge"><div className="concierge-icon">✦</div><div><p className="eyebrow">Your personal style shortcut</p><h2>Meet the smart concierge.</h2></div><p>Tell it the occasion and budget. It shortlists suitable items, then hands you to Yousef on WhatsApp when you are ready.</p><button className="button button-light" onClick={()=>setConcierge(true)}>Start a conversation →</button></section>

    <section className="whatsapp-section"><div><p className="eyebrow">Always one message away</p><h2>Prefer to speak to the shop?</h2><p>{STORE.whatsappDisplay}</p></div><a className="whatsapp-button" href={wa('Hello YousefCreationz, I am browsing your collection and would like some help.')} target="_blank">Chat on WhatsApp ↗</a></section>

    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">YC</span> Yousef<span>Creationz</span></a><p>Designed for people who want to look sharp without the scroll.</p><span className="footer-actions"><a href="/admin">Shop Manager ↗</a><a href={wa('Hello YousefCreationz, I would like to make an enquiry.')} target="_blank">WhatsApp the shop ↗</a></span></footer>
    <button className="floating-concierge" onClick={()=>setConcierge(true)}><span>✦</span> Concierge</button>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="product-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><img src={selected.image} alt={selected.name}/><div><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p className="big-price">{money(selected.price)}</p><p>Availability, sizes and exact colour options are confirmed before payment.</p><div className="stack"><button className="button button-dark" onClick={()=>{add(selected);setSelected(null)}}>Add to bag</button><a className="button button-outline" target="_blank" href={wa(`Hello YousefCreationz, I am interested in ${selected.name} (${money(selected.price)}). Please confirm availability and options.`)}>Ask on WhatsApp</a></div></div></section></div>}

    {concierge&&<div className="modal-backdrop"><section className="concierge-modal"><button className="close" onClick={()=>setConcierge(false)}>×</button><p className="eyebrow">Smart style concierge</p><h2>What are you dressing for?</h2><label>Occasion<input value={occasion} onChange={e=>setOccasion(e.target.value)} placeholder="e.g. date night, smart casual"/></label><label>Maximum budget (UGX)<input type="number" value={budget} onChange={e=>setBudget(e.target.value)}/></label><div className="suggestions">{suggestions.length?suggestions.map(p=><button key={p.id} onClick={()=>{setConcierge(false);setSelected(p)}}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{money(p.price)}</small></span></button>):<p>No current item matches that budget. Ask the shop for alternatives.</p>}</div><a className="button button-dark full" target="_blank" href={wa(`Hello YousefCreationz, your concierge helped me. I need a ${occasion} look with a budget up to ${money(Number(budget)||0)}. Please help me choose.`)}>Continue with Yousef on WhatsApp</a></section></div>}

    <dialog id="bag" className="bag-dialog"><form method="dialog"><button className="close">×</button></form><p className="eyebrow">Your bag</p><h2>{bag.length?`${bag.length} item${bag.length>1?'s':''}`:'Your bag is empty'}</h2>{bag.map((p,i)=><div className="bag-line" key={`${p.id}-${i}`}><span>{p.name}</span><b>{money(p.price)}</b></div>)}{bag.length>0&&<><div className="bag-total"><span>Total</span><b>{money(total)}</b></div><button className="button button-dark full" onClick={orderBag}>Order on WhatsApp</button></>}</dialog>
  </main>;
}
