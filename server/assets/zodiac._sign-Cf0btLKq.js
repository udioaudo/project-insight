import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { R as Route, Z as ZODIAC, v as visibleTonight } from "./router-Drj2z4yF.js";
import "@tanstack/react-query";
function SignPage() {
  const {
    id
  } = Route.useLoaderData();
  const sign = ZODIAC.find((s) => s.id === id);
  const [drawn, setDrawn] = useState(false);
  const [rot, setRot] = useState({
    x: 0,
    y: 0
  });
  const dragging = useRef(null);
  useEffect(() => {
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [id]);
  const onPointerDown = (e) => {
    e.target.setPointerCapture?.(e.pointerId);
    dragging.current = {
      x: e.clientX,
      y: e.clientY,
      rx: rot.x,
      ry: rot.y
    };
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const d = dragging.current;
    setRot({
      y: d.ry + (e.clientX - d.x) * 0.4,
      x: Math.max(-60, Math.min(60, d.rx - (e.clientY - d.y) * 0.3))
    });
  };
  const onPointerUp = () => {
    dragging.current = null;
  };
  const tonight = visibleTonight(sign);
  const BOX = 520;
  const parsedDist = sign.stars.map((s) => {
    if (!s.dist) return NaN;
    const n = parseFloat(s.dist.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  });
  const known = parsedDist.filter((n) => Number.isFinite(n));
  const minD = known.length ? Math.min(...known) : 50;
  const maxD = known.length ? Math.max(...known) : 500;
  const median = known.length ? known[Math.floor(known.length / 2)] : (minD + maxD) / 2;
  const Z_RANGE = 220;
  const depth = (ly) => {
    if (!Number.isFinite(ly)) ly = median;
    const lo = Math.log(Math.max(minD, 1));
    const hi = Math.log(Math.max(maxD, lo + 1));
    const t = (Math.log(ly) - lo) / (hi - lo || 1);
    return Z_RANGE * (0.5 - t);
  };
  const points3D = sign.stars.map((s, i) => ({
    x: s.x / 100 * BOX,
    y: s.y / 100 * BOX,
    z: depth(parsedDist[i]),
    sizeScale: 0.6 + (depth(parsedDist[i]) + Z_RANGE / 2) / Z_RANGE * 0.9
    // farther = smaller
  }));
  return /* @__PURE__ */ jsxs("main", { className: "relative min-h-screen px-4 pb-24 pt-24 md:px-10", children: [
    /* @__PURE__ */ jsx(Link, { to: "/zodiac", "aria-label": "Close", className: "fixed right-6 top-6 z-30 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground md:right-20", children: "✕" }),
    /* @__PURE__ */ jsxs("header", { className: "animate-fade-up text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-display text-2xl font-extralight tracking-wide-x md:text-3xl", children: [
        /* @__PURE__ */ jsx("span", { className: "font-zh", children: sign.zh }),
        /* @__PURE__ */ jsx("span", { className: "mx-4 text-muted-foreground", children: "·" }),
        sign.en
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs tracking-wide-x", children: tonight ? /* @__PURE__ */ jsx("span", { className: "text-accent", children: "● Visible tonight · 今晚可见" }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/70", children: "○ Not in tonight's sky · 今晚不可见" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-6 flex max-w-3xl cursor-grab touch-none justify-center active:cursor-grabbing", style: {
      perspective: "1100px",
      perspectiveOrigin: "50% 50%"
    }, onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, children: /* @__PURE__ */ jsxs("div", { className: "relative", style: {
      width: BOX,
      height: BOX,
      maxWidth: "100%",
      transformStyle: "preserve-3d",
      transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg)`,
      transition: "transform 80ms linear"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full", style: {
        transform: "translateZ(0px)",
        background: "radial-gradient(circle at 50% 50%, rgba(237,240,244,0.04) 0%, transparent 60%)",
        border: "1px dashed rgba(237,240,244,0.06)"
      } }),
      sign.lines.map(([a, b], i) => {
        const p1 = points3D[a];
        const p2 = points3D[b];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dz = p2.z - p1.z;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const lenXZ = Math.sqrt(dx * dx + dz * dz);
        const yaw = Math.atan2(-dz, dx) * 180 / Math.PI;
        const pitch = Math.atan2(dy, lenXZ) * 180 / Math.PI;
        return /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 origin-left", style: {
          width: drawn ? len : 0,
          height: 1,
          background: "linear-gradient(90deg, rgba(237,240,244,0.45), rgba(237,240,244,0.18))",
          transform: `translate3d(${p1.x}px, ${p1.y}px, ${p1.z}px) rotateY(${yaw}deg) rotateZ(${pitch}deg)`,
          transformOrigin: "0 50%",
          transition: `width 0.7s ease ${0.25 + i * 0.12}s, opacity 0.6s ease`,
          opacity: drawn ? 1 : 0,
          boxShadow: "0 0 6px rgba(237,240,244,0.15)"
        } }, i);
      }),
      sign.stars.map((s, i) => {
        const p = points3D[i];
        const baseR = s.name ? 5 : 3;
        const r = baseR * p.sizeScale;
        return /* @__PURE__ */ jsxs("div", { className: "absolute left-0 top-0", style: {
          transform: `translate3d(${p.x - r}px, ${p.y - r}px, ${p.z}px)`,
          transformStyle: "preserve-3d"
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "animate-twinkle rounded-full bg-foreground", style: {
            width: r * 2,
            height: r * 2,
            boxShadow: `0 0 ${r * 3}px rgba(237,240,244,0.85), 0 0 ${r * 6}px rgba(237,240,244,0.35)`,
            animationDelay: `${i * 0.4}s`
          } }),
          s.name && /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute whitespace-nowrap font-mono-data text-[10px] leading-tight", style: {
            left: r * 2 + 6,
            top: -2,
            // Counter-rotate label so it always faces the viewer
            transform: `rotateX(${-rot.x}deg) rotateY(${-rot.y}deg)`,
            transformOrigin: "0 50%"
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "text-foreground/85", children: s.name }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground/80", children: s.dist })
          ] })
        ] }, i);
      })
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50", children: "Drag to rotate · stars positioned by real distance · 拖拽旋转，按真实距离立体分布" }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px border border-border bg-border/50 md:grid-cols-4", children: [{
      k: "Main star · 主星",
      v: sign.mainStar
    }, {
      k: "Distance · 距离",
      v: sign.distance
    }, {
      k: "Best season · 观测季",
      v: `${sign.season}`
    }, {
      k: "RA / Dec · 赤经赤纬",
      v: `${sign.ra} / ${sign.dec}`
    }].map((d) => /* @__PURE__ */ jsxs("div", { className: "bg-background/85 p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-wide-x text-muted-foreground", children: d.k }),
      /* @__PURE__ */ jsx("p", { className: "font-mono-data mt-2 text-xs text-foreground", children: d.v })
    ] }, d.k)) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto mt-14 max-w-2xl", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-center text-lg font-extralight uppercase tracking-cosmos text-foreground", children: [
        "Mythology ",
        /* @__PURE__ */ jsx("span", { className: "font-zh ml-3 text-sm normal-case tracking-[0.4em] text-muted-foreground", children: "神话" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-sm font-light leading-loose text-foreground/85", children: [
        sign.myth.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)),
        /* @__PURE__ */ jsx("p", { className: "font-zh text-xs leading-loose text-muted-foreground", children: sign.mythZh })
      ] })
    ] })
  ] });
}
export {
  SignPage as component
};
