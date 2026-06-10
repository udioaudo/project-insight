import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ZODIAC, currentSignIndex, visibleTonight } from "@/lib/zodiac-data";

export const Route = createFileRoute("/zodiac/")({
  head: () => ({
    meta: [
      { title: "Zodiac — Twelve Constellations | COSMOS" },
      {
        name: "description",
        content: "Rotate the ecliptic wheel and explore the twelve zodiac constellations — myth and astronomy together.",
      },
      { property: "og:title", content: "Zodiac — Twelve Constellations | COSMOS" },
      { property: "og:description", content: "Rotate the ecliptic wheel and explore the twelve zodiac constellations." },
    ],
  }),
  component: ZodiacPage,
});

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function ZodiacPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(() => currentSignIndex());
  const wheelLock = useRef(0);
  const dragStart = useRef<number | null>(null);

  // wheel rotate
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - wheelLock.current < 350) return;
      if (Math.abs(e.deltaY) < 12 && Math.abs(e.deltaX) < 12) return;
      wheelLock.current = now;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      setIndex((i) => mod(i + (delta > 0 ? 1 : -1), 12));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 40) setIndex((i) => mod(i + (dx < 0 ? 1 : -1), 12));
  };

  const sign = ZODIAC[index];
  const tonight = visibleTonight(sign);
  const monthSign = currentSignIndex();

  return (
    <main
      className="flex min-h-screen touch-pan-y select-none flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-24"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <header className="text-center">
        <h1 className="font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl">Zodiac</h1>
        <p className="font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground">十二星座</p>
      </header>

      {/* Arc wheel */}
      <div className="relative mt-10 flex h-64 w-full max-w-4xl items-end justify-center md:h-72">
        {ZODIAC.map((s, i) => {
          let offset = mod(i - index, 12);
          if (offset > 6) offset -= 12; // -5..6
          const visible = Math.abs(offset) <= 3;
          const x = offset * 120;
          const y = Math.abs(offset) * Math.abs(offset) * 14;
          const scale = offset === 0 ? 1 : Math.max(0.45, 1 - Math.abs(offset) * 0.22);
          const opacity = visible ? (offset === 0 ? 1 : 0.85 - Math.abs(offset) * 0.22) : 0;
          return (
            <button
              key={s.id}
              aria-label={`${s.en} ${s.zh}`}
              onClick={() => {
                if (offset === 0) {
                  navigate({ to: "/zodiac/$sign", params: { sign: s.id } });
                } else {
                  setIndex(i);
                }
              }}
              className="absolute bottom-16 flex flex-col items-center transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
                opacity,
                pointerEvents: visible ? "auto" : "none",
                zIndex: 10 - Math.abs(offset),
              }}
            >
              <span
                className={`font-display text-6xl font-thin transition-all duration-500 md:text-7xl ${
                  offset === 0 ? "text-glow text-foreground" : "text-muted-foreground/70"
                }`}
              >
                {`${s.symbol}\uFE0E`}
              </span>
              {i === monthSign && (
                <span className="mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(74,144,184,0.9)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected sign info */}
      <div key={sign.id} className="animate-fade-up mt-2 text-center">
        <h2 className="font-display text-2xl font-extralight tracking-wide-x">
          {sign.en}
          <span className="font-zh ml-4 text-lg text-muted-foreground">{sign.zh}</span>
        </h2>
        <p className="font-mono-data mt-2 text-xs text-muted-foreground">{sign.dates}</p>
        <p className="mt-3 text-xs tracking-wide-x">
          {tonight ? (
            <span className="text-accent">● Visible tonight · 今晚可见</span>
          ) : (
            <span className="text-muted-foreground/70">○ Not in tonight's sky · 今晚不可见</span>
          )}
        </p>
        <button
          onClick={() => navigate({ to: "/zodiac/$sign", params: { sign: sign.id } })}
          className="mt-6 border border-border px-8 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary"
        >
          View constellation · 查看星座
        </button>
      </div>

      <p className="mt-10 text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
        Scroll, drag or click to rotate the ecliptic · 滚动或拖拽旋转黄道
      </p>
    </main>
  );
}
