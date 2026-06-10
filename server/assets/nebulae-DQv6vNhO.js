import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
const orion = "/assets/nebula-orion-C-u6E5i6.jpg";
const pillars = "/assets/nebula-pillars-D8aOfMRQ.jpg";
const horsehead = "/assets/nebula-horsehead-DwE2QeXZ.jpg";
const witchhead = "/assets/nebula-witchhead-C0Mnsas8.jpg";
const ring = "/assets/nebula-ring-BeGAITrq.jpg";
const helix = "/assets/nebula-helix-CJgwke-w.jpg";
const crab = "/assets/nebula-crab-l9Fdq4ND.jpg";
const veil = "/assets/nebula-veil-pR73tM2v.jpg";
const NEBULA_TYPES = [
  { id: "emission", en: "Emission", zh: "发射星云" },
  { id: "reflection", en: "Reflection", zh: "反射星云" },
  { id: "dark", en: "Dark", zh: "暗星云" },
  { id: "planetary", en: "Planetary", zh: "行星状星云" },
  { id: "supernova", en: "Supernova Remnant", zh: "超新星遗迹" }
];
const COLOR_CODE = [
  { color: "#C1440E", el: "Hydrogen", elZh: "氢", note: "red — ionized H-alpha" },
  { color: "#4DA167", el: "Oxygen", elZh: "氧", note: "green — doubly ionized O III" },
  { color: "#4A90B8", el: "Dust / O III", elZh: "尘埃", note: "blue — reflected starlight" },
  { color: "#C9A84C", el: "Sulfur", elZh: "硫", note: "amber — ionized S II" }
];
const NEBULAE = [
  {
    id: "orion",
    name: "Orion Nebula · M42",
    nameZh: "猎户座大星云",
    type: "emission",
    image: orion,
    w: 768,
    h: 960,
    distance: "1,344 ly",
    story: "This is a stellar nursery in full labor. Inside these glowing clouds, gravity is collapsing gas into hundreds of newborn stars; their fierce ultraviolet light makes the surrounding hydrogen blaze red. In a few million years, the winds of these young stars will blow the nebula apart.",
    storyZh: "这是一座正在分娩的恒星育婴室，数百颗新生恒星的紫外线让氢云燃烧成红色。"
  },
  {
    id: "pillars",
    name: "Pillars of Creation",
    nameZh: "创生之柱",
    type: "emission",
    image: pillars,
    w: 768,
    h: 1152,
    distance: "6,500 ly",
    story: "Towers of cold gas five light-years tall, being eroded from outside by the radiation of nearby giant stars. Inside their fingertips, new stars are condensing — birth and destruction in the same image.",
    storyZh: "五光年高的冷气体之柱，外部被侵蚀，指尖内却有新恒星正在凝结。"
  },
  {
    id: "horsehead",
    name: "Horsehead Nebula",
    nameZh: "马头星云",
    type: "dark",
    image: horsehead,
    w: 960,
    h: 768,
    distance: "1,375 ly",
    story: "A cloud so dense and cold that it swallows the light behind it. The horse's silhouette is dust that will, over millions of years, be eroded away by radiation — or collapse into stars of its own.",
    storyZh: "稠密寒冷的尘埃云吞噬了身后的光，剪影如马首昂立。"
  },
  {
    id: "witchhead",
    name: "Witch Head Nebula",
    nameZh: "女巫头星云",
    type: "reflection",
    image: witchhead,
    w: 768,
    h: 896,
    distance: "900 ly",
    story: "This nebula makes no light of its own. Its fine dust grains scatter the blue light of the brilliant star Rigel — the same physics that makes Earth's sky blue, painted across nine light-years.",
    storyZh: "它自己不发光，只是把参宿七的蓝光散射开来——和地球天空变蓝是同一种物理。"
  },
  {
    id: "ring",
    name: "Ring Nebula · M57",
    nameZh: "环状星云",
    type: "planetary",
    image: ring,
    w: 768,
    h: 768,
    distance: "2,283 ly",
    story: "A sun-like star is dying gently here. Having exhausted its fuel, it has shrugged off its outer layers into a glowing ring; the tiny white dot at the center is the exposed core — a white dwarf that will cool for eternity. Our Sun will do this in about 5 billion years.",
    storyZh: "一颗类太阳恒星正温柔地死去，中心白点是它裸露的核心。50亿年后，太阳也会如此。"
  },
  {
    id: "helix",
    name: "Helix Nebula",
    nameZh: "螺旋星云",
    type: "planetary",
    image: helix,
    w: 960,
    h: 832,
    distance: "655 ly",
    story: "The closest planetary nebula to Earth — sometimes called the Eye of God. The shells of gas span 2.5 light-years; the central white dwarf is destined to fade into a cold, dark cinder.",
    storyZh: "离地球最近的行星状星云，被称为「上帝之眼」。"
  },
  {
    id: "crab",
    name: "Crab Nebula · M1",
    nameZh: "蟹状星云",
    type: "supernova",
    image: crab,
    w: 768,
    h: 1024,
    distance: "6,500 ly",
    story: "In the year 1054, Chinese astronomers recorded a 'guest star' bright enough to see in daylight. This is its corpse: a shredded star expanding at 1,500 km/s, with a pulsar at its heart spinning 30 times per second.",
    storyZh: "公元1054年，中国天文学家记录了一颗白昼可见的「客星」——这就是它的遗骸。"
  },
  {
    id: "veil",
    name: "Veil Nebula",
    nameZh: "面纱星云",
    type: "supernova",
    image: veil,
    w: 960,
    h: 704,
    distance: "2,400 ly",
    story: "Ten thousand years ago a star twenty times the Sun's mass tore itself apart. These delicate ribbons are the shockwave still racing through interstellar gas — heavy elements scattering, one day to seed new worlds.",
    storyZh: "一万年前一颗大质量恒星粉碎了自己，这些丝带正把重元素撒向未来的世界。"
  }
];
function NebulaePage() {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen px-4 pb-28 pt-28 md:px-12 md:pt-32", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-extralight uppercase tracking-cosmos md:text-4xl", children: "Nebulae" }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-xs tracking-[0.5em] text-muted-foreground", children: "星云图鉴" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-wide-x text-muted-foreground", children: [
      ["Nebula 星云", "Star 恒星", "Supernova 超新星"].map((s, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-zh tracking-wide-x", children: s }),
        /* @__PURE__ */ jsx("span", { className: "animate-twinkle text-accent", style: {
          animationDelay: `${i * 0.7}s`
        }, children: "→" })
      ] }, s)),
      /* @__PURE__ */ jsx("span", { className: "font-zh", children: "Nebula 星云 ⟲" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-4", children: [
      COLOR_CODE.map((c) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full", style: {
          background: c.color
        } }),
        c.el,
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-zh", children: c.elZh })
      ] }, c.el)),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-wide-x text-muted-foreground/60", children: "— the Hubble color code · 哈勃色彩密码" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-10 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3", children: NEBULAE.map((n) => {
      const type = NEBULA_TYPES.find((t) => t.id === n.type);
      return /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(n), className: "group relative mb-5 block w-full break-inside-avoid overflow-hidden border border-border text-left", children: [
        /* @__PURE__ */ jsx("img", { src: n.image, alt: `${n.name} nebula`, width: n.w, height: n.h, loading: "lazy", className: "w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-sm font-light tracking-wide-x", children: [
            n.name,
            /* @__PURE__ */ jsx("span", { className: "font-zh ml-3 text-xs text-muted-foreground", children: n.nameZh })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-mono-data mt-1 text-[10px] text-muted-foreground", children: [
            type?.en,
            " ",
            type?.zh,
            " · ",
            n.distance
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex gap-3", children: COLOR_CODE.slice(0, 3).map((c) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[9px] text-muted-foreground/80", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
              background: c.color
            } }),
            c.el
          ] }, c.el)) })
        ] })
      ] }, n.id);
    }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-[10px] uppercase tracking-wide-x text-muted-foreground/50", children: "Click an image for immersive mode · 点击图片进入沉浸模式" }),
    open && /* @__PURE__ */ jsx(NebulaImmersive, { nebula: open, onClose: () => setOpen(null) })
  ] });
}
function NebulaImmersive({
  nebula,
  onClose
}) {
  const type = NEBULA_TYPES.find((t) => t.id === nebula.type);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-y-auto bg-[#000] p-6", role: "dialog", "aria-modal": "true", "aria-label": nebula.name, onClick: onClose, children: [
    /* @__PURE__ */ jsx("button", { "aria-label": "Close", className: "fixed right-6 top-6 text-xl font-thin text-muted-foreground transition-colors hover:text-foreground", children: "✕" }),
    /* @__PURE__ */ jsx("img", { src: nebula.image, alt: `${nebula.name} full view`, width: nebula.w, height: nebula.h, className: "animate-fade-up max-h-[70vh] w-auto max-w-full object-contain", onClick: (e) => e.stopPropagation() }),
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-up mt-6 max-w-xl text-center", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-base font-light tracking-wide-x", children: [
        nebula.name,
        /* @__PURE__ */ jsx("span", { className: "font-zh ml-3 text-sm text-muted-foreground", children: nebula.nameZh })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "font-mono-data mt-1 text-[10px] text-muted-foreground", children: [
        type?.en,
        " ",
        type?.zh,
        " · ",
        nebula.distance
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 text-[10px] uppercase tracking-wide-x text-accent", children: "What's happening here · 这里正在发生什么" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-light leading-loose text-foreground/85", children: nebula.story }),
      /* @__PURE__ */ jsx("p", { className: "font-zh mt-2 text-[11px] leading-loose text-muted-foreground", children: nebula.storyZh })
    ] })
  ] });
}
export {
  NebulaePage as component
};
