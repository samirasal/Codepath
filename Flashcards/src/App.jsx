import React from 'react';
import ReactDOM from 'react-dom';
import FlashcardGame from './main'; // Import the FlashcardGame
import './FlashcardApp.css';

ReactDOM.render(
  <React.StrictMode>
    <FlashcardGame />
  </React.StrictMode>,
  document.getElementById('root')
);
