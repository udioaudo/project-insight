import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { R as Route, Z as ZODIAC, v as visibleTonight } from "./router-DtyZ5NgJ.js";
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
  const lineLength = 60;
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
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 max-w-3xl cursor-grab touch-none active:cursor-grabbing", style: {
      perspective: "900px"
    }, onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "mx-auto aspect-square w-full max-w-[520px] transition-transform duration-100", style: {
        transform: `rotateY(${rot.y}deg) rotateX(${rot.x}deg)`,
        transformStyle: "preserve-3d"
      }, children: [
        sign.lines.map(([a, b], i) => {
          const s1 = sign.stars[a];
          const s2 = sign.stars[b];
          return /* @__PURE__ */ jsx("line", { x1: s1.x, y1: s1.y, x2: s2.x, y2: s2.y, stroke: "rgba(237,240,244,0.35)", strokeWidth: "0.25", strokeDasharray: lineLength, strokeDashoffset: drawn ? 0 : lineLength, style: {
            transition: `stroke-dashoffset 0.7s ease ${0.25 + i * 0.18}s`
          } }, i);
        }),
        sign.stars.map((s, i) => /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx("circle", { cx: s.x, cy: s.y, r: s.name ? 0.9 : 0.55, fill: "#EDF0F4", className: "animate-twinkle", style: {
            animationDelay: `${i * 0.4}s`
          } }),
          s.name && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("text", { x: s.x + 1.8, y: s.y - 1, fill: "rgba(237,240,244,0.85)", fontSize: "2.2", fontFamily: "JetBrains Mono, monospace", children: s.name }),
            /* @__PURE__ */ jsx("text", { x: s.x + 1.8, y: s.y + 2, fill: "rgba(107,114,128,0.9)", fontSize: "1.6", fontFamily: "JetBrains Mono, monospace", children: s.dist })
          ] })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50", children: "Drag to rotate · 拖拽旋转观测" })
    ] }),
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
