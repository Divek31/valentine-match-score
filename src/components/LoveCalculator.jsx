import React, { useState } from 'react';
import './LoveCalculator.css';
import { saveToGoogleSheet } from '../utils/googleSheetsService';



const LoveCalculator = ({ onComplete }) => {
    const [yourName, setYourName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [step, setStep] = useState('input'); // input, loading, result, rejection, crazy
    const [score, setScore] = useState(0);
    const [crazyMessage, setCrazyMessage] = useState('');
    const [rejectionMessage, setRejectionMessage] = useState('');

    const crazyMessages = [
        "Friendzone Level: 9000 📉",
        "Maybe try bribing them with pizza? 🍕",
        "Run away while you can! 🏃",
        "Error 404: Love not found 🤖",
        "Have you considered a cat instead? 🐈",
        "Try again in 100 years ⏳"
    ];

    const roastedMessages = [
        "Even my WiFi has a better connection 📶",
        "Negative Rizz Detected 📉",
        "Emotional Damage! 💔",
        "Better luck in your next life 💀",
        "Bro, just give up. Seriously. 🛑",
        "You two make me lose hope in love 🥀"
    ];

    const gibberishRoasts = [
        "Kehna kya chahte ho? 🤔",
        "Keyboard pe sar patak diya kya? 🤕",
        "Ye naam hai ya WiFi password? 📶",
        "Nashe mein type kar raha hai kya? 🍺",
        "Arey bhai, insaano wala naam likh! 👽",
        "Tujhse na ho payega... likhna bhi! 🤦‍♂️"
    ];

    const [error, setError] = useState('');

    const isGibberish = (text) => {
        const lower = text.toLowerCase();

        // Special characters check (anything not letters or space)
        if (/[^a-z\s]/.test(lower)) return true;

        // Common keyboard mashes
        const mashes = ['asdf', 'sdfg', 'dfgh', 'qwer', 'wert', 'zxcv', 'xcvb', 'lkjh', 'poiuy'];
        if (mashes.some(m => lower.includes(m))) return true;

        // Repeated characters (e.g., 'aaaa')
        if (/(.)\1{3,}/.test(lower)) return true;

        // Too many consonants in a row
        if (/[bcdfghjklmnpqrstvwxyz]{5,}/.test(lower)) return true;

        return false;
    };

    const handleCalculate = () => {
        setError('');
        if (!yourName || !partnerName) {
            setError("Please enter both names!");
            return;
        }

        if (isGibberish(yourName) || isGibberish(partnerName)) {
            const randomRoast = gibberishRoasts[Math.floor(Math.random() * gibberishRoasts.length)];
            setError(randomRoast);
            return;
        }

        if (yourName.length < 4 || yourName.length > 10 || partnerName.length < 4 || partnerName.length > 10) {
            setError("Bruh, 4-10 chars only. Don't be weird. 💀");
            return;
        }

        setStep('loading');

        // Logic: if names contain {v,i,k} and {y,a,i} in any order
        const name1 = yourName.toLowerCase();
        const name2 = partnerName.toLowerCase();

        const hasVik = ['v', 'i', 'k'].every(char => name1.includes(char) || name2.includes(char));
        const hasYai = ['y', 'a', 'i'].every(char => name1.includes(char) || name2.includes(char));

        let calculatedScore;

        if (hasVik && hasYai) {
            calculatedScore = 95;
        } else if (name1.includes('divek') || name2.includes('divek')) {
            calculatedScore = Math.floor(Math.random() * 20) + 81; // 81 to 100
        } else {
            calculatedScore = Math.floor(Math.random() * 101); // 0 to 100
        }

        setScore(calculatedScore);

        // Simulate calculation time (2 seconds)

        setTimeout(() => {
            // Save result to Google Sheet
            saveToGoogleSheet({
                type: 'Calculation',
                name1: yourName,
                name2: partnerName,
                score: calculatedScore + '%',
                message: calculatedScore > 60 ? "Success!" : (calculatedScore >= 40 ? crazyMessage || "Crazy Match" : rejectionMessage || "Rejection")
            });


            if (calculatedScore > 60) {
                setStep('result');
                // Show result for 2 seconds before moving to next screen
                setTimeout(() => {
                    onComplete(partnerName);
                }, 3000);
            } else if (calculatedScore >= 40 && calculatedScore <= 60) {
                const randomMsg = crazyMessages[Math.floor(Math.random() * crazyMessages.length)];
                setCrazyMessage(randomMsg);
                setStep('crazy');
            } else {
                const randomRoast = roastedMessages[Math.floor(Math.random() * roastedMessages.length)];
                setRejectionMessage(randomRoast);
                setStep('rejection');
            }
        }, 2000);

    };

    const handleRetry = () => {
        setStep('input');
        setYourName('');
        setPartnerName('');
    };

    return (
        <div className="love-calculator-card">
            {step === 'input' && (
                <>
                    <h2 className="calculator-title">💘 Love Calculator 💘</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            className="love-input"
                        />
                        <span className="plus-sign">+</span>
                        <input
                            type="text"
                            placeholder="Their Name"
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                            className="love-input"
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button className="calculate-btn" onClick={handleCalculate}>
                        Calculate Compatibility
                    </button>
                </>
            )}

            {step === 'loading' && (
                <div className="loading-container">
                    <h3>Analyzing Heartbeats... 💓</h3>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="result-container">
                    <h1 className="match-percent">{score}% MATCH!</h1>
                    <div className="sparkles">✨💖✨</div>
                    <p>{score > 90 ? "Perfect Soulmates detected!" : "Great Match! ❤️"}</p>
                </div>
            )}

            {step === 'crazy' && (
                <div className="rejection-container">
                    <h1 className="match-percent">{score}% MATCH</h1>
                    <h2 className="crazy-text">{crazyMessage}</h2>
                    <button className="calculate-btn" onClick={handleRetry} style={{ marginTop: '1rem' }}>
                        Try Again? 🎲
                    </button>
                </div>
            )}

            {step === 'rejection' && (
                <div className="rejection-container">
                    <h1 className="match-percent">{score}% MATCH</h1>
                    <h2 className="rejection-text">{rejectionMessage}</h2>
                    <button className="calculate-btn" onClick={handleRetry} style={{ marginTop: '1rem' }}>
                        Try Someone Else?
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoveCalculator;
