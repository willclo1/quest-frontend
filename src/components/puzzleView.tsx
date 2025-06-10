import { useEffect, useState } from "react";
import { getWordScramble, submitGuess, type ValidateResponse } from "../api/game";
import { useNavigate } from "react-router-dom";
import "./puzzleView.css";

interface PuzzleViewProps {
  chapterId: string;
}

export default function PuzzleView({ chapterId }: PuzzleViewProps) {
  const navigate = useNavigate();
  const idNum = parseInt(chapterId, 10);
  const MAX_CHAPTER = 5; // change if you add more chapters

  const [scramble, setScramble] = useState<string>("");
  const [guess, setGuess] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setScramble("");
    setGuess("");
    setError(null);
    setStatus(null);
    setImageUrl(null);

    getWordScramble(chapterId)
      .then((word) => setScramble(word))
      .catch((err) => setError(err.message));
  }, [chapterId]);

  const handleSubmit = async () => {
    setError(null);
    setStatus(null);

    if (!guess.trim()) {
      setStatus("Please enter a guess.");
      return;
    }

    try {
      const result: ValidateResponse = await submitGuess(
        guess.trim(),
        chapterId
      );
      if (result.correct) {
        setStatus("🎉 Correct! 🎉");
        if (result.image_url) setImageUrl(result.image_url);
      } else {
        setStatus("❌ Incorrect, try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  // Loading / error
  if (error) return <div className="puzzle-error">Error: {error}</div>;
  if (!scramble) return <div className="puzzle-loading">Loading…</div>;

  const letters = scramble.toUpperCase().split("");

  // Prev/Next IDs
  const prevId = idNum > 0 ? idNum - 1 : null;
  const nextId = idNum < MAX_CHAPTER ? idNum + 1 : null;

  return (
    <div className="app-background centered puzzle-wrapper">
      <div className="puzzle-card">
        <h2 className="h2 puzzle-heading">Chapter {idNum + 1} Puzzle</h2>

        <div className="tile-container">
          {letters.map((letter, idx) => (
            <div key={idx} className="tile">
              {letter}
            </div>
          ))}
        </div>

        <input
          type="text"
          className="input-primary guess-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess"
        />

        <button
          className="button-primary submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {status && <div className="puzzle-status">{status}</div>}
        {imageUrl && (
          <div className="memory-image-wrapper">
            <img src={imageUrl} alt="Memory" className="memory-image" />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="puzzle-nav">
          <button
            className="button-primary nav-button"
            onClick={() => prevId !== null && navigate(`/chapter/${prevId}`)}
            disabled={prevId === null}
          >
            ← Back
          </button>
          <button
            className="button-primary nav-button"
            onClick={() => nextId !== null && navigate(`/chapter/${nextId}`)}
            disabled={nextId === null}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}