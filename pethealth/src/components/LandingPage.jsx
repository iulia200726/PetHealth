import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/config";
import '../style/LandingPage.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function LandingPage() {
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "issues"), (snap) => {
      setIssues(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCategory('');
    try {
      const response = await fetch('http://localhost:5000/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: complaint }),
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      setCategory(data.categorie || 'Unknown');
    } catch (err) {
      setError('A apărut o eroare la trimiterea cererii.');
    }
    setLoading(false);
  };

  return (
    <div className="LandingPage">
      <div className="hero">
        <h1>UrbanTm - your intelligent city</h1>
        <p>Report any problem or suggestion to help us improve our city together.</p>
      </div>
    </div>
  );
}

export default LandingPage;
