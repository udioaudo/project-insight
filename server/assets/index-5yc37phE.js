import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
function Typewriter({
  text,
  speed = 65,
  delay = 600,
  className
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);
  return /* @__PURE__ */ jsxs("span", { className, children: [
    text.slice(0, count),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `inline-block w-[1px] translate-y-[2px] bg-foreground/70 ${count < text.length ? "animate-twinkle" : "opacity-0"}`,
        style: { height: "1em" }
      }
    )
  ] });
}
const MODULES = [{
  to: "/zodiac",
  en: "Zodiac",
  zh: "十二星座",
  blurb: "Twelve constellations — myth and astronomy, seen with both eyes."
}, {
  to: "/chronicle",
  en: "Chronicle",
  zh: "宇宙编年史",
  blurb: "13.8 billion years compressed into a single day you can scroll."
}, {
  to: "/galaxies",
  en: "Galaxies",
  zh: "星系图鉴",
  blurb: "Islands of a hundred billion suns, sorted by their shapes."
}, {
  to: "/nebulae",
  en: "Nebulae",
  zh: "星云图鉴",
  blurb: "Where stars are born, and where they return to dust."
}];
function Index() {
  return /* @__PURE__ */ jsxs("main", { className: "relative flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxs("section", { className: "flex min-h-screen flex-col items-center justify-center px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "animate-fade-up font-display text-glow text-center text-6xl font-thin uppercase tracking-cosmos sm:text-7xl md:text-8xl lg:text-9xl", children: "Cosmos" }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 h-6 text-center text-sm font-light tracking-wide-x text-muted-foreground md:text-base", children: /* @__PURE__ */ jsx(Typewriter, { text: "13.8 billion years, waiting for you." }) }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-center text-xs tracking-[0.5em] text-muted-foreground/70", children: "138亿年，等你来看" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wide-x", children: "Scroll" }),
        /* @__PURE__ */ jsx("span", { className: "animate-drift-down text-lg font-thin", children: "↓" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto w-full max-w-5xl px-6 pb-32", children: [
      /* @__PURE__ */ jsx("div", { className: "grid gap-px border border-border bg-border/50 sm:grid-cols-2", children: MODULES.map((m, i) => /* @__PURE__ */ jsxs(Link, { to: m.to, className: "group relative flex min-h-[180px] flex-col justify-between bg-background/85 p-8 transition-colors duration-500 hover:bg-secondary/60", style: {
        animationDelay: `${i * 0.1}s`
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-extralight uppercase tracking-wide-x text-foreground", children: m.en }),
          /* @__PURE__ */ jsx("span", { className: "font-zh text-xs tracking-[0.4em] text-muted-foreground", children: m.zh })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "max-h-0 overflow-hidden text-sm font-light leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100", children: m.blurb }),
          /* @__PURE__ */ jsx("span", { className: "mt-4 inline-block text-xs uppercase tracking-wide-x text-muted-foreground/60 transition-colors group-hover:text-foreground", children: "Enter →" })
        ] })
      ] }, m.to)) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-16 text-center text-[11px] tracking-wide-x text-muted-foreground/50", children: [
        "You are standing in the universe. The universe is watching you back.",
        /* @__PURE__ */ jsx("span", { className: "font-zh ml-3", children: "你站在宇宙中，宇宙也在注视你" })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
