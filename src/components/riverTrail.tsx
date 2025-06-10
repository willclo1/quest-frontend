// src/components/RiverTrail.tsx
import "./RiverTrail.css";

export default function RiverTrail() {
  return (
    <svg
      className="river-trail"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for the main river stroke */}
        <linearGradient id="riverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#005f99" />
          <stop offset="50%" stopColor="#0099cc" />
          <stop offset="100%" stopColor="#33ccff" />
        </linearGradient>

        {/* Lighter gradient for the ripple overlay */}
        <linearGradient id="riverGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38f9d7" />
          <stop offset="50%" stopColor="#00c3ff" />
          <stop offset="100%" stopColor="#80deea" />
        </linearGradient>

        {/* Drop shadow filter for depth */}
        <filter id="riverShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="6"
            floodColor="rgba(0,0,0,0.25)"
          />
        </filter>

        {/* Small circles to simulate floating bubbles/waves */}
        <pattern
          id="wavePattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="30" cy="30" r="6" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>

      {/* 1) Base river path (darker, thicker) */}
      <path
        d="M 0,600
           C 200,550 400,400 600,380
           S 800,300 1000,150"
        fill="none"
        stroke="url(#riverGrad1)"
        strokeWidth="120"
        strokeLinecap="round"
        filter="url(#riverShadow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-400"
          dur="12s"
          repeatCount="indefinite"
        />
      </path>

      {/* 2) Overlay ripple path (lighter, slightly thinner) */}
      <path
        d="M 0,600
           C 200,550 400,400 600,380
           S 800,300 1000,150"
        fill="none"
        stroke="url(#riverGrad2)"
        strokeWidth="80"
        strokeLinecap="round"
        opacity="0.7"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="400"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* 3) Subtle wave pattern overlay across entire SVG */}
      <rect
        width="100%"
        height="100%"
        fill="url(#wavePattern)"
        opacity="0.15"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0,0"
          to="-60,0"
          dur="8s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}