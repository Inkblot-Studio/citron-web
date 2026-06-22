'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * An elegant cursor ribbon. A smooth gold filament trails the pointer with an
 * eased lag, tapering from a soft glowing head to nothing at the tail — a
 * single flowing line drawn through the recent path, never a spray of dots.
 * The render loop sleeps when the pointer is still, so it costs nothing at rest.
 *
 * Desktop, fine-pointer only; disabled entirely for reduced motion.
 */
export function CursorTrail() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const GOLD = '236, 205, 116';
    const MAX_POINTS = 28;
    const HEAD_WIDTH = 5.5;

    type Pt = { x: number; y: number };
    const pts: Pt[] = [];

    let mx = -100;
    let my = -100;
    let head = { x: mx, y: my };
    let seeded = false;
    let lastMove = 0;
    let raf = 0;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const n = pts.length;
      if (n < 2) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw tail → head so the brightest, widest part lands on top.
      for (let i = 1; i < n; i++) {
        const t = i / (n - 1); // 0 at tail, 1 at head
        const prev = pts[i - 1];
        const cur = pts[i];
        const mid = { x: (prev.x + cur.x) / 2, y: (prev.y + cur.y) / 2 };

        ctx.strokeStyle = `rgba(${GOLD}, ${0.42 * t * t})`;
        ctx.lineWidth = HEAD_WIDTH * t + 0.4;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.stroke();
      }

      // A soft luminous head.
      const headPt = pts[n - 1];
      const glow = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 14);
      glow.addColorStop(0, `rgba(${GOLD}, 0.5)`);
      glow.addColorStop(1, `rgba(${GOLD}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(headPt.x, headPt.y, 14, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = (t: number) => {
      const idle = t - lastMove > 90;

      // Ease the head toward the pointer for a smooth, weighted trail.
      head.x += (mx - head.x) * 0.3;
      head.y += (my - head.y) * 0.3;

      if (!idle) {
        pts.push({ x: head.x, y: head.y });
        while (pts.length > MAX_POINTS) pts.shift();
      } else if (pts.length > 0) {
        // Drain the ribbon gracefully once the pointer rests.
        pts.shift();
      }

      draw();

      if (idle && pts.length === 0) {
        running = false;
        ctx.clearRect(0, 0, w, h);
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const wake = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
      if (!seeded) {
        head = { x: mx, y: my };
        seeded = true;
      }
      wake();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[36] hidden lg:block"
    />
  );
}
