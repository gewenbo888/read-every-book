import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void:      "#040611",
        "void-2":  "#070a18",
        surface:   "#0b0f1f",
        "surface-2": "#11162a",
        line:      "#1c2240",
        "line-2":  "#2a3158",
        text:      "#e8ecf5",
        "text-2":  "#c9d0e2",
        muted:     "#8b93b0",
        dim:       "#525a76",
        ink:       "#1a1e30",
        // Layered semantic accents
        photon:    "#7dd3fc",   // information / data / AI cool
        "photon-2":"#bae6fd",
        latent:    "#a78bfa",   // latent space / model interior
        "latent-2":"#c4b5fd",
        ember:     "#fbbf24",   // human warmth / consciousness flame
        "ember-2": "#fcd34d",
        verdant:   "#34d399",   // judgment / direction
        "verdant-2":"#6ee7b7",
        rose:      "#fb7185",   // emergence / heart
      },
      fontFamily: {
        display: ['"Fraunces"', '"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', '"SF Mono"', "Menlo", "monospace"],
        zh:      ['"Noto Serif SC"', "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.025em",
        wider: "0.04em",
        widest: "0.18em",
      },
      animation: {
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "drift":      "drift 60s linear infinite",
        "flicker":    "flicker 6s ease-in-out infinite",
        "scan":       "scan 8s linear infinite",
      },
      keyframes: {
        pulseSoft: { "0%, 100%": { opacity: ".4" }, "50%": { opacity: "1" } },
        drift:     { "0%": { transform: "translate3d(0,0,0)" }, "100%": { transform: "translate3d(-30px,-50px,0)" } },
        flicker:   { "0%, 100%": { opacity: ".7" }, "45%, 55%": { opacity: "1" }, "47%": { opacity: ".4" } },
        scan:      { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
      },
    },
  },
  plugins: [],
};
export default config;
