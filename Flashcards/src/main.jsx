import React, { useState } from 'react';
import Flashcard from './FlashcardApp';
import './FlashcardApp.css';

const FlashcardGame = () => {
  const flashcards = [
    { question: "Bonjour", answer: "Hello" },
    { question: "Merci", answer: "Thank you" },
    { question: "Pomme", answer: "Apple" },
    { question: "Chien", answer: "Dog" },
    { question: "Chat", answer: "Cat" }
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCard(randomIndex);
    setShowAnswer(false);
  };

  return (
    <div className="flashcard-app">
      <h1>French Flashcards</h1>
      <p>Total cards: {flashcards.length}</p>
      <Flashcard
        card={flashcards[currentCard]}
        showAnswer={showAnswer}
        onCardClick={handleCardClick}
      />
      <button onClick={handleNextClick}>Next Card</button>
    </div>
  );
};

export default FlashcardGame;
