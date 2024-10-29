// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RickAndMortyDashboard from './Components/RickandMortyDashboard';
import CharacterDetail from './Components/CharacterDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RickAndMortyDashboard />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
