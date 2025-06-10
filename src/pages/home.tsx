import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="app-background centered Home-wrapper">
      <div className="Home-card">
        {/* Otter now sits inside the card, above the title */}
        <div className="otter-icon">🦦</div>

        <h1 className="h1 Home-title">Love Quest</h1>
        <p className="Home-subtitle">A seaside adventure awaits</p>
        <Link to="/chapters">
          <button className="button-primary">Start</button>
        </Link>
      </div>
    </div>
  );
}