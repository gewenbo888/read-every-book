"use client";

import { useEffect, useRef } from "react";

/**
 * TokenRiver
 * A canvas-based river of subword tokens streaming from books → embeddings.
 * Sized to its container; designed to sit behind Section 2.
 */
const TOKENS = [
  "Renaissance", "Alexandria", "▎", "▌", "the", "▁of",  "compression",
  "▁knowledge", "civilization", "tokens", "embeddings", "▁mind",
  "transformer", "latent", "墨", "字", "知", "▁book", "▁read",
  "0.847", "-1.231", "0.012", "<bos>", "<eos>", "softmax", "→",
  "attention", "▁world", "印刷术", "学习", "数", "记忆",
  "意识", "智", "代码", "vector", "logit", "▁why",
];

export default function TokenRiver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(320, r.width);
      h = Math.max(240, r.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    setSize();

    type Tok = { x: number; y: number; vx: number; text: string; size: number; alpha: number; hue: number; lane: number };
    const COUNT = 80;
    const lanes = 7;
    const toks: Tok[] = [];
    for (let i = 0; i < COUNT; i++) {
      const lane = Math.floor(Math.random() * lanes);
      toks.push({
        x: Math.random() * w,
        y: ((lane + 0.5) / lanes) * h + (Math.random() - 0.5) * 12,
        vx: 18 + Math.random() * 30,
        text: TOKENS[Math.floor(Math.random() * TOKENS.length)],
        size: 11 + Math.random() * 7,
        alpha: 0.25 + Math.random() * 0.55,
        hue: Math.random(),
        lane,
      });
    }

    const ro = new ResizeObserver(setSize);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // faint horizontal current bands
      ctx.save();
      for (let i = 0; i < lanes; i++) {
        const y = ((i + 0.5) / lanes) * h;
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "rgba(125,211,252,0)");
        grad.addColorStop(0.5, "rgba(125,211,252,0.05)");
        grad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      ctx.font = `300 13px "JetBrains Mono", monospace`;
      for (const t of toks) {
        t.x += t.vx * dt;
        if (t.x > w + 40) {
          t.x = -80;
          t.text = TOKENS[Math.floor(Math.random() * TOKENS.length)];
          t.alpha = 0.25 + Math.random() * 0.55;
          t.hue = Math.random();
        }
        // dye each token by hue lane
        const photon = `rgba(125, 211, 252, ${t.alpha})`;
        const latent = `rgba(167, 139, 250, ${t.alpha})`;
        const ember  = `rgba(251, 191, 36, ${t.alpha})`;
        const color = t.hue < 0.6 ? photon : t.hue < 0.92 ? latent : ember;
        ctx.fillStyle = color;
        ctx.font = `${t.text.startsWith("▁") || t.text.startsWith("▎") ? 400 : 300} ${t.size}px "JetBrains Mono", monospace`;
        ctx.fillText(t.text, t.x, t.y);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
