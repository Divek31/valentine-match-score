import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import QuestionCard from './components/QuestionCard';
import ClickToHeart from './components/ClickToHeart';
import LoveCalculator from './components/LoveCalculator';


function App() {
  const [showQuestion, setShowQuestion] = useState(false);

  const handleCalculatorComplete = (partnerName) => {
    if (partnerName) {
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('name', partnerName);
      window.history.pushState({}, '', newUrl);
    }
    setShowQuestion(true);
  };

  return (
    <>
      <HeartBackground />
      <ClickToHeart />
      <div className="app-container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
        {!showQuestion ? (
          <LoveCalculator onComplete={handleCalculatorComplete} />
        ) : (
          <QuestionCard />
        )}
      </div>
    </>
  );
}

export default App;
