import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { COLOR_CODE, NEBULAE, NEBULA_TYPES, type Nebula } from "@/lib/nebula-data";

export const Route = createFileRoute("/nebulae")({
  head: () => ({
    meta: [
      { title: "Nebula Atlas — Where Stars Are Born | COSMOS" },
      {
        name: "description",
        content: "Emission, reflection, dark, planetary nebulae and supernova remnants — with the Hubble color decoder.",
      },
      { property: "og:title", content: "Nebula Atlas — Where Stars Are Born | COSMOS" },
      { property: "og:description", content: "The most beautiful objects in the sky, with the Hubble color decoder." },
    ],
  }),
  component: NebulaePage,
});

function NebulaePage() {
  const [open, setOpen] = useState<Nebula | null>(null);

  return (
    <main className="min-h-screen px-4 pb-28 pt-28 md:px-12 md:pt-32">
      <header className="text-center">
        <h1 className="font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl">Nebulae</h1>
        <p className="font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground">星云图鉴</p>
      </header>

      {/* Stellar life cycle loop */}
      <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-wide-x text-muted-foreground">
        {["Nebula 星云", "Star 恒星", "Supernova 超新星"].map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="font-zh tracking-wide-x">{s}</span>
            <span className="animate-twinkle text-accent" style={{ animationDelay: `${i * 0.7}s` }}>
              →
            </span>
          </span>
        ))}
        <span className="font-zh">Nebula 星云 ⟲</span>
      </div>

      {/* Color decoder legend */}
      <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-4">
        {COLOR_CODE.map((c) => (
          <span key={c.el} className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
            {c.el} <span className="font-zh">{c.elZh}</span>
          </span>
        ))}
        <span className="text-[10px] tracking-wide-x text-muted-foreground/60">— the Hubble color code · 哈勃色彩密码</span>
      </div>

      {/* Masonry */}
      <div className="mx-auto mt-10 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {NEBULAE.map((n) => {
          const type = NEBULA_TYPES.find((t) => t.id === n.type);
          return (
            <button
              key={n.id}
              onClick={() => setOpen(n)}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden border border-border text-left"
            >
              <img
                src={n.image}
                alt={`${n.name} nebula`}
                width={n.w}
                height={n.h}
                loading="lazy"
                className="w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h2 className="text-sm font-light tracking-wide-x">
                  {n.name}
                  <span className="font-zh ml-3 text-xs text-muted-foreground">{n.nameZh}</span>
                </h2>
                <p className="font-mono-data mt-1 text-[10px] text-muted-foreground">
                  {type?.en} {type?.zh} · {n.distance}
                </p>
                <div className="mt-2 flex gap-3">
                  {COLOR_CODE.slice(0, 3).map((c) => (
                    <span key={c.el} className="flex items-center gap-1 text-[9px] text-muted-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                      {c.el}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
        Click an image for immersive mode · 点击图片进入沉浸模式
      </p>

      {open && <NebulaImmersive nebula={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

function NebulaImmersive({ nebula, onClose }: { nebula: Nebula; onClose: () => void }) {
  const type = NEBULA_TYPES.find((t) => t.id === nebula.type);
  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-y-auto bg-[#000] p-6"
      role="dialog"
      aria-modal="true"
      aria-label={nebula.name}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        className="fixed right-6 top-6 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground"
      >
        ✕
      </button>
      <img
        src={nebula.image}
        alt={`${nebula.name} full view`}
        width={nebula.w}
        height={nebula.h}
        className="animate-fade-up max-h-[70vh] w-auto max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="animate-fade-up mt-6 max-w-xl text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-light tracking-wide-x">
          {nebula.name}
          <span className="font-zh ml-3 text-sm text-muted-foreground">{nebula.nameZh}</span>
        </h2>
        <p className="font-mono-data mt-1 text-[10px] text-muted-foreground">
          {type?.en} {type?.zh} · {nebula.distance}
        </p>
        <h3 className="mt-5 text-[10px] uppercase tracking-wide-x text-accent">What's happening here · 这里正在发生什么</h3>
        <p className="mt-2 text-xs font-light leading-loose text-foreground/85">{nebula.story}</p>
        <p className="font-zh mt-2 text-[11px] leading-loose text-muted-foreground">{nebula.storyZh}</p>
      </div>
    </div>
  );
}
