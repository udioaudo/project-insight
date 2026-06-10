import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  layer: number; // 0 far, 1 mid, 2 near
  baseAlpha: number;
  phase: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

/** Fullscreen 3-layer parallax starfield with occasional shooting stars. */
export function Starfield({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteorAt = performance.now() + 8000 + Math.random() * 20000;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = w < 768;
      const count = Math.floor((isMobile ? 110 : 240) * density);
      stars = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer === 0 ? 0.5 + Math.random() * 0.5 : layer === 1 ? 0.8 + Math.random() * 0.8 : 1.2 + Math.random() * 1.3,
          layer,
          baseAlpha: layer === 0 ? 0.25 + Math.random() * 0.3 : layer === 1 ? 0.4 + Math.random() * 0.35 : 0.6 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };

    const draw = (t: number) => {
      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const depth = [4, 10, 22][s.layer];
        const ox = (smooth.x - 0.5) * depth;
        const oy = (smooth.y - 0.5) * depth;
        const tw = reduced ? 1 : 0.7 + 0.3 * Math.sin(t / 1400 + s.phase);
        ctx.globalAlpha = s.baseAlpha * tw;
        ctx.fillStyle = "#EDF0F4";
        ctx.beginPath();
        ctx.arc(s.x - ox, s.y - oy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting star
      if (!reduced) {
        if (!meteor && t > nextMeteorAt) {
          const fromLeft = Math.random() < 0.5;
          meteor = {
            x: fromLeft ? -50 : w * (0.5 + Math.random() * 0.5),
            y: Math.random() * h * 0.35,
            vx: 7 + Math.random() * 5,
            vy: 3 + Math.random() * 2,
            life: 1,
          };
          nextMeteorAt = t + 30000 + Math.random() * 30000;
        }
        if (meteor) {
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.012;
          if (meteor.life <= 0 || meteor.x > w + 100 || meteor.y > h + 100) {
            meteor = null;
          } else {
            const m = meteor;
            const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
            grad.addColorStop(0, `rgba(237,240,244,${0.85 * m.life})`);
            grad.addColorStop(1, "rgba(237,240,244,0)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
