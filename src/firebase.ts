import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwhtPxJrTRc4LyNiCHipV2vMSE4AMD7UU",
  authDomain: "rankbeacon-prod-621.firebaseapp.com",
  projectId: "rankbeacon-prod-621",
  storageBucket: "rankbeacon-prod-621.firebasestorage.app",
  messagingSenderId: "986636422176",
  appId: "1:986636422176:web:e12ea130bd67f1251c8045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
