// Add your Firebase web app credentials in a .env file to activate the backend.
// Firestore collections: rooms, users. Auth: Email/Password and Google provider.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANDXBu_wHtvWrDiRARqi92lGecnkP1_ZQ",
  authDomain: "roomz-80b39.firebaseapp.com",
  projectId: "roomz-80b39",
  storageBucket: "roomz-80b39.firebasestorage.app",
  messagingSenderId: "885243224655",
  appId: "1:885243224655:web:29443e12686d3f5dd3003a",
  measurementId: "G-BTC980TQJV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
