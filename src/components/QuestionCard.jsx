import React, { useState, useRef, useEffect } from 'react';
import './QuestionCard.css';
import confetti from 'canvas-confetti';
import MusicPlayer from './MusicPlayer';
import { saveToGoogleSheet } from '../utils/googleSheetsService';



const QuestionCard = () => {
    const [yesPressed, setYesPressed] = useState(false);
    const [noPosition, setNoPosition] = useState({ top: 'auto', left: 'auto', position: 'static' });
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const noBtnRef = useRef(null);

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const questionText = name ? `${name}, will you be my Valentine?` : "Will you be my Valentine?";

    const quotes = [
        "You are my favorite person.",
        "Every moment with you is a treasure.",
        "My heart is wherever you are.",
        "I love you more than words can say.",
        "Happy Valentine’s Day! ❤️"
    ];

    useEffect(() => {
        let interval;
        if (yesPressed && currentQuoteIndex < quotes.length - 1) {
            interval = setInterval(() => {
                setCurrentQuoteIndex((prevIndex) => prevIndex + 1);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [yesPressed, currentQuoteIndex, quotes.length]);

    const [yesButtonSize, setYesButtonSize] = useState(1); // 1 = 100% scale

    const handleYesClick = () => {
        setYesPressed(true);

        // Save acceptance to Google Sheet
        saveToGoogleSheet({
            type: 'Proposal Accepted',
            name1: name || "Unknown",
            name2: "You",
            score: "100%",
            message: "Said YES! ❤️"
        });

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    };



    const handleNoHover = () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);

        setNoPosition({
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            transition: 'all 0.2s ease'
        });

        // Grow the Yes button
        setYesButtonSize((prev) => prev + 0.1);
    };

    return (
        <div className="question-card">
            {yesPressed ? (
                <div className="success-message">
                    <h2>Yay! ❤️</h2>
                    <div className="quote-container" key={currentQuoteIndex}>
                        <p className="love-quote">{quotes[currentQuoteIndex]}</p>
                    </div>
                    <MusicPlayer />
                    <img
                        src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
                        alt="Excited bear"
                        style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '1rem' }}
                    />
                </div>
            ) : (
                <>
                    <div className="question-text">{questionText}</div>
                    <div className="button-group">
                        <button
                            className="btn btn-yes"
                            onClick={handleYesClick}
                            style={{ transform: `scale(${yesButtonSize})` }}
                        >
                            Yes
                        </button>
                        <button
                            ref={noBtnRef}
                            className="btn btn-no"
                            style={noPosition}
                            onMouseEnter={handleNoHover}
                            onClick={handleNoHover}
                        >
                            No
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionCard;
