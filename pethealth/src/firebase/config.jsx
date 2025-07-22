import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtnlvsBjGeRmVvRiCG4s8EyzaP0uq1Vm0",
  authDomain: "pethealth-c9080.firebaseapp.com",
  projectId: "pethealth-c9080",
  storageBucket: "pethealth-c9080.firebasestorage.app",
  messagingSenderId: "10900500848",
  appId: "1:10900500848:web:0a5f3fb8b307cd92d75fb5",
  measurementId: "G-K8E0006212"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, firebaseConfig };