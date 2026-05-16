"use client";

/**
 * CognitionOrb — animated SVG diagram for Section 4.
 * Inner core = human consciousness; orbiting nodes = AI subsystems.
 * Pure SVG/CSS so it's cheap, crisp, and never blocks render.
 */
export default function CognitionOrb() {
  const nodes = [
    { label: "Explore",   angle: 0,   color: "#7dd3fc" },
    { label: "Model",     angle: 60,  color: "#a78bfa" },
    { label: "Judge",     angle: 120, color: "#34d399" },
    { label: "Create",    angle: 180, color: "#fbbf24" },
    { label: "Recall",    angle: 240, color: "#fb7185" },
    { label: "Reflect",   angle: 300, color: "#bae6fd" },
  ];
  const R = 150;
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      <svg viewBox="-220 -220 440 440" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95"/>
            <stop offset="40%" stopColor="#fb7185" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="ring" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0"/>
            <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.0"/>
          </radialGradient>
        </defs>

        {/* concentric latent rings */}
        {[80, 120, 170, 200].map((r, i) => (
          <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="rgba(167,139,250,0.18)" strokeWidth="0.6" strokeDasharray={i % 2 === 0 ? "1 3" : "2 6"}/>
        ))}
        <circle cx="0" cy="0" r="200" fill="url(#ring)"/>

        {/* glowing human core */}
        <circle cx="0" cy="0" r="56" fill="url(#core)"/>
        <circle cx="0" cy="0" r="34" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="0.7"/>
        <text x="0" y="6" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="18" fill="#fcd34d" opacity="0.92">human</text>

        {/* connecting filaments */}
        {nodes.map((n, idx) => {
          const a = (n.angle * Math.PI) / 180;
          const x = +(Math.cos(a) * R).toFixed(3);
          const y = +(Math.sin(a) * R).toFixed(3);
          return (
            <line key={idx} x1="0" y1="0" x2={x} y2={y} stroke={n.color} strokeOpacity="0.22" strokeWidth="0.6"/>
          );
        })}

        {/* AI nodes orbiting */}
        <g className="orb-rotate">
          {nodes.map((n, idx) => {
            const a = (n.angle * Math.PI) / 180;
            const x = +(Math.cos(a) * R).toFixed(3);
            const y = +(Math.sin(a) * R).toFixed(3);
            return (
              <g key={idx} transform={`translate(${x}, ${y})`}>
                <circle r="22" fill="rgba(11,15,31,0.7)" stroke={n.color} strokeWidth="0.9"/>
                <circle r="3" fill={n.color}/>
                <text y="38" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2.5" fill="#c9d0e2" opacity="0.85">{n.label.toUpperCase()}</text>
              </g>
            );
          })}
        </g>
      </svg>
      <style>{`
        .orb-rotate { transform-origin: 0 0; animation: orbSpin 90s linear infinite; }
        @keyframes orbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .orb-rotate { animation: none; } }
      `}</style>
    </div>
  );
}
