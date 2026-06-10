import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GALAXIES, GALAXY_TYPES, MILKY_WAY_DIAMETER, type Galaxy, type GalaxyType } from "@/lib/galaxy-data";

export const Route = createFileRoute("/galaxies")({
  head: () => ({
    meta: [
      { title: "Galaxy Atlas — Islands of Stars | COSMOS" },
      {
        name: "description",
        content: "Elliptical, spiral, irregular and lenticular galaxies — Hubble-style imagery with real data and a Milky Way size comparator.",
      },
      { property: "og:title", content: "Galaxy Atlas — Islands of Stars | COSMOS" },
      { property: "og:description", content: "Galaxy types explained with imagery, data and size comparisons." },
    ],
  }),
  component: GalaxiesPage,
});

function GalaxiesPage() {
  const [filter, setFilter] = useState<GalaxyType | "all">("all");
  const [open, setOpen] = useState<Galaxy | null>(null);

  const list = useMemo(
    () => (filter === "all" ? GALAXIES : GALAXIES.filter((g) => g.type === filter)),
    [filter],
  );

  const randomJump = () => {
    const g = GALAXIES[Math.floor(Math.random() * GALAXIES.length)];
    setOpen(g);
  };

  return (
    <main className="min-h-screen px-4 pb-28 pt-28 md:px-12 md:pt-32">
      <header className="text-center">
        <h1 className="font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl">Galaxies</h1>
        <p className="font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground">星系图鉴</p>
      </header>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`border px-4 py-1.5 text-[11px] uppercase tracking-wide-x transition-colors ${
            filter === "all" ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All · 全部
        </button>
        {GALAXY_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`border px-4 py-1.5 text-[11px] uppercase tracking-wide-x transition-colors ${
              filter === t.id ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.en} · <span className="font-zh normal-case">{t.zh}</span>
          </button>
        ))}
        <button
          onClick={randomJump}
          className="border border-accent/60 px-4 py-1.5 text-[11px] uppercase tracking-wide-x text-accent transition-colors hover:bg-accent/10"
        >
          ✦ Take me anywhere · 带我去任何地方
        </button>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((g) => (
          <button
            key={g.id}
            onClick={() => setOpen(g)}
            className="group border border-border bg-background/80 text-left transition-colors duration-300 hover:border-foreground/40"
          >
            <div className="overflow-hidden">
              <img
                src={g.image}
                alt={`${g.name} galaxy`}
                width={800}
                height={608}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            </div>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-sm font-light tracking-wide-x">{g.name}</h2>
                <span className="font-zh text-[11px] text-muted-foreground">{g.nameZh}</span>
              </div>
              <p className="font-mono-data mt-2 text-[10px] text-muted-foreground">
                {g.distance} · ⌀ {g.diameterLabel}
              </p>
            </div>
          </button>
        ))}
      </div>

      {open && <GalaxyDetail galaxy={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

function GalaxyDetail({ galaxy, onClose }: { galaxy: Galaxy; onClose: () => void }) {
  const [zoom, setZoom] = useState(50);
  const ratio = galaxy.diameterLy / MILKY_WAY_DIAMETER;
  // base sizes in px; zoom scales both equally
  const scale = 0.4 + (zoom / 100) * 1.2;
  const mwSize = 90 * scale;
  const gSize = Math.min(240, Math.max(8, 90 * ratio * scale));
  const typeInfo = GALAXY_TYPES.find((t) => t.id === galaxy.type);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={galaxy.name}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-6 top-6 z-10 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground md:right-10"
      >
        ✕
      </button>
      <div className="animate-fade-up mx-auto max-w-3xl px-6 py-20">
        <img
          src={galaxy.image}
          alt={`${galaxy.name} galaxy, Hubble-style view`}
          width={800}
          height={608}
          className="w-full border border-border object-cover"
        />
        <h2 className="font-display mt-8 text-2xl font-extralight tracking-wide-x">
          {galaxy.name}
          <span className="font-zh ml-4 text-lg text-muted-foreground">{galaxy.nameZh}</span>
        </h2>
        <div className="mt-6 grid grid-cols-3 gap-px border border-border bg-border/50">
          {[
            { k: "Type · 类型", v: `${typeInfo?.en} ${typeInfo?.zh}` },
            { k: "Distance · 距离", v: galaxy.distance },
            { k: "Diameter · 直径", v: galaxy.diameterLabel },
          ].map((d) => (
            <div key={d.k} className="bg-background p-4">
              <p className="text-[10px] uppercase tracking-wide-x text-muted-foreground">{d.k}</p>
              <p className="font-mono-data mt-2 text-xs">{d.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm font-light leading-loose text-foreground/85">{galaxy.fact}</p>
        <p className="font-zh mt-2 text-xs leading-loose text-muted-foreground">{galaxy.factZh}</p>

        {/* Size comparator */}
        <section className="mt-12 border border-border p-6">
          <h3 className="text-center text-xs uppercase tracking-wide-x text-muted-foreground">
            Size vs the Milky Way · 与银河系对比
          </h3>
          <div className="mt-6 flex items-center justify-center gap-12">
            <figure className="flex flex-col items-center gap-3">
              <span
                className="rounded-full border border-accent/70 bg-accent/10 transition-all duration-300"
                style={{ width: gSize, height: gSize }}
              />
              <figcaption className="font-mono-data text-[10px] text-muted-foreground">{galaxy.name.split("·")[0]}</figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <span
                className="rounded-full border border-foreground/60 bg-foreground/10 transition-all duration-300"
                style={{ width: mwSize, height: mwSize }}
              />
              <figcaption className="font-mono-data text-[10px] text-muted-foreground">Milky Way 银河系</figcaption>
            </figure>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom comparison"
            className="mt-8 w-full accent-foreground"
          />
          <p className="mt-2 text-center text-[10px] tracking-wide-x text-muted-foreground/60">
            Drag to zoom · {ratio >= 1 ? `${ratio.toFixed(1)}× the Milky Way` : `${(ratio * 100).toFixed(0)}% of the Milky Way`}
          </p>
        </section>
      </div>
    </div>
  );
}
