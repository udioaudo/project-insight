import { createFileRoute, Link } from "@tanstack/react-router";
import { Typewriter } from "@/components/cosmos/Typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COSMOS — 13.8 Billion Years, Waiting for You" },
      {
        name: "description",
        content: "An immersive journey through the universe: zodiac constellations, cosmic chronicle, galaxies and nebulae.",
      },
      { property: "og:title", content: "COSMOS — 13.8 Billion Years, Waiting for You" },
      { property: "og:description", content: "An immersive journey through the universe." },
    ],
  }),
  component: Index,
});

const MODULES = [
  {
    to: "/zodiac",
    en: "Zodiac",
    zh: "十二星座",
    blurb: "Twelve constellations — myth and astronomy, seen with both eyes.",
  },
  {
    to: "/chronicle",
    en: "Chronicle",
    zh: "宇宙编年史",
    blurb: "13.8 billion years compressed into a single day you can scroll.",
  },
  {
    to: "/galaxies",
    en: "Galaxies",
    zh: "星系图鉴",
    blurb: "Islands of a hundred billion suns, sorted by their shapes.",
  },
  {
    to: "/nebulae",
    en: "Nebulae",
    zh: "星云图鉴",
    blurb: "Where stars are born, and where they return to dust.",
  },
];

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="animate-fade-up font-display text-glow text-center text-6xl font-thin uppercase tracking-cosmos sm:text-7xl md:text-8xl lg:text-9xl">
          Cosmos
        </h1>
        <p className="mt-8 h-6 text-center text-sm font-light tracking-wide-x text-muted-foreground md:text-base">
          <Typewriter text="13.8 billion years, waiting for you." />
        </p>
        <p className="font-zh mt-2 text-center text-xs tracking-[0.5em] text-muted-foreground/70">
          138亿年，等你来看
        </p>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-wide-x">Scroll</span>
          <span className="animate-drift-down text-lg font-thin">↓</span>
        </div>
      </section>

      {/* Module entrances */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-32">
        <div className="grid gap-px border border-border bg-border/50 sm:grid-cols-2">
          {MODULES.map((m, i) => (
            <Link
              key={m.to}
              to={m.to}
              className="group relative flex min-h-[180px] flex-col justify-between bg-background/85 p-8 transition-colors duration-500 hover:bg-secondary/60"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-extralight uppercase tracking-wide-x text-foreground">
                  {m.en}
                </h2>
                <span className="font-zh text-xs tracking-[0.4em] text-muted-foreground">{m.zh}</span>
              </div>
              <div>
                <p className="max-h-0 overflow-hidden text-sm font-light leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                  {m.blurb}
                </p>
                <span className="mt-4 inline-block text-xs uppercase tracking-wide-x text-muted-foreground/60 transition-colors group-hover:text-foreground">
                  Enter →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-16 text-center text-[11px] tracking-wide-x text-muted-foreground/50">
          You are standing in the universe. The universe is watching you back.
          <span className="font-zh ml-3">你站在宇宙中，宇宙也在注视你</span>
        </p>
      </section>
    </main>
  );
}
