import React from 'react';
import './FlashcardApp.css';

const Flashcard = ({ card, showAnswer, onCardClick }) => {
  return (
    <div className="flashcard" onClick={onCardClick}>
      {showAnswer ? card.answer : card.question}
    </div>
  );
};

export default Flashcard;
