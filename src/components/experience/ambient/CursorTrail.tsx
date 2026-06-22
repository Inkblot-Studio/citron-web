'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A refined cursor trail. As the pointer moves it leaves a sparse wake of soft
 * amber dots that drift upward and fade out within ~0.8s — the kind of detail
 * you notice subconsciously, never a flashy particle burst. The native cursor
 * is kept for usability. The render loop sleeps when nothing is moving, so it
 * costs nothing at rest.
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

    type Dot = { x: number; y: number; vx: number; vy: number; life: number; r: number };
    const dots: Dot[] = [];

    let mx = -100;
    let my = -100;
    let lastX = mx;
    let lastY = my;
    let moved = false;
    let spawnAcc = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    const step = (t: number) => {
      const dt = last ? Math.min(t - last, 40) : 16;
      last = t;

      const dx = mx - lastX;
      const dy = my - lastY;
      const dist = Math.hypot(dx, dy);
      lastX = mx;
      lastY = my;

      if (moved && dist > 0.4) {
        spawnAcc += dist;
        while (spawnAcc > 16 && dots.length < 60) {
          spawnAcc -= 16;
          dots.push({
            x: mx + (Math.random() - 0.5) * 5,
            y: my + (Math.random() - 0.5) * 5,
            vx: (Math.random() - 0.5) * 0.012,
            vy: -0.02 - Math.random() * 0.04,
            life: 1,
            r: 1.6 + Math.random() * 2.2,
          });
        }
      }
      moved = false;

      ctx.clearRect(0, 0, w, h);
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= dt / 820;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        const alpha = d.life * d.life * 0.34;
        const radius = d.r * (0.55 + d.life * 0.7);
        const outer = radius * 3.4;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, outer);
        g.addColorStop(0, `rgba(168, 132, 28, ${alpha})`);
        g.addColorStop(1, 'rgba(168, 132, 28, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, outer, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sleep when there's nothing left to draw.
      if (dots.length === 0) {
        running = false;
        ctx.clearRect(0, 0, w, h);
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const wake = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moved = true;
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
