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

  // Box size in px for the 3D scene
  const BOX = 520;

  // Parse distance "65.8 ly" → number; fall back to median per constellation.
  const parsedDist = sign.stars.map((s) => {
    if (!s.dist) return NaN;
    const n = parseFloat(s.dist.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  });
  const known = parsedDist.filter((n) => Number.isFinite(n));
  const minD = known.length ? Math.min(...known) : 50;
  const maxD = known.length ? Math.max(...known) : 500;
  const median = known.length ? known[Math.floor(known.length / 2)] : (minD + maxD) / 2;

  // Map distance → z depth (px). Closer star = +z (toward viewer).
  // Use log scale so a wide range (30 ly … 1500 ly) still reads.
  const Z_RANGE = 220;
  const depth = (ly: number) => {
    if (!Number.isFinite(ly)) ly = median;
    const lo = Math.log(Math.max(minD, 1));
    const hi = Math.log(Math.max(maxD, lo + 1));
    const t = (Math.log(ly) - lo) / (hi - lo || 1); // 0..1, 0=closest
    return Z_RANGE * (0.5 - t); // closest → +Z_RANGE/2, farthest → -Z_RANGE/2
  };

  // Star positions in 3D scene-space (px, centered at BOX/2,BOX/2,0)
  const points3D = sign.stars.map((s, i) => ({
    x: (s.x / 100) * BOX,
    y: (s.y / 100) * BOX,
    z: depth(parsedDist[i]),
    sizeScale: 0.6 + (depth(parsedDist[i]) + Z_RANGE / 2) / Z_RANGE * 0.9, // farther = smaller
  }));

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

      {/* Constellation map — true 3D perspective, drag to rotate */}
      <div
        className="mx-auto mt-6 flex max-w-3xl cursor-grab touch-none justify-center active:cursor-grabbing"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="relative"
          style={{
            width: BOX,
            height: BOX,
            maxWidth: "100%",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg)`,
            transition: "transform 80ms linear",
          }}
        >
          {/* Reference plane — faint grid to anchor the 3D depth */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: "translateZ(0px)",
              background:
                "radial-gradient(circle at 50% 50%, rgba(237,240,244,0.04) 0%, transparent 60%)",
              border: "1px dashed rgba(237,240,244,0.06)",
            }}
          />

          {/* Lines between stars — each is a thin div rotated in 3D */}
          {sign.lines.map(([a, b], i) => {
            const p1 = points3D[a];
            const p2 = points3D[b];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dz = p2.z - p1.z;
            const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const lenXZ = Math.sqrt(dx * dx + dz * dz);
            const yaw = (Math.atan2(-dz, dx) * 180) / Math.PI;
            const pitch = (Math.atan2(dy, lenXZ) * 180) / Math.PI;
            return (
              <div
                key={i}
                className="absolute left-0 top-0 origin-left"
                style={{
                  width: drawn ? len : 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(237,240,244,0.45), rgba(237,240,244,0.18))",
                  transform: `translate3d(${p1.x}px, ${p1.y}px, ${p1.z}px) rotateY(${yaw}deg) rotateZ(${pitch}deg)`,
                  transformOrigin: "0 50%",
                  transition: `width 0.7s ease ${0.25 + i * 0.12}s, opacity 0.6s ease`,
                  opacity: drawn ? 1 : 0,
                  boxShadow: "0 0 6px rgba(237,240,244,0.15)",
                }}
              />
            );
          })}

          {/* Stars */}
          {sign.stars.map((s, i) => {
            const p = points3D[i];
            const baseR = s.name ? 5 : 3;
            const r = baseR * p.sizeScale;
            return (
              <div
                key={i}
                className="absolute left-0 top-0"
                style={{
                  transform: `translate3d(${p.x - r}px, ${p.y - r}px, ${p.z}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="animate-twinkle rounded-full bg-foreground"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    boxShadow: `0 0 ${r * 3}px rgba(237,240,244,0.85), 0 0 ${r * 6}px rgba(237,240,244,0.35)`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
                {s.name && (
                  <div
                    className="pointer-events-none absolute whitespace-nowrap font-mono-data text-[10px] leading-tight"
                    style={{
                      left: r * 2 + 6,
                      top: -2,
                      // Counter-rotate label so it always faces the viewer
                      transform: `rotateX(${-rot.x}deg) rotateY(${-rot.y}deg)`,
                      transformOrigin: "0 50%",
                    }}
                  >
                    <div className="text-foreground/85">{s.name}</div>
                    <div className="text-muted-foreground/80">{s.dist}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50">
        Drag to rotate · stars positioned by real distance · 拖拽旋转，按真实距离立体分布
      </p>

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
