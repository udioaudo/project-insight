import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { c as currentSignIndex, v as visibleTonight, Z as ZODIAC } from "./router-Drj2z4yF.js";
import "@tanstack/react-query";
function mod(n, m) {
  return (n % m + m) % m;
}
function ZodiacPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(() => currentSignIndex());
  const wheelLock = useRef(0);
  const dragStart = useRef(null);
  useEffect(() => {
    const onWheel = (e) => {
      const now = Date.now();
      if (now - wheelLock.current < 350) return;
      if (Math.abs(e.deltaY) < 12 && Math.abs(e.deltaX) < 12) return;
      wheelLock.current = now;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      setIndex((i) => mod(i + (delta > 0 ? 1 : -1), 12));
    };
    window.addEventListener("wheel", onWheel, {
      passive: true
    });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);
  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 40) setIndex((i) => mod(i + (dx < 0 ? 1 : -1), 12));
  };
  const sign = ZODIAC[index];
  const tonight = visibleTonight(sign);
  const monthSign = currentSignIndex();
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen touch-pan-y select-none flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-24", onPointerDown, onPointerUp, children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl", children: "Zodiac" }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground", children: "十二星座" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-10 flex h-64 w-full max-w-4xl items-end justify-center md:h-72", children: ZODIAC.map((s, i) => {
      let offset = mod(i - index, 12);
      if (offset > 6) offset -= 12;
      const visible = Math.abs(offset) <= 3;
      const x = offset * 120;
      const y = Math.abs(offset) * Math.abs(offset) * 14;
      const scale = offset === 0 ? 1 : Math.max(0.45, 1 - Math.abs(offset) * 0.22);
      const opacity = visible ? offset === 0 ? 1 : 0.85 - Math.abs(offset) * 0.22 : 0;
      return /* @__PURE__ */ jsxs("button", { "aria-label": `${s.en} ${s.zh}`, onClick: () => {
        if (offset === 0) {
          navigate({
            to: "/zodiac/$sign",
            params: {
              sign: s.id
            }
          });
        } else {
          setIndex(i);
        }
      }, className: "absolute bottom-16 flex flex-col items-center transition-all duration-500 ease-out", style: {
        transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
        opacity,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 10 - Math.abs(offset)
      }, children: [
        /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: `h-24 w-24 transition-all duration-500 md:h-28 md:w-28 ${offset === 0 ? "opacity-100 drop-shadow-[0_0_10px_rgba(237,240,244,0.45)]" : "opacity-70"}`, "aria-hidden": "true", children: [
          s.lines.map(([a, b], li) => /* @__PURE__ */ jsx("line", { x1: s.stars[a].x, y1: s.stars[a].y, x2: s.stars[b].x, y2: s.stars[b].y, stroke: offset === 0 ? "rgba(237,240,244,0.5)" : "rgba(237,240,244,0.25)", strokeWidth: "0.7" }, li)),
          s.stars.map((st, si) => /* @__PURE__ */ jsx("circle", { cx: st.x, cy: st.y, r: st.name ? 2 : 1.2, fill: offset === 0 ? "#EDF0F4" : "rgba(237,240,244,0.6)" }, si))
        ] }),
        i === monthSign && /* @__PURE__ */ jsx("span", { className: "mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(74,144,184,0.9)]" })
      ] }, s.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-up mt-2 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-2xl font-extralight tracking-wide-x", children: [
        sign.en,
        /* @__PURE__ */ jsx("span", { className: "font-zh ml-4 text-lg text-muted-foreground", children: sign.zh })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono-data mt-2 text-xs text-muted-foreground", children: sign.dates }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs tracking-wide-x", children: tonight ? /* @__PURE__ */ jsx("span", { className: "text-accent", children: "● Visible tonight · 今晚可见" }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/70", children: "○ Not in tonight's sky · 今晚不可见" }) }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate({
        to: "/zodiac/$sign",
        params: {
          sign: sign.id
        }
      }), className: "mt-6 border border-border px-8 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary", children: "View constellation · 查看星座" })
    ] }, sign.id),
    /* @__PURE__ */ jsx("p", { className: "mt-10 text-[10px] uppercase tracking-wide-x text-muted-foreground/50", children: "Scroll, drag or click to rotate the ecliptic · 滚动或拖拽旋转黄道" })
  ] });
}
export {
  ZodiacPage as component
};
