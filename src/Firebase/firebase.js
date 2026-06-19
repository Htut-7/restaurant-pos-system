import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbH58iOv54F4BQAKNyWWMmaso12rGy19A",
  authDomain: "restauratn-pos.firebaseapp.com",
  projectId: "restauratn-pos",
  storageBucket: "restauratn-pos.firebasestorage.app",
  messagingSenderId: "182105358477",
  appId: "1:182105358477:web:1793b74b98331b593322c4",
  measurementId: "G-JZFY5ZMYV0"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);

export {db,auth}
