import React, { useState } from "react";
import "../Flashcard.css"; 
const Flashcard = () => {
    const cardSet = {
        title: "French to English Flashcards",
        description: "How ready are you to live in France? Let's put you to the test! Learn common French expressions and their English translations.",
        cards: [
            { question: "C'est la vie", answer: "That's life", frontGif: "../src/images/c'est.jpeg" },
            { question: "Bon voyage", answer: "Safe travels", frontGif: "../src/images/forest-gump.gif" },
            { question: "Au revoir", answer: "Goodbye", backGif: "../src/images/slide-bye.gif" },
            { question: "À bientôt", answer: "See you soon", backGif: "../src/images/seeyousoon.jpeg" },
            { question: "À demain", answer: "See you tomorrow", backGif: "../src/images/tomorrow-shawn.gif" },
            { question: "Je suis désolé(e)", answer: "I am sorry", frontGif: "../src/images/sorry.jpg" },
            { question: "Je suis perdu(e)", answer: "I am lost", backGif: "../src/images/stitch.gif" },
            { question: "Je suis fatigué(e)", answer: "I am tired", backGif: "../src/images/tired.jpg" },
            { question: "Je suis heureux(se)", answer: "I am happy", backGif: "../src/images/happy.jpg" },
            { question: "Je suis malade", answer: "I am sick", backGif: "../src/images/tired-health.gif" },
        ],
    };

    const [cards, setCards] = useState(cardSet.cards);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [userGuess, setUserGuess] = useState(" ");
    const [feedback, setFeedback] = useState(" ");
    const [hasGuessed, setHasGuessed] = useState(false);
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardSet.cards.length); 
        setIsFlipped(false);
        resetInput();
    };

    const handlePreviousCard = () => {
        setCurrentCardIndex((prevIndex) =>
            prevIndex === 0 ? cardSet.cards.length - 1 : prevIndex - 1
        );
        setIsFlipped(false);
        resetInput();
    };

    const shuffleCards = () => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }

        setCards(shuffledCards);
        const randomIndex = Math.floor(Math.random() * shuffledCards.length);
        setCurrentCardIndex(randomIndex);
        resetInput();
    };

    const handleSubmitGuess = () => {
        if (userGuess.trim().toLowerCase() === currentCard.answer.toLowerCase()){
            setFeedback("Correct!");
        }
        else {
            setFeedback("Incorrect. Try again!");
        }
        setHasGuessed(true);
        setIsFlipped(true);
    }
    const resetInput = () => {
        setUserGuess("");
        setFeedback("");
        setHasGuessed(false);
    }

    const currentCard = cardSet.cards[currentCardIndex];

    return (
        <div className="flashcard-app">
            <h2>{cardSet.title}</h2>
            <p>{cardSet.description}</p>
            <p>Total Cards: {cardSet.cards.length}</p>

            <div className="flashcard-container">
                <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
                    <div className="flashcard-front">
                        <h4>Expression:</h4>
                        <p>{currentCard.question}</p>
                        <div className="gif-container">
                            {currentCard.frontGif && (
                                <img src={currentCard.frontGif} alt="Front GIF" className="gif" />
                            )}
                        </div>
                    </div>
                    <div className="flashcard-back">
                        <h4>Answer:</h4>
                        <p>{currentCard.answer}</p>
                        <div className="gif-container">
                            {currentCard.backGif && (
                                <img src={currentCard.backGif} alt="Back GIF" className="gif" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*  User input for guesses */ }
            {!hasGuessed &&(
                <div className="input-container">
                    <input type="text"
                    placeholder="Enter your answer" 
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}/>
                    <button id="submit-btn"onClick={handleSubmitGuess}>Submit</button>
                </div>
            )}
            {/* Feedbacks */}
            {feedback && <p className="feedback">{feedback}</p>}


            <div className="button-container">
                <button onClick={handlePreviousCard}>←</button>
                <button onClick={handleNextCard}>→</button>
                <button onClick={shuffleCards}>Shuffle Cards</button>
            </div>
        </div>
    );
};

export default Flashcard;
