import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
const andromeda = "/assets/galaxy-andromeda-HnfYQuho.jpg";
const whirlpool = "/assets/galaxy-whirlpool-B-p51MrQ.jpg";
const m87 = "/assets/galaxy-m87-BkW4j2j8.jpg";
const sombrero = "/assets/galaxy-sombrero-JhHn_K4Q.jpg";
const lmc = "/assets/galaxy-lmc-C21OO3Tj.jpg";
const m49 = "/assets/galaxy-m49-DgLSZRR4.jpg";
const cartwheel = "/assets/galaxy-cartwheel-B6rFJYWl.jpg";
const spindle = "/assets/galaxy-spindle-DIsK9-Lz.jpg";
const GALAXY_TYPES = [
  { id: "elliptical", en: "Elliptical", zh: "椭圆星系" },
  { id: "spiral", en: "Spiral", zh: "旋涡星系" },
  { id: "irregular", en: "Irregular", zh: "不规则星系" },
  { id: "lenticular", en: "Lenticular", zh: "透镜状星系" }
];
const MILKY_WAY_DIAMETER = 1e5;
const GALAXIES = [
  {
    id: "andromeda",
    name: "Andromeda · M31",
    nameZh: "仙女座星系",
    type: "spiral",
    image: andromeda,
    distance: "2.5 million ly",
    diameterLy: 22e4,
    diameterLabel: "220,000 ly",
    fact: "The most distant object visible to the naked eye — and it's heading toward us. In ~4.5 billion years it will merge with the Milky Way.",
    factZh: "肉眼可见的最遥远天体，正以每秒110公里向银河系靠近。"
  },
  {
    id: "whirlpool",
    name: "Whirlpool · M51",
    nameZh: "涡状星系",
    type: "spiral",
    image: whirlpool,
    distance: "23 million ly",
    diameterLy: 6e4,
    diameterLabel: "60,000 ly",
    fact: "Its perfect spiral arms are sculpted by a gravitational dance with the small companion galaxy tugging at its edge.",
    factZh: "完美的旋臂由旁边小星系的引力之舞雕刻而成。"
  },
  {
    id: "m87",
    name: "Messier 87",
    nameZh: "室女A星系",
    type: "elliptical",
    image: m87,
    distance: "53 million ly",
    diameterLy: 24e4,
    diameterLabel: "240,000 ly",
    fact: "Home of the first black hole ever photographed — a monster of 6.5 billion solar masses firing a jet of plasma 5,000 light-years long.",
    factZh: "人类拍到的第一个黑洞就在这里，质量是太阳的65亿倍。"
  },
  {
    id: "m49",
    name: "Messier 49",
    nameZh: "M49 椭圆星系",
    type: "elliptical",
    image: m49,
    distance: "56 million ly",
    diameterLy: 157e3,
    diameterLabel: "157,000 ly",
    fact: "The brightest galaxy in the Virgo Cluster. Almost no new stars form here — it glows with the amber light of ancient suns.",
    factZh: "室女座星系团中最亮的星系，几乎不再诞生新恒星。"
  },
  {
    id: "lmc",
    name: "Large Magellanic Cloud",
    nameZh: "大麦哲伦云",
    type: "irregular",
    image: lmc,
    distance: "160,000 ly",
    diameterLy: 14e3,
    diameterLabel: "14,000 ly",
    fact: "A satellite galaxy of the Milky Way, visible from the southern hemisphere. It hosts the Tarantula Nebula — the most violent star factory nearby.",
    factZh: "银河系的卫星星系，南半球肉眼可见。"
  },
  {
    id: "cartwheel",
    name: "Cartwheel Galaxy",
    nameZh: "车轮星系",
    type: "irregular",
    image: cartwheel,
    distance: "500 million ly",
    diameterLy: 144e3,
    diameterLabel: "144,000 ly",
    fact: "Its ring is a shockwave — a smaller galaxy punched straight through its center 200 million years ago, triggering a ripple of star birth.",
    factZh: "两亿年前一个小星系从中心穿过，激起一圈恒星诞生的涟漪。"
  },
  {
    id: "sombrero",
    name: "Sombrero · M104",
    nameZh: "草帽星系",
    type: "lenticular",
    image: sombrero,
    distance: "29 million ly",
    diameterLy: 5e4,
    diameterLabel: "50,000 ly",
    fact: "Halfway between spiral and elliptical, with a brilliant bulge and a dramatic dust lane — and some 2,000 globular clusters swarming around it.",
    factZh: "介于旋涡与椭圆之间，明亮核球外缠绕着一条壮观尘埃带。"
  },
  {
    id: "spindle",
    name: "Spindle · NGC 5866",
    nameZh: "纺锤星系",
    type: "lenticular",
    image: spindle,
    distance: "50 million ly",
    diameterLy: 6e4,
    diameterLabel: "60,000 ly",
    fact: "Seen perfectly edge-on, its razor-thin dust lane slices the lens of stars in two — a galaxy viewed like a coin on its side.",
    factZh: "完美的侧视角度，纤细尘埃带将星盘一分为二。"
  }
];
function GalaxiesPage() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const list = useMemo(() => filter === "all" ? GALAXIES : GALAXIES.filter((g) => g.type === filter), [filter]);
  const randomJump = () => {
    const g = GALAXIES[Math.floor(Math.random() * GALAXIES.length)];
    setOpen(g);
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen px-4 pb-28 pt-28 md:px-12 md:pt-32", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl", children: "Galaxies" }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground", children: "星系图鉴" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setFilter("all"), className: `border px-4 py-1.5 text-[11px] uppercase tracking-wide-x transition-colors ${filter === "all" ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: "All · 全部" }),
      GALAXY_TYPES.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => setFilter(t.id), className: `border px-4 py-1.5 text-[11px] uppercase tracking-wide-x transition-colors ${filter === t.id ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: [
        t.en,
        " · ",
        /* @__PURE__ */ jsx("span", { className: "font-zh normal-case", children: t.zh })
      ] }, t.id)),
      /* @__PURE__ */ jsx("button", { onClick: randomJump, className: "border border-accent/60 px-4 py-1.5 text-[11px] uppercase tracking-wide-x text-accent transition-colors hover:bg-accent/10", children: "✦ Take me anywhere · 带我去任何地方" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3", children: list.map((g) => /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(g), className: "group border border-border bg-background/80 text-left transition-colors duration-300 hover:border-foreground/40", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: g.image, alt: `${g.name} galaxy`, width: 800, height: 608, loading: "lazy", className: "aspect-[4/3] w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-light tracking-wide-x", children: g.name }),
          /* @__PURE__ */ jsx("span", { className: "font-zh text-[11px] text-muted-foreground", children: g.nameZh })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-mono-data mt-2 text-[10px] text-muted-foreground", children: [
          g.distance,
          " · ⌀ ",
          g.diameterLabel
        ] })
      ] })
    ] }, g.id)) }),
    open && /* @__PURE__ */ jsx(GalaxyDetail, { galaxy: open, onClose: () => setOpen(null) })
  ] });
}
function GalaxyDetail({
  galaxy,
  onClose
}) {
  const [zoom, setZoom] = useState(50);
  const ratio = galaxy.diameterLy / MILKY_WAY_DIAMETER;
  const scale = 0.4 + zoom / 100 * 1.2;
  const mwSize = 90 * scale;
  const gSize = Math.min(240, Math.max(8, 90 * ratio * scale));
  const typeInfo = GALAXY_TYPES.find((t) => t.id === galaxy.type);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[60] overflow-y-auto bg-background/95 backdrop-blur-sm", role: "dialog", "aria-modal": "true", "aria-label": galaxy.name, children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": "Close", className: "fixed right-6 top-6 z-10 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground md:right-10", children: "✕" }),
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-up mx-auto max-w-3xl px-6 py-20", children: [
      /* @__PURE__ */ jsx("img", { src: galaxy.image, alt: `${galaxy.name} galaxy, Hubble-style view`, width: 800, height: 608, className: "w-full border border-border object-cover" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-display mt-8 text-2xl font-extralight tracking-wide-x", children: [
        galaxy.name,
        /* @__PURE__ */ jsx("span", { className: "font-zh ml-4 text-lg text-muted-foreground", children: galaxy.nameZh })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-3 gap-px border border-border bg-border/50", children: [{
        k: "Type · 类型",
        v: `${typeInfo?.en} ${typeInfo?.zh}`
      }, {
        k: "Distance · 距离",
        v: galaxy.distance
      }, {
        k: "Diameter · 直径",
        v: galaxy.diameterLabel
      }].map((d) => /* @__PURE__ */ jsxs("div", { className: "bg-background p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-wide-x text-muted-foreground", children: d.k }),
        /* @__PURE__ */ jsx("p", { className: "font-mono-data mt-2 text-xs", children: d.v })
      ] }, d.k)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm font-light leading-loose text-foreground/85", children: galaxy.fact }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-xs leading-loose text-muted-foreground", children: galaxy.factZh }),
      /* @__PURE__ */ jsxs("section", { className: "mt-12 border border-border p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-center text-xs uppercase tracking-wide-x text-muted-foreground", children: "Size vs the Milky Way · 与银河系对比" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-12", children: [
          /* @__PURE__ */ jsxs("figure", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-accent/70 bg-accent/10 transition-all duration-300", style: {
              width: gSize,
              height: gSize
            } }),
            /* @__PURE__ */ jsx("figcaption", { className: "font-mono-data text-[10px] text-muted-foreground", children: galaxy.name.split("·")[0] })
          ] }),
          /* @__PURE__ */ jsxs("figure", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-foreground/60 bg-foreground/10 transition-all duration-300", style: {
              width: mwSize,
              height: mwSize
            } }),
            /* @__PURE__ */ jsx("figcaption", { className: "font-mono-data text-[10px] text-muted-foreground", children: "Milky Way 银河系" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: 0, max: 100, value: zoom, onChange: (e) => setZoom(Number(e.target.value)), "aria-label": "Zoom comparison", className: "mt-8 w-full accent-foreground" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-[10px] tracking-wide-x text-muted-foreground/60", children: [
          "Drag to zoom · ",
          ratio >= 1 ? `${ratio.toFixed(1)}× the Milky Way` : `${(ratio * 100).toFixed(0)}% of the Milky Way`
        ] })
      ] })
    ] })
  ] });
}
export {
  GalaxiesPage as component
};
