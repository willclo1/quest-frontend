import { useEffect, useState } from "react";
import { getChapterList } from "../api/game";
import { Link } from "react-router-dom";
import RiverTrail from "./riverTrail";
import "./ChapterMap.css";

interface Position {
  left: string;
  top: string;
}

const positions: Position[] = [
  { left: "5%", top: "90%" },
  { left: "20%", top: "72%" },
  { left: "40%", top: "60%" },
  { left: "60%", top: "50%" },
  { left: "75%", top: "35%" },
  { left: "90%", top: "15%" },
];

export default function ChapterMap() {
  const [chapters, setChapters] = useState<string[]>([]);

  useEffect(() => {
    getChapterList()
      .then((data) => setChapters(data))
      .catch((err) => console.error("Error loading chapters:", err));
  }, []);

  return (
    <div className="app-background ChapterMap-wrapper">
      {/* River in the background */}
      <RiverTrail />

      {/* Island‐style chapter nodes on top */}
      {chapters.map((chapter, idx) => {
        const pos = positions[idx] || { left: "50%", top: "50%" };
        return (
          <Link to={`/chapter/${idx}`} key={idx}>
            <div className="chapter-node" style={{ left: pos.left, top: pos.top }}>
              <span className="chapter-label">{chapter}</span>
              <div className="otter-icon">🦦</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}