import { useState, type FormEvent } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

type FeedbackTone = 'neutral' | 'error' | 'low' | 'high' | 'success';

type Feedback = {
  message: string;
  tone: FeedbackTone;
};

const RANGE_MIN = 1;
const RANGE_MAX = 100;
const BEST_SCORE_KEY = 'guessGameBestScore';
const INITIAL_FEEDBACK: Feedback = {
  message: 'Pick a number from 1 to 100. Each guess narrows the search window.',
  tone: 'neutral',
};

const createTargetNumber = () => Math.floor(Math.random() * RANGE_MAX) + RANGE_MIN;
const loadBestScore = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedBestScore = window.localStorage.getItem(BEST_SCORE_KEY);
  if (!savedBestScore) {
    return null;
  }

  const parsedBestScore = Number(savedBestScore);
  return Number.isFinite(parsedBestScore) && parsedBestScore > 0 ? parsedBestScore : null;
};

function App() {
  const [targetNumber, setTargetNumber] = useState<number>(() => createTargetNumber());
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [guessHistory, setGuessHistory] = useState<number[]>([]);
  const [lowerBound, setLowerBound] = useState<number>(RANGE_MIN);
  const [upperBound, setUpperBound] = useState<number>(RANGE_MAX);
  const [feedback, setFeedback] = useState<Feedback>(INITIAL_FEEDBACK);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number | null>(() => loadBestScore());

  const resetGame = () => {
    setTargetNumber(createTargetNumber());
    setGuess('');
    setAttempts(0);
    setGuessHistory([]);
    setLowerBound(RANGE_MIN);
    setUpperBound(RANGE_MAX);
    setFeedback(INITIAL_FEEDBACK);
    setIsGameOver(false);
  };

  const handleGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGameOver) {
      return;
    }

    const parsedGuess = Number.parseInt(guess, 10);
    if (Number.isNaN(parsedGuess) || parsedGuess < RANGE_MIN || parsedGuess > RANGE_MAX) {
      setFeedback({
        message: 'Enter a whole number between 1 and 100 to keep the round clean.',
        tone: 'error',
      });
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setGuessHistory((currentHistory) => [...currentHistory, parsedGuess]);

    if (parsedGuess < targetNumber) {
      setLowerBound((currentLowerBound) => Math.max(currentLowerBound, parsedGuess + 1));
      setFeedback({
        message: `${parsedGuess} is too low. Aim higher.`,
        tone: 'low',
      });
      setGuess('');
      return;
    }

    if (parsedGuess > targetNumber) {
      setUpperBound((currentUpperBound) => Math.min(currentUpperBound, parsedGuess - 1));
      setFeedback({
        message: `${parsedGuess} is too high. Move lower.`,
        tone: 'high',
      });
      setGuess('');
      return;
    }

    setLowerBound(parsedGuess);
    setUpperBound(parsedGuess);
    setFeedback({
      message: `Locked in. You found ${parsedGuess} in ${nextAttempts} attempts.`,
      tone: 'success',
    });
    setIsGameOver(true);

    if (!bestScore || nextAttempts < bestScore) {
      setBestScore(nextAttempts);
      window.localStorage.setItem(BEST_SCORE_KEY, nextAttempts.toString());
    }

    confetti({
      particleCount: 140,
      spread: 80,
      startVelocity: 32,
      origin: { y: 0.62 },
      colors: ['#f59e0b', '#f7efe1', '#2b364f'],
    });

    setGuess('');
  };

  const remainingRange = upperBound - lowerBound + 1;
  const narrowedPercent = Math.round(
    ((RANGE_MAX - RANGE_MIN + 1 - remainingRange) / (RANGE_MAX - RANGE_MIN)) * 100,
  );
  const recentGuesses = [...guessHistory].slice(-6).reverse();
  const feedbackLabel = isGameOver
    ? 'Round cleared'
    : feedback.tone === 'error'
      ? 'Input check'
      : 'Game hint';

  return (
    <div className="page-shell">
      <div className="app-shell">
        <section className="intro-panel" aria-label="Project overview">
          <h1>Guess the Number</h1>
          <p className="intro-copy">
            A small logic loop, presented with the kind of clarity and restraint that makes
            the experience feel intentional.
          </p>

          <div className="origin-block">
            <span className="section-kicker">Original idea</span>
            <code>number_to_guess = random.randint(1, 100)</code>
          </div>

          <p className="signature">
            Built from a simple Python loop and refined by <strong style={{ whiteSpace: 'nowrap' }}>Soumyojit Sarkar</strong>.
          </p>
        </section>

        <main className="game-panel" aria-label="Guess the number game">
          <div className="panel-header">
            <div className="panel-intro">
              <p className="section-kicker">Playable proof</p>
              <h2>Find the hidden number</h2>
              <p className="panel-summary">
                Use each hint to tighten the range and finish the round in as few attempts
                as possible.
              </p>
            </div>

            <button type="button" className="ghost-button" onClick={resetGame}>
              New round
            </button>
          </div>

          <div className="hud-grid" aria-label="Game stats">
            <div className="hud-item">
              <span>Attempts</span>
              <strong>{attempts}</strong>
            </div>
            <div className="hud-item">
              <span>Best score</span>
              <strong>{bestScore ?? '--'}</strong>
            </div>
            <div className="hud-item">
              <span>Range left</span>
              <strong>{remainingRange}</strong>
            </div>
          </div>

          <div className={`feedback-panel feedback-${feedback.tone}`}>
            <span className="feedback-label">{feedbackLabel}</span>
            <p>{feedback.message}</p>
          </div>

          <div className="play-block">
            <form className="guess-form" onSubmit={handleGuess}>
              <label htmlFor="guess-input">Your guess</label>
              <div className="guess-row">
                <input
                  id="guess-input"
                  type="number"
                  min={RANGE_MIN}
                  max={RANGE_MAX}
                  inputMode="numeric"
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  placeholder="50"
                  disabled={isGameOver}
                  autoFocus
                />

                {isGameOver ? (
                  <button type="button" className="primary-button" onClick={resetGame}>
                    Play again
                  </button>
                ) : (
                  <button type="submit" className="primary-button">
                    Check guess
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="detail-grid">
            <section className="range-panel" aria-label="Search range">
              <div className="range-copy">
                <span className="section-kicker">Search window</span>
                <strong>
                  {lowerBound} to {upperBound}
                </strong>
                <p>
                  {remainingRange === 1
                    ? 'One number left. The answer is fully isolated.'
                    : `${remainingRange} possible numbers still fit the clues.`}
                </p>
              </div>

              <div className="range-meter" aria-hidden="true">
                <div
                  className="range-meter-fill"
                  style={{ width: `${Math.max(0, narrowedPercent)}%` }}
                />
              </div>

              <p className="range-caption">{narrowedPercent}% of the original range eliminated</p>
            </section>

            <section className="history-panel" aria-label="Recent guesses">
              <div className="history-header">
                <span className="section-kicker">Recent guesses</span>
                <span className="history-meta">
                  {guessHistory.length === 0
                    ? 'No guesses yet'
                    : `${guessHistory.length} guess${guessHistory.length === 1 ? '' : 'es'} made`}
                </span>
              </div>

              <div className="history-list">
                {recentGuesses.length > 0 ? (
                  recentGuesses.map((value, index) => (
                    <span className="history-pill" key={`${value}-${index}`}>
                      {value}
                    </span>
                  ))
                ) : (
                  <span className="history-empty">Start with a confident opening guess.</span>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
