// src/App.tsx
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/home";
import ChapterMap from "./components/ChapterMap";
import PuzzleView from "./components/puzzleView";

function ChapterDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return id ? <PuzzleView chapterId={id} /> : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<ChapterMap />} />
        <Route path="/chapter/:id" element={<ChapterDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}