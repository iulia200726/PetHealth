// src/pages/PetDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { breedImages } from './Dashboard';

const PetDashboard = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const petRef = doc(db, 'pets', petId);
      const petSnap = await getDoc(petRef);
      if (petSnap.exists()) {
        setPet(petSnap.data());
      }
    };
    fetchPet();
  }, [petId]);

  if (!pet) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>PetDashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <img
          src={breedImages[pet.breed] || 'https://placekitten.com/150/150'}
          alt={pet.name}
          style={{ width: '150px', height: '150px', borderRadius: '12px', objectFit: 'cover' }}
        />
        <div>
          <h2>{pet.name}</h2>
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Age:</strong> {pet.age?.years || 0}y {pet.age?.months || 0}m</p>
        </div>
      </div>
    </div>
  );
};

export default PetDashboard;
