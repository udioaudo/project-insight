import { jsxs, jsx } from "react/jsx-runtime";
function AboutPage() {
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen flex-col items-center px-6 pb-28 pt-32", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-extralight uppercase tracking-cosmos", children: "About" }),
    /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground", children: "关于" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 max-w-xl space-y-6 text-sm font-light leading-loose text-foreground/85", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "COSMOS is an immersive guide to the universe — built on a simple idea:",
        " ",
        /* @__PURE__ */ jsx("em", { className: "text-foreground", children: "you are standing in the universe, and the universe is watching you back." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-zh text-xs leading-loose text-muted-foreground", children: "COSMOS 是一个沉浸式宇宙科普网站。我们不神秘化星座，星图与现实一致；内容准确、有据可查。" }),
      /* @__PURE__ */ jsx("p", { children: "We treat constellations as astronomy, not mysticism — every star chart follows real positions, every distance is measured in light-years, and every story is labeled as the myth it is." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-14 w-full max-w-xl border border-border p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs uppercase tracking-wide-x text-muted-foreground", children: "Data & imagery sources · 数据来源" }),
      /* @__PURE__ */ jsxs("ul", { className: "font-mono-data mt-4 space-y-2 text-xs text-foreground/80", children: [
        /* @__PURE__ */ jsx("li", { children: "· NASA Image and Video Library — public domain imagery" }),
        /* @__PURE__ */ jsx("li", { children: "· ESA / Hubble — public release archive" }),
        /* @__PURE__ */ jsx("li", { children: "· SIMBAD Astronomical Database — star distances & coordinates" }),
        /* @__PURE__ */ jsx("li", { children: "· NASA Exoplanet Archive — stellar data" }),
        /* @__PURE__ */ jsx("li", { children: "· Mythology texts — original writing, Greek & Babylonian sources noted" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-14 text-[10px] uppercase tracking-wide-x text-muted-foreground/50", children: [
      "Psst — try the Konami code anywhere. ",
      /* @__PURE__ */ jsx("span", { className: "font-zh", children: "↑↑↓↓←→←→BA" })
    ] })
  ] });
}
export {
  AboutPage as component
};
