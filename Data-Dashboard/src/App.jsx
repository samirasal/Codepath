import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const RickAndMortyDashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

 
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');

        
        if (response.data && response.data.results) {
          setCharacters(response.data.results);
        } else {
          console.error("No characters found in the response.");
        }
      } catch (error) {
        console.error("Error fetching Rick and Morty characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  
  const filteredCharacters = characters
    .filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(character => filter === 'All' || character.status === filter); 

  return (
    <div className='dashboard-container'>
      <h1>Rick and Morty Characters Dashboard</h1>

      {/* Summary Statistics */}
      <div>
        <h3>Summary Statistics</h3>
        <p>Total Characters: {characters.length}</p>
        <p>Characters Alive: {characters.filter(c => c.status === 'Alive').length}</p>
        <p>Characters Dead: {characters.filter(c => c.status === 'Dead').length}</p>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters..."
      />

      {/* Filter by Status */}
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All Characters</option>
        <option value="Alive">Alive Characters</option>
        <option value="Dead">Dead Characters</option>
      </select>

      {/* Display List of Characters */}
      <ul>
        {filteredCharacters.map(character => (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <img 
              src={character.image} 
              alt={character.name} 
              style={{ width: '100%', height: '100%' }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMortyDashboard;
