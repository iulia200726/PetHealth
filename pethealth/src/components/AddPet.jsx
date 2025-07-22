import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const breedOptions = {
  Dog: [
  "American Cocker Spaniel",
  "Australian Shepherd",
  "Basset Hound",
  "Beagle",
  "Bernese Mountain Dog",
  "Bichon Frise",
  "Border Collie",
  "Boston Terrier",
  "Boxer",
  "Bull Terrier",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "Dachshund",
  "Dalmatian",
  "Doberman",
  "English Bulldog",
  "English Cocker Spaniel", 
  "English Springer Spaniel",
  "French Bulldog",
  "German Shepherd",
  "Golden Retriever",
  "Great Dane",
  "Jack Russell Terrier",
  "Labrador Retriever",
  "Maltese",
  "Pembroke Welsh Corgi",
  "Pomeranian",
  "Pug",
  "Rottweiler",
  "Saint Bernard",
  "Shiba Inu",
  "Siberian Husky",
  "Yorkshire Terrier",
  "Mixed Breed / Unknown"
],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx'],
  Bird: ['Parrot', 'Canary', 'Finch'],
  Other: ['Hamster', 'Rabbit', 'Turtle']
};

const petTypes = Object.keys(breedOptions);

const AddPet = () => {
  const [pet, setPet] = useState({
    name: '',
    type: '',
    breed: '',
    gender: '',
    ageYears: '',
    ageMonths: '',
  });

  const [breedList, setBreedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pet.type) {
      setBreedList(breedOptions[pet.type] || []);
      setPet(prev => ({ ...prev, breed: '' }));
    }
  }, [pet.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ageYears = parseInt(pet.ageYears) || 0;
    const ageMonths = parseInt(pet.ageMonths) || 0;

    const newPet = {
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      gender: pet.gender,
      age: {
        years: ageYears,
        months: ageMonths
      },
      addedAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, 'pets'), newPet);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, gap: '1rem' }}>
        <input type="text" name="name" placeholder="Pet Name" onChange={handleChange} required />

        <select name="type" value={pet.type} onChange={handleChange} required>
          <option value="">Select Pet Type</option>
          {petTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select name="breed" value={pet.breed} onChange={handleChange} required disabled={!pet.type}>
          <option value="">Select Breed</option>
          {breedList.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="number" name="ageYears" placeholder="Years" min="0" onChange={handleChange} />
          <input type="number" name="ageMonths" placeholder="Months" min="0" onChange={handleChange} />
        </div>

        <select name="gender" value={pet.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPet;
