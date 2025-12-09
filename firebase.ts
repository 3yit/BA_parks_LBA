import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFUQzSQLW-LuvrPGlTmBCn__IAYC4KC38",
  authDomain: "ba-lba-parks.firebaseapp.com",
  projectId: "ba-lba-parks",
  storageBucket: "ba-lba-parks.firebasestorage.app",
  messagingSenderId: "398683082426",
  appId: "1:398683082426:web:8c387d76e3c91713e73c83",
  measurementId: "G-B45D26X57B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore - connect to the "ba-lba" database
export const db = getFirestore(app, 'ba-lba');

// Initialize Storage (for photos)
export const storage = getStorage(app);
