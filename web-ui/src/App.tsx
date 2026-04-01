import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    resetGame();
    const savedBest = localStorage.getItem('guessGameBestScore');
    if (savedBest) setBestScore(parseInt(savedBest));
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setFeedback({ message: 'Enter a number between 1 and 100', type: '' });
    setIsGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGameOver) return;

    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setFeedback({ message: 'Please enter a valid number (1-100)', type: 'error' });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess < targetNumber) {
      setFeedback({ message: 'Too low! 📉 Try a higher number.', type: 'low' });
    } else if (numGuess > targetNumber) {
      setFeedback({ message: 'Too high! 📈 Try a lower number.', type: 'high' });
    } else {
      setFeedback({ message: `🎉 Correct! You got it in ${newAttempts} attempts!`, type: 'success' });
      setIsGameOver(true);
      
      // Update best score
      if (!bestScore || newAttempts < bestScore) {
        setBestScore(newAttempts);
        localStorage.setItem('guessGameBestScore', newAttempts.toString());
      }

      // Celebrate!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2dd4bf', '#8b5cf6', '#ffffff']
      });
    }
    setGuess('');
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>Guess Logic</h1>
        <p className="subtitle">The Ultimate Number Challenge</p>

        <form onSubmit={handleGuess}>
          <div className="input-group">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="?"
              disabled={isGameOver}
              autoFocus
            />
          </div>

          {!isGameOver ? (
            <button type="submit" className="btn">
              Check Guess
            </button>
          ) : (
            <button type="button" className="btn" onClick={resetGame}>
              Play Again
            </button>
          )}
        </form>

        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Attempts</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Best Score</span>
            <span className="stat-value">{bestScore || '-'}</span>
          </div>
        </div>

        {isGameOver && (
          <button className="reset-btn" onClick={resetGame}>
            Reset Everything
          </button>
        )}
      </div>

      <footer className="footer">
        Designed & Developed by <strong>Soumyojit Sarkar</strong>
      </footer>
    </div>
  );
}

export default App;
