import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CHRONICLE, cosmicClock, trackPosition } from "@/lib/chronicle-data";

export const Route = createFileRoute("/chronicle")({
  head: () => ({
    meta: [
      { title: "Cosmic Chronicle — 13.8 Billion Years | COSMOS" },
      {
        name: "description",
        content: "The history of the universe from the Big Bang to this very moment, mapped onto a single cosmic day.",
      },
      { property: "og:title", content: "Cosmic Chronicle — 13.8 Billion Years | COSMOS" },
      { property: "og:description", content: "From the Big Bang to this very moment, mapped onto a single day." },
    ],
  }),
  component: ChroniclePage,
});

function ChroniclePage() {
  const [selected, setSelected] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const event = CHRONICLE[selected];
  const isLast = selected === CHRONICLE.length - 1;

  const select = (i: number) => {
    setSelected(i);
    setBurstKey((k) => k + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24 pt-28 md:pt-32">
      <header className="text-center">
        <h1 className="font-zh text-3xl font-light tracking-[0.5em] md:text-4xl">宇宙编年史</h1>
        <p className="mt-3 text-[11px] uppercase tracking-wide-x text-muted-foreground">
          Cosmic Chronicle — 13.8 billion years mapped onto one day
        </p>
        <p className="font-zh mt-1 text-[11px] tracking-[0.3em] text-muted-foreground/70">将138亿年映射在我们的一天</p>
      </header>

      {/* Cosmic clock */}
      <div key={event.id} className="animate-fade-up mt-10 text-center">
        <p className="font-display text-glow text-6xl font-thin tracking-[0.15em] tabular-nums md:text-8xl">
          {cosmicClock(event.yearsAgo)}
        </p>
      </div>

      {/* Track */}
      <div className="relative mt-12 h-12 w-full max-w-3xl">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
        {CHRONICLE.map((e, i) => {
          const pos = trackPosition(e.yearsAgo) * 100;
          const active = i === selected;
          return (
            <button
              key={e.id}
              aria-label={e.title}
              onClick={() => select(i)}
              className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-2"
              style={{ left: `${pos}%` }}
            >
              {active && (
                <span
                  key={burstKey}
                  className="animate-burst absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60"
                />
              )}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? "h-2.5 w-2.5 bg-foreground shadow-[0_0_10px_rgba(237,240,244,0.9)]"
                    : "h-1.5 w-1.5 bg-muted-foreground/60 group-hover:bg-foreground/80"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Event card */}
      <article key={`card-${event.id}`} className="animate-fade-up mt-6 w-full max-w-xl text-center">
        <h2 className="font-display text-xl font-extralight tracking-wide-x">
          {event.title}
          <span className="font-zh ml-4 text-base text-muted-foreground">{event.titleZh}</span>
        </h2>
        <p className="font-mono-data mt-3 text-xs text-accent">
          {event.timeLabel} <span className="font-zh ml-2 text-muted-foreground">{event.timeLabelZh}</span>
        </p>
        <p className="mt-5 text-sm font-light leading-loose text-foreground/85">{event.desc}</p>
        <p className="font-zh mt-3 text-xs leading-loose text-muted-foreground">{event.descZh}</p>

        {isLast && (
          <div className="mt-10 flex flex-col items-center gap-3">
            {/* tiny human silhouette */}
            <svg viewBox="0 0 24 48" className="h-12 w-6 fill-foreground/80" aria-hidden="true">
              <circle cx="12" cy="6" r="4" />
              <path d="M8 12 h8 v14 l-2 0 v18 h-3 v-16 h-2 v16 H6 V26 l2 0 z" />
            </svg>
            <p className="text-xs tracking-wide-x text-muted-foreground">
              You are here. <span className="font-zh ml-2">这就是现在</span>
            </p>
          </div>
        )}
      </article>

      {/* prev / next */}
      <div className="mt-10 flex items-center gap-8">
        <button
          onClick={() => select(Math.max(0, selected - 1))}
          disabled={selected === 0}
          className="border border-border px-5 py-1.5 text-xs uppercase tracking-wide-x text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          ← Earlier
        </button>
        <span className="font-mono-data text-[10px] text-muted-foreground/60">
          {selected + 1} / {CHRONICLE.length}
        </span>
        <button
          onClick={() => select(Math.min(CHRONICLE.length - 1, selected + 1))}
          disabled={isLast}
          className="border border-border px-5 py-1.5 text-xs uppercase tracking-wide-x text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          Later →
        </button>
      </div>

      <p className="mt-8 text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
        Click a node to jump · 点击节点跳转
      </p>
    </main>
  );
}
