// src/api/game.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


/** Fetch the list of chapter names (ordered list) */
export async function getChapterList(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/chapter`);
  if (!res.ok) {
    throw new Error("Failed to fetch chapter list");
  }
  return res.json() as Promise<string[]>;
}

/** Fetch the scrambled word for a single chapter */
export async function getWordScramble(chapterId: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/chapter/${chapterId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch scrambled word for chapter "${chapterId}"`);
  }
  // Backend returns a single string
  return res.json() as Promise<string>;
}

/** Shape of the response from POST /api/answer/{answer}/{chapter} */
export interface ValidateResponse {
  correct: boolean;
  /** present only if correct === true */
  image_url?: string;
}

/** Submit a guess and get back correctness + optional image URL */
export async function submitGuess(
  guess: string,
  chapterId: string
): Promise<ValidateResponse> {
  const res = await fetch(
    `${API_BASE}/api/answer/${encodeURIComponent(guess)}/${chapterId}`,
    { method: "POST" }
  );
  if (!res.ok) {
    throw new Error(`Validation failed: ${res.status}`);
  }
  return res.json() as Promise<ValidateResponse>;
}