'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { PRODUCTS } from './data';

export function useLiveProducts(){
  const [products,setProducts]=useState(PRODUCTS);
  useEffect(()=>{
    const q=query(collection(db,'products'),orderBy('sortOrder','asc'));
    const unsub=onSnapshot(q,snap=>{
      if(!snap.empty){
        setProducts(snap.docs.map(d=>({id:d.id,...d.data()})));
      }
    },()=>setProducts(PRODUCTS));
    return unsub;
  },[]);
  return products.filter(p=>p.inStock!==false);
}
