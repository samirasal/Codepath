// RickAndMortyDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StatusChart from '../Components/StatusChart';
import SpeciesChart from '../Components/SpeciesChart';
import Sidebar from '../Components/Sidebar';
import '../App.css';

const RickAndMortyDashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [chartType, setChartType] = useState('Status');  // State to toggle between charts

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results || []);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const filteredCharacters = characters
    .filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(character => filter === 'All' || character.status === filter);

  return (
    <div className='dashboard-container'>
      <Sidebar />
      <h1>Rick and Morty Characters Dashboard</h1>

      {/* Summary Statistics */}
      <div>
        <h3>Summary Statistics</h3>
        <p>Total Characters: {characters.length}</p>
        <p>Characters Alive: {characters.filter(c => c.status === 'Alive').length}</p>
        <p>Characters Dead: {characters.filter(c => c.status === 'Dead').length}</p>
      </div>

      {/* Toggle Button for Chart Types */}
      <div>
      
        <button onClick={() => setChartType('Status')}>Status Chart</button>
        <button onClick={() => setChartType('Species')}>Species Chart</button>
      </div>


      <div className="chart-container">
        {chartType === 'Status' ? (
          <StatusChart characters={characters} />
        ) : (
          <SpeciesChart characters={characters} />
        )}
      </div>

      {/* Search & Filter */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters..."
      />
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All Characters</option>
        <option value="Alive">Alive Characters</option>
        <option value="Dead">Dead Characters</option>
      </select>

      {/* Character List with Links */}
      <ul>
        {filteredCharacters.map(character => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>
              <h2>{character.name}</h2>
            </Link>
            <p>Status: {character.status}</p>
            <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMortyDashboard;
