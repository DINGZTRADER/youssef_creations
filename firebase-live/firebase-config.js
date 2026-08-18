import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/12.17.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAoxh7Zhl7BX3NqRyWZDbsbRlcH4ZOgrI8',
  authDomain: 'yousefcreationz-3bb6c.firebaseapp.com',
  projectId: 'yousefcreationz-3bb6c',
  storageBucket: 'yousefcreationz-3bb6c.firebasestorage.app',
  messagingSenderId: '1043965118299',
  appId: '1:1043965118299:web:2b99324df183a68b3afc7e',
  measurementId: 'G-G97JT9GRHX'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
