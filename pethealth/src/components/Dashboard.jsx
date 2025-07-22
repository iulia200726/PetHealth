// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

// 📦 Imagini rase (doar cele populare)
import americanCockerSpanielImg from '../assets/breeds/Group 2.svg';
import australianShepherdImg from '../assets/breeds/Group 3.svg';
import bassetHoundImg from '../assets/breeds/Group 5.svg';
import beagleImg from '../assets/breeds/Group 6.svg';
import berneseMountainDogImg from '../assets/breeds/Group 7.svg';
import bichonFriseImg from '../assets/breeds/Group 8.svg';
import borderCollieImg from '../assets/breeds/Group 9.svg';
import bostonTerrierImg from '../assets/breeds/Group 10.svg';
import boxerImg from '../assets/breeds/Group 12.svg';
import bullTerrierImg from '../assets/breeds/Group 13.svg';
import cavalierKingCharlesSpanielImg from '../assets/breeds/Group 14.svg';
import chihuahuaImg from '../assets/breeds/Group 15.svg';
import dachshundImg from '../assets/breeds/Group 16.svg';
import dalmatianImg from '../assets/breeds/Group 17.svg';
import dobermanImg from '../assets/breeds/Group 18.svg';
import englishBulldogImg from '../assets/breeds/Group 19.svg';
import englishCockerSpanielImg from '../assets/breeds/Group 20.svg';
import englishSpringerSpanielImg from '../assets/breeds/Group 21.svg';
import frenchBulldogImg from '../assets/breeds/Group 22.svg';
import germanShepherdImg from '../assets/breeds/Group 23.svg';
import goldenRetrieverImg from '../assets/breeds/Group 24.svg';
import greatDaneImg from '../assets/breeds/Group 25.svg';
import jackRussellTerrierImg from '../assets/breeds/Group 26.svg';
import labradorRetrieverImg from '../assets/breeds/Group 27.svg';
import malteseImg from '../assets/breeds/Group 28.svg';
import pembrokeWelshCorgiImg from '../assets/breeds/Group 29.svg';
import pomeranianImg from '../assets/breeds/Group 30.svg';
import pugImg from '../assets/breeds/Group 31.svg';
import rottweilerImg from '../assets/breeds/Group 32.svg';
import saintBernardImg from '../assets/breeds/Group 33.svg';
import shetlandSheepdogImg from '../assets/breeds/Group 34.svg';
import shibaInuImg from '../assets/breeds/Group 35.svg';
import siberianHuskyImg from '../assets/breeds/Group 36.svg';
import yorkshireTerrierImg from '../assets/breeds/Group 37.svg';
import mixedBreedImg from '../assets/breeds/Group 4.svg';

export const breedImages = {
  "American Cocker Spaniel": americanCockerSpanielImg,
  "Australian Shepherd": australianShepherdImg,
  "Basset Hound": bassetHoundImg,
  "Beagle": beagleImg,
  "Bernese Mountain Dog": berneseMountainDogImg,
  "Bichon Frise": bichonFriseImg,
  "Border Collie": borderCollieImg,
  "Boston Terrier": bostonTerrierImg,
  "Boxer": boxerImg,
  "Bull Terrier": bullTerrierImg,
  "Cavalier King Charles Spaniel": cavalierKingCharlesSpanielImg,
  "Chihuahua": chihuahuaImg,
  "Dachshund": dachshundImg,
  "Dalmatian": dalmatianImg,
  "Doberman": dobermanImg,
  "English Bulldog": englishBulldogImg,
  "English Cocker Spaniel": englishCockerSpanielImg,
  "English Springer Spaniel": englishSpringerSpanielImg,
  "French Bulldog": frenchBulldogImg,
  "German Shepherd": germanShepherdImg,
  "Golden Retriever": goldenRetrieverImg,
  "Great Dane": greatDaneImg,
  "Jack Russell Terrier": jackRussellTerrierImg,
  "Labrador Retriever": labradorRetrieverImg,
  "Maltese": malteseImg,
  "Pembroke Welsh Corgi": pembrokeWelshCorgiImg,
  "Pomeranian": pomeranianImg,
  "Pug": pugImg,
  "Rottweiler": rottweilerImg,
  "Saint Bernard": saintBernardImg,
  "Shetland Sheepdog": shetlandSheepdogImg,
  "Shiba Inu": shibaInuImg,
  "Siberian Husky": siberianHuskyImg,
  "Yorkshire Terrier": yorkshireTerrierImg,
  "Mixed Breed / Unknown": mixedBreedImg,
};

const genderIcons = {
  Male: '♂',
  Female: '♀',
};

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const fetchPets = async () => {
    const querySnapshot = await getDocs(collection(db, 'pets'));
    const petList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPets(petList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pets', id));
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <button onClick={handleAddPet} style={{ padding: '0.5rem 1rem' }}>Add Pet</button>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {pets.map(pet => (
          <div
            key={pet.id}
            onClick={() => navigate(`/pet/${pet.id}`)}
            style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              width: '100%',
              color: '#000',
              alignItems: 'center',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ marginRight: '1.5rem' }}>
              <img
                src={breedImages[pet.breed] || 'https://placekitten.com/100/100'}
                alt={pet.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age?.years || 0}y {pet.age?.months || 0}m</p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <strong>Gender:</strong>&nbsp;
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: pet.gender === 'Male' ? '#4a90e2' : '#e91e63',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  textAlign: 'center',
                  lineHeight: '20px'
                }}>
                  {genderIcons[pet.gender]}
                </span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(pet.id);
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.3rem 0.8rem',
                  border: 'none',
                  background: '#ff5252',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Delete Pet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
