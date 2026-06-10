import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ZODIAC, visibleTonight } from "@/lib/zodiac-data";

export const Route = createFileRoute("/zodiac/$sign")({
  loader: ({ params }) => {
    const sign = ZODIAC.find((s) => s.id === params.sign);
    if (!sign) throw notFound();
    return { id: sign.id };
  },
  head: ({ loaderData }) => {
    const sign = ZODIAC.find((s) => s.id === loaderData?.id);
    return {
      meta: [
        { title: `${sign?.en ?? "Constellation"} · ${sign?.zh ?? ""} | COSMOS Zodiac` },
        { name: "description", content: `${sign?.en} constellation — star map, key data and mythology.` },
        { property: "og:title", content: `${sign?.en} · ${sign?.zh} | COSMOS Zodiac` },
        { property: "og:description", content: `${sign?.en} constellation — star map, data and myth.` },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">This constellation isn't in our sky.</p>
      <Link to="/zodiac" className="border border-border px-6 py-2 text-xs uppercase tracking-wide-x">
        Back to Zodiac
      </Link>
    </div>
  ),
  component: SignPage,
});

function SignPage() {
  const { id } = Route.useLoaderData();
  const sign = ZODIAC.find((s) => s.id === id)!;
  const [drawn, setDrawn] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  useEffect(() => {
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [id]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragging.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const d = dragging.current;
    setRot({
      y: d.ry + (e.clientX - d.x) * 0.4,
      x: Math.max(-60, Math.min(60, d.rx - (e.clientY - d.y) * 0.3)),
    });
  };
  const onPointerUp = () => {
    dragging.current = null;
  };

  const tonight = visibleTonight(sign);
  const lineLength = 60; // approx for dash animation

  return (
    <main className="relative min-h-screen px-4 pb-24 pt-24 md:px-10">
      <Link
        to="/zodiac"
        aria-label="Close"
        className="fixed right-6 top-6 z-30 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground md:right-20"
      >
        ✕
      </Link>

      <header className="animate-fade-up text-center">
        <h1 className="font-display text-2xl font-extralight tracking-wide-x md:text-3xl">
          <span className="font-zh">{sign.zh}</span>
          <span className="mx-4 text-muted-foreground">·</span>
          {sign.en}
        </h1>
        <p className="mt-3 text-xs tracking-wide-x">
          {tonight ? (
            <span className="text-accent">● Visible tonight · 今晚可见</span>
          ) : (
            <span className="text-muted-foreground/70">○ Not in tonight's sky · 今晚不可见</span>
          )}
        </p>
      </header>

      {/* Constellation map — drag to rotate in 3D */}
      <div
        className="mx-auto mt-6 max-w-3xl cursor-grab touch-none active:cursor-grabbing"
        style={{ perspective: "900px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg
          viewBox="0 0 100 100"
          className="mx-auto aspect-square w-full max-w-[520px] transition-transform duration-100"
          style={{ transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg)`, transformStyle: "preserve-3d" }}
        >
          {sign.lines.map(([a, b], i) => {
            const s1 = sign.stars[a];
            const s2 = sign.stars[b];
            return (
              <line
                key={i}
                x1={s1.x}
                y1={s1.y}
                x2={s2.x}
                y2={s2.y}
                stroke="rgba(237,240,244,0.35)"
                strokeWidth="0.25"
                strokeDasharray={lineLength}
                strokeDashoffset={drawn ? 0 : lineLength}
                style={{
                  transition: `stroke-dashoffset 0.7s ease ${0.25 + i * 0.18}s`,
                }}
              />
            );
          })}
          {sign.stars.map((s, i) => (
            <g key={i}>
              <circle
                cx={s.x}
                cy={s.y}
                r={s.name ? 0.9 : 0.55}
                fill="#EDF0F4"
                className="animate-twinkle"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              {s.name && (
                <>
                  <text x={s.x + 1.8} y={s.y - 1} fill="rgba(237,240,244,0.85)" fontSize="2.2" fontFamily="JetBrains Mono, monospace">
                    {s.name}
                  </text>
                  <text x={s.x + 1.8} y={s.y + 2} fill="rgba(107,114,128,0.9)" fontSize="1.6" fontFamily="JetBrains Mono, monospace">
                    {s.dist}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
        <p className="mt-2 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
          Drag to rotate · 拖拽旋转观测
        </p>
      </div>

      {/* Data */}
      <section className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px border border-border bg-border/50 md:grid-cols-4">
        {[
          { k: "Main star · 主星", v: sign.mainStar },
          { k: "Distance · 距离", v: sign.distance },
          { k: "Best season · 观测季", v: `${sign.season}` },
          { k: "RA / Dec · 赤经赤纬", v: `${sign.ra} / ${sign.dec}` },
        ].map((d) => (
          <div key={d.k} className="bg-background/85 p-4">
            <p className="text-[10px] uppercase tracking-wide-x text-muted-foreground">{d.k}</p>
            <p className="font-mono-data mt-2 text-xs text-foreground">{d.v}</p>
          </div>
        ))}
      </section>

      {/* Myth */}
      <section className="mx-auto mt-14 max-w-2xl">
        <h2 className="font-display text-center text-lg font-extralight uppercase tracking-cosmos text-foreground">
          Mythology <span className="font-zh ml-3 text-sm normal-case tracking-[0.4em] text-muted-foreground">神话</span>
        </h2>
        <div className="mt-6 space-y-5 text-sm font-light leading-loose text-foreground/85">
          {sign.myth.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="font-zh text-xs leading-loose text-muted-foreground">{sign.mythZh}</p>
        </div>
      </section>
    </main>
  );
}
