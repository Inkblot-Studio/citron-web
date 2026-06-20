'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The atmosphere of the journey: a deep warm-black void, two slow auroras,
 * a faint depth grid, and a canvas ember field that drifts upward like
 * particles rising through an intelligent space. Tuned for 60fps — capped
 * particle count, single rAF loop, paused when the tab is hidden.
 */
export function ExperienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };
    let particles: P[] = [];

    function seed() {
      const count = Math.min(70, Math.round((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.22 + 0.05),
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.tw += 0.02;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const flicker = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(217,188,88,${flicker.toFixed(3)})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame();

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base void */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, #16130d 0%, #0e0c08 45%, #0a0907 100%)',
        }}
      />

      {/* Depth grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,188,88,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(217,188,88,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(75% 60% at 50% 40%, black 0%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(75% 60% at 50% 40%, black 0%, transparent 85%)',
        }}
      />

      {/* Auroras */}
      <div
        className="absolute left-[12%] top-[8%] h-[34rem] w-[34rem] animate-aura rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(217,188,88,0.16), transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-[6%] right-[10%] h-[40rem] w-[40rem] animate-aura rounded-full blur-3xl [animation-delay:-9s]"
        style={{
          background:
            'radial-gradient(circle, rgba(196,160,48,0.12), transparent 65%)',
        }}
      />

      {/* Ember field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette for focus + legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 90% at 50% 50%, transparent 55%, rgba(8,7,5,0.55) 100%)',
        }}
      />
    </div>
  );
}
