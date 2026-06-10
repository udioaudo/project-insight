import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — COSMOS" },
      { name: "description", content: "About COSMOS — an immersive astronomy site. Data sources, imagery credits and intent." },
      { property: "og:title", content: "About — COSMOS" },
      { property: "og:description", content: "About COSMOS — data sources and intent." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-28 pt-32">
      <h1 className="font-display text-3xl font-extralight uppercase tracking-cosmos">About</h1>
      <p className="font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground">关于</p>

      <div className="mt-12 max-w-xl space-y-6 text-sm font-light leading-loose text-foreground/85">
        <p>
          COSMOS is an immersive guide to the universe — built on a simple idea:{" "}
          <em className="text-foreground">you are standing in the universe, and the universe is watching you back.</em>
        </p>
        <p className="font-zh text-xs leading-loose text-muted-foreground">
          COSMOS 是一个沉浸式宇宙科普网站。我们不神秘化星座，星图与现实一致；内容准确、有据可查。
        </p>
        <p>
          We treat constellations as astronomy, not mysticism — every star chart follows real positions, every distance is
          measured in light-years, and every story is labeled as the myth it is.
        </p>
      </div>

      <section className="mt-14 w-full max-w-xl border border-border p-6">
        <h2 className="text-xs uppercase tracking-wide-x text-muted-foreground">Data & imagery sources · 数据来源</h2>
        <ul className="font-mono-data mt-4 space-y-2 text-xs text-foreground/80">
          <li>· NASA Image and Video Library — public domain imagery</li>
          <li>· ESA / Hubble — public release archive</li>
          <li>· SIMBAD Astronomical Database — star distances & coordinates</li>
          <li>· NASA Exoplanet Archive — stellar data</li>
          <li>· Mythology texts — original writing, Greek & Babylonian sources noted</li>
        </ul>
      </section>

      <p className="mt-14 text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
        Psst — try the Konami code anywhere. <span className="font-zh">↑↑↓↓←→←→BA</span>
      </p>
    </main>
  );
}
