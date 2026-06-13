import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
const appCss = "/assets/styles-B-pn7iPD.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function Starfield({ density = 1 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let stars = [];
    let meteor = null;
    let nextMeteorAt = performance.now() + 8e3 + Math.random() * 2e4;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = w < 768;
      const count = Math.floor((isMobile ? 110 : 240) * density);
      stars = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer === 0 ? 0.5 + Math.random() * 0.5 : layer === 1 ? 0.8 + Math.random() * 0.8 : 1.2 + Math.random() * 1.3,
          layer,
          baseAlpha: layer === 0 ? 0.25 + Math.random() * 0.3 : layer === 1 ? 0.4 + Math.random() * 0.35 : 0.6 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2
        };
      });
    };
    const onMouse = (e) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };
    const draw = (t) => {
      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const depth = [4, 10, 22][s.layer];
        const ox = (smooth.x - 0.5) * depth;
        const oy = (smooth.y - 0.5) * depth;
        const tw = reduced ? 1 : 0.7 + 0.3 * Math.sin(t / 1400 + s.phase);
        ctx.globalAlpha = s.baseAlpha * tw;
        ctx.fillStyle = "#EDF0F4";
        ctx.beginPath();
        ctx.arc(s.x - ox, s.y - oy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) {
        if (!meteor && t > nextMeteorAt) {
          const fromLeft = Math.random() < 0.5;
          meteor = {
            x: fromLeft ? -50 : w * (0.5 + Math.random() * 0.5),
            y: Math.random() * h * 0.35,
            vx: 7 + Math.random() * 5,
            vy: 3 + Math.random() * 2,
            life: 1
          };
          nextMeteorAt = t + 3e4 + Math.random() * 3e4;
        }
        if (meteor) {
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.012;
          if (meteor.life <= 0 || meteor.x > w + 100 || meteor.y > h + 100) {
            meteor = null;
          } else {
            const m = meteor;
            const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
            grad.addColorStop(0, `rgba(237,240,244,${0.85 * m.life})`);
            grad.addColorStop(1, "rgba(237,240,244,0)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      className: "pointer-events-none fixed inset-0 z-0"
    }
  );
}
const SECTIONS = [
  { to: "/", en: "Home", zh: "宇宙" },
  { to: "/zodiac", en: "Zodiac", zh: "星座" },
  { to: "/chronicle", en: "Chronicle", zh: "时间" },
  { to: "/galaxies", en: "Galaxies", zh: "星系" },
  { to: "/nebulae", en: "Nebulae", zh: "星云" },
  { to: "/about", en: "About", zh: "关于" }
];
function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Site sections",
      className: "fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex",
      children: SECTIONS.map((s) => {
        const active = s.to === "/" ? pathname === "/" : pathname.startsWith(s.to);
        return /* @__PURE__ */ jsxs(Link, { to: s.to, className: "group flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: `whitespace-nowrap text-[11px] tracking-wide-x transition-all duration-300 ${active ? "text-foreground opacity-100" : "translate-x-2 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "font-zh", children: s.zh }),
                /* @__PURE__ */ jsx("span", { className: "ml-2 uppercase", children: s.en })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `block rounded-full transition-all duration-300 ${active ? "h-2 w-2 bg-foreground shadow-[0_0_8px_rgba(237,240,244,0.8)]" : "h-1.5 w-1.5 bg-muted-foreground/50 group-hover:bg-foreground/80"}`
            }
          )
        ] }, s.to);
      })
    }
  );
}
function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx("nav", { className: "fixed inset-x-0 top-0 z-40 flex justify-center gap-4 bg-background/70 px-3 py-3 backdrop-blur-sm md:hidden", children: SECTIONS.map((s) => {
    const active = s.to === "/" ? pathname === "/" : pathname.startsWith(s.to);
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: s.to,
        className: `text-[10px] uppercase tracking-wide-x transition-colors ${active ? "text-foreground" : "text-muted-foreground"}`,
        children: s.en
      },
      s.to
    );
  }) });
}
function GridTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [flashKey, setFlashKey] = useState(0);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setFlashKey((k) => k + 1);
  }, [pathname]);
  if (flashKey === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "animate-grid-flash pointer-events-none fixed inset-0 z-50", children: /* @__PURE__ */ jsxs("svg", { className: "h-full w-full opacity-60", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: "ra-dec", width: "120", height: "120", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx("path", { d: "M 120 0 L 0 0 0 120", fill: "none", stroke: "rgba(237,240,244,0.25)", strokeWidth: "0.5" }) }) }),
    /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#ra-dec)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "50%", cy: "50%", rx: "46%", ry: "30%", fill: "none", stroke: "rgba(237,240,244,0.2)", strokeWidth: "0.5" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "50%", cy: "50%", rx: "30%", ry: "46%", fill: "none", stroke: "rgba(237,240,244,0.2)", strokeWidth: "0.5" }),
    /* @__PURE__ */ jsx("line", { x1: "50%", y1: "0", x2: "50%", y2: "100%", stroke: "rgba(237,240,244,0.3)", strokeWidth: "0.5" }),
    /* @__PURE__ */ jsx("line", { x1: "0", y1: "50%", x2: "100%", y2: "50%", stroke: "rgba(237,240,244,0.3)", strokeWidth: "0.5" })
  ] }) }, flashKey);
}
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];
function BigBang() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setActive(true);
          setTimeout(() => setActive(false), 3e3);
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!active) return null;
  const particles = Array.from({ length: 80 }, (_, i) => {
    const angle = i / 80 * Math.PI * 2 + Math.random() * 0.3;
    const dist = 30 + Math.random() * 60;
    return {
      id: i,
      bx: `${Math.cos(angle) * dist}vmax`,
      by: `${Math.sin(angle) * dist}vmax`,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 0.25
    };
  });
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/80", children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: particles.map((p) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "animate-bang absolute rounded-full bg-foreground",
        style: {
          width: p.size,
          height: p.size,
          left: 0,
          top: 0,
          animationDelay: `${p.delay}s`,
          "--bx": p.bx,
          "--by": p.by
        }
      },
      p.id
    )) }),
    /* @__PURE__ */ jsxs("p", { className: "animate-fade-up absolute bottom-[18%] text-center text-sm tracking-wide-x text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { className: "font-zh", children: "138亿年前，也许就是这样" }),
      /* @__PURE__ */ jsx("span", { className: "mt-2 block text-xs uppercase", children: "13.8 billion years ago, perhaps it began like this" })
    ] })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl font-light tracking-cosmos text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm tracking-wide-x text-muted-foreground", children: "Lost in space — this page doesn't exist." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center border border-border px-6 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary",
        children: "Return to Earth"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-light tracking-wide-x text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center border border-border px-5 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center border border-border px-5 py-2 text-xs uppercase tracking-wide-x text-muted-foreground transition-colors hover:bg-secondary",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "COSMOS — An Immersive Journey Through the Universe" },
      {
        name: "description",
        content: "13.8 billion years, waiting for you. Explore the zodiac, cosmic history, galaxies and nebulae."
      },
      { name: "author", content: "COSMOS" },
      { property: "og:title", content: "COSMOS — An Immersive Journey Through the Universe" },
      { property: "og:description", content: "Project Insight is a web application that replicates website functionality and design based on provided specifications and demo images." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "COSMOS — An Immersive Journey Through the Universe" },
      { name: "description", content: "Project Insight is a web application that replicates website functionality and design based on provided specifications and demo images." },
      { name: "twitter:description", content: "Project Insight is a web application that replicates website functionality and design based on provided specifications and demo images." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/92e7ba1b-a0ae-42b3-8d65-fc5381a8f3e6/id-preview-3cfd88ba--01639990-bd44-45f1-8309-3e3f78c5795e.lovable.app-1781107881419.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/92e7ba1b-a0ae-42b3-8d65-fc5381a8f3e6/id-preview-3cfd88ba--01639990-bd44-45f1-8309-3e3f78c5795e.lovable.app-1781107881419.png" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;500&family=JetBrains+Mono:wght@300;400&family=Noto+Serif+SC:wght@300;400;500&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Starfield, {}),
    /* @__PURE__ */ jsx(SideNav, {}),
    /* @__PURE__ */ jsx(MobileNav, {}),
    /* @__PURE__ */ jsx(GridTransition, {}),
    /* @__PURE__ */ jsx(BigBang, {}),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const ZODIAC = [
  {
    id: "aries",
    en: "Aries",
    zh: "白羊座",
    symbol: "♈",
    dates: "Mar 21 – Apr 19",
    mainStar: "Hamal",
    distance: "65.8 ly",
    season: "Autumn / Winter",
    seasonZh: "秋冬",
    bestMonths: [10, 11, 12, 1],
    ra: "02h 38m",
    dec: "+20° 48′",
    stars: [
      { x: 70, y: 38, name: "Hamal", dist: "65.8 ly" },
      { x: 58, y: 48, name: "Sheratan", dist: "59.6 ly" },
      { x: 52, y: 56, name: "Mesarthim", dist: "164 ly" },
      { x: 30, y: 52, name: "41 Ari", dist: "166 ly" }
    ],
    lines: [[0, 1], [1, 2], [0, 3]],
    myth: [
      "The golden ram of Greek myth carried Phrixus across the sea to Colchis, saving him from sacrifice. In gratitude, the ram offered its own golden fleece — the very fleece Jason and the Argonauts would later pursue across the known world.",
      "Zeus placed the ram among the stars. Its dim stars belie its importance: for two thousand years Aries held the vernal equinox, the point where the Sun crosses into the northern sky and spring begins."
    ],
    mythZh: "金色公羊驮着佛里克索斯渡海逃生，献出金羊毛，宙斯将其升上星空。"
  },
  {
    id: "taurus",
    en: "Taurus",
    zh: "金牛座",
    symbol: "♉",
    dates: "Apr 20 – May 20",
    mainStar: "Aldebaran",
    distance: "65.3 ly",
    season: "Winter",
    seasonZh: "冬季",
    bestMonths: [11, 12, 1, 2],
    ra: "04h 36m",
    dec: "+16° 31′",
    stars: [
      { x: 48, y: 50, name: "Aldebaran", dist: "65.3 ly" },
      { x: 56, y: 44 },
      { x: 60, y: 56 },
      { x: 78, y: 30, name: "Elnath", dist: "134 ly" },
      { x: 80, y: 66, name: "Zeta Tau", dist: "440 ly" },
      { x: 36, y: 46 },
      { x: 30, y: 40, name: "Pleiades", dist: "444 ly" }
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [5, 6]],
    myth: [
      "Zeus took the form of a magnificent white bull to carry the princess Europa across the sea to Crete. The continent of Europe still bears her name; the bull still swims through the winter sky.",
      "The constellation holds two of the closest star clusters to Earth — the Hyades forming the bull's face, and the Pleiades, the Seven Sisters, riding on its shoulder."
    ],
    mythZh: "宙斯化身白色公牛，驮着欧罗巴公主渡海至克里特岛。"
  },
  {
    id: "gemini",
    en: "Gemini",
    zh: "双子座",
    symbol: "♊",
    dates: "May 21 – Jun 21",
    mainStar: "Pollux",
    distance: "33.8 ly",
    season: "Winter / Spring",
    seasonZh: "冬春",
    bestMonths: [12, 1, 2, 3],
    ra: "07h 04m",
    dec: "+22° 30′",
    stars: [
      { x: 30, y: 62, name: "Pollux", dist: "33.8 ly" },
      { x: 36, y: 70, name: "Castor", dist: "50.9 ly" },
      { x: 44, y: 48, name: "Wasat", dist: "60.5 ly" },
      { x: 56, y: 30, name: "Alzirr", dist: "58.7 ly" },
      { x: 62, y: 38, name: "Alhena", dist: "109.3 ly" },
      { x: 64, y: 46, name: "Mekbuda", dist: "1376 ly" },
      { x: 66, y: 54, name: "Mebsuta", dist: "845 ly" },
      { x: 48, y: 66 },
      { x: 38, y: 78, name: "Jishui", dist: "166.3 ly" }
    ],
    lines: [[0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1], [1, 8], [0, 1]],
    myth: [
      "Castor and Pollux were twin brothers — one mortal, one divine. When Castor fell in battle, Pollux begged Zeus to share his immortality, refusing eternity without his brother.",
      "Zeus granted them alternating days among the gods and in the underworld, then set them together in the sky — two bright stars side by side, never separated again. Sailors saw them as protectors, the calm lights after a storm."
    ],
    mythZh: "双子卡斯托与波吕克斯，一人不死一人凡身，宙斯让他们永不分离地并立星空。"
  },
  {
    id: "cancer",
    en: "Cancer",
    zh: "巨蟹座",
    symbol: "♋",
    dates: "Jun 22 – Jul 22",
    mainStar: "Tarf",
    distance: "290 ly",
    season: "Spring",
    seasonZh: "春季",
    bestMonths: [1, 2, 3, 4],
    ra: "08h 38m",
    dec: "+19° 48′",
    stars: [
      { x: 40, y: 70, name: "Tarf", dist: "290 ly" },
      { x: 50, y: 52, name: "Asellus Australis", dist: "131 ly" },
      { x: 52, y: 42, name: "Asellus Borealis", dist: "181 ly" },
      { x: 64, y: 34, name: "Iota Cnc", dist: "330 ly" },
      { x: 62, y: 58, name: "Acubens", dist: "164 ly" }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4]],
    myth: [
      "During Heracles' battle with the Hydra, Hera sent a crab to distract the hero. It was crushed underfoot — but Hera, honoring its loyalty, gave it a place in the heavens.",
      "Faint as it is, Cancer hides a treasure: the Beehive Cluster, a swarm of a thousand stars visible to the naked eye on dark nights, known to astronomers since antiquity."
    ],
    mythZh: "赫拉派巨蟹助九头蛇作战，虽被踩碎，仍被升上天空以表忠诚。"
  },
  {
    id: "leo",
    en: "Leo",
    zh: "狮子座",
    symbol: "♌",
    dates: "Jul 23 – Aug 22",
    mainStar: "Regulus",
    distance: "79.3 ly",
    season: "Spring",
    seasonZh: "春季",
    bestMonths: [2, 3, 4, 5],
    ra: "10h 39m",
    dec: "+13° 11′",
    stars: [
      { x: 62, y: 66, name: "Regulus", dist: "79.3 ly" },
      { x: 60, y: 52 },
      { x: 66, y: 42, name: "Algieba", dist: "130 ly" },
      { x: 60, y: 32 },
      { x: 50, y: 30, name: "Rasalas", dist: "124 ly" },
      { x: 44, y: 38 },
      { x: 36, y: 56, name: "Zosma", dist: "58.4 ly" },
      { x: 22, y: 60, name: "Denebola", dist: "35.9 ly" },
      { x: 40, y: 68, name: "Chertan", dist: "165 ly" }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [1, 6], [6, 7], [7, 8], [8, 0]],
    myth: [
      "The Nemean Lion had a hide no weapon could pierce. Heracles strangled it with his bare hands as the first of his twelve labors, and wore its pelt ever after.",
      "Zeus set the lion among the stars. Its heart is Regulus — 'the little king' — one of the four ancient Royal Stars that marked the seasons for Persian astronomers four thousand years ago."
    ],
    mythZh: "刀枪不入的涅墨亚狮子被赫拉克勒斯徒手降服，成为其十二伟业之首。"
  },
  {
    id: "virgo",
    en: "Virgo",
    zh: "处女座",
    symbol: "♍",
    dates: "Aug 23 – Sep 22",
    mainStar: "Spica",
    distance: "250 ly",
    season: "Spring / Summer",
    seasonZh: "春夏",
    bestMonths: [3, 4, 5, 6],
    ra: "13h 24m",
    dec: "−11° 10′",
    stars: [
      { x: 64, y: 74, name: "Spica", dist: "250 ly" },
      { x: 56, y: 58 },
      { x: 46, y: 50, name: "Porrima", dist: "38.1 ly" },
      { x: 34, y: 44, name: "Zaniah", dist: "265 ly" },
      { x: 24, y: 48, name: "Zavijava", dist: "35.7 ly" },
      { x: 50, y: 36, name: "Vindemiatrix", dist: "110 ly" },
      { x: 70, y: 52, name: "Heze", dist: "74 ly" }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [1, 6]],
    myth: [
      "Virgo is Demeter's daughter Persephone — or Astraea, goddess of justice, the last immortal to leave Earth when the Golden Age ended. She carries an ear of wheat: the star Spica.",
      "When Persephone descends to the underworld each year, Demeter mourns and the fields go barren. When Virgo returns to the evening sky, spring returns with her."
    ],
    mythZh: "正义女神阿斯特赖亚手持麦穗，是黄金时代最后离开人间的神。"
  },
  {
    id: "libra",
    en: "Libra",
    zh: "天秤座",
    symbol: "♎",
    dates: "Sep 23 – Oct 23",
    mainStar: "Zubeneschamali",
    distance: "185 ly",
    season: "Summer",
    seasonZh: "夏季",
    bestMonths: [4, 5, 6, 7],
    ra: "15h 11m",
    dec: "−15° 14′",
    stars: [
      { x: 50, y: 32, name: "Zubeneschamali", dist: "185 ly" },
      { x: 36, y: 50, name: "Zubenelgenubi", dist: "75.8 ly" },
      { x: 60, y: 54, name: "Brachium", dist: "288 ly" },
      { x: 52, y: 70, name: "Upsilon Lib", dist: "195 ly" }
    ],
    lines: [[0, 1], [0, 2], [1, 2], [2, 3]],
    myth: [
      "The only zodiac constellation that is an object, not a creature — the scales of justice held by Astraea, weighing the fates of mortals.",
      "Its two brightest stars still carry Arabic names meaning 'the northern claw' and 'the southern claw': to the Babylonians and early Greeks, these stars belonged to the great Scorpion next door."
    ],
    mythZh: "黄道十二宫唯一的器物——正义女神手中衡量命运的天平。"
  },
  {
    id: "scorpio",
    en: "Scorpius",
    zh: "天蝎座",
    symbol: "♏",
    dates: "Oct 24 – Nov 21",
    mainStar: "Antares",
    distance: "550 ly",
    season: "Summer",
    seasonZh: "夏季",
    bestMonths: [5, 6, 7, 8],
    ra: "16h 53m",
    dec: "−30° 44′",
    stars: [
      { x: 44, y: 38, name: "Antares", dist: "550 ly" },
      { x: 38, y: 28, name: "Acrab", dist: "400 ly" },
      { x: 32, y: 34, name: "Dschubba", dist: "400 ly" },
      { x: 50, y: 48 },
      { x: 52, y: 60 },
      { x: 48, y: 72 },
      { x: 56, y: 80 },
      { x: 68, y: 78, name: "Shaula", dist: "570 ly" },
      { x: 72, y: 70, name: "Lesath", dist: "580 ly" }
    ],
    lines: [[1, 2], [2, 0], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
    myth: [
      "The scorpion that killed Orion. Gaia sent it when the great hunter boasted he would slay every animal on Earth. Zeus placed both in the sky — on opposite sides, so Orion sets as Scorpius rises, fleeing forever.",
      "At its heart burns Antares, 'rival of Mars' — a red supergiant so vast that if placed where our Sun is, it would swallow the orbit of Mars itself."
    ],
    mythZh: "杀死猎户俄里翁的天蝎，与猎户座永远分居天空两端。"
  },
  {
    id: "sagittarius",
    en: "Sagittarius",
    zh: "射手座",
    symbol: "♐",
    dates: "Nov 22 – Dec 21",
    mainStar: "Kaus Australis",
    distance: "143 ly",
    season: "Summer / Autumn",
    seasonZh: "夏秋",
    bestMonths: [6, 7, 8, 9],
    ra: "19h 06m",
    dec: "−27° 32′",
    stars: [
      { x: 36, y: 56, name: "Kaus Australis", dist: "143 ly" },
      { x: 42, y: 44, name: "Kaus Media", dist: "348 ly" },
      { x: 46, y: 32, name: "Kaus Borealis", dist: "78.2 ly" },
      { x: 56, y: 40, name: "Phi Sgr", dist: "239 ly" },
      { x: 66, y: 38, name: "Nunki", dist: "228 ly" },
      { x: 72, y: 48, name: "Ascella", dist: "88 ly" },
      { x: 58, y: 54, name: "Tau Sgr", dist: "122 ly" },
      { x: 28, y: 44, name: "Alnasl", dist: "97 ly" }
    ],
    lines: [[0, 1], [1, 2], [1, 7], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    myth: [
      "The archer is Chiron — wisest of the centaurs, tutor of heroes. Unlike his wild kin, he chose knowledge over chaos, teaching medicine, music, and the names of stars.",
      "His arrow points at the heart of Scorpius — and beyond it, toward the very center of the Milky Way, where a supermassive black hole of four million suns lies hidden behind veils of stardust."
    ],
    mythZh: "智慧的半人马喀戎，箭头指向银河系的中心。"
  },
  {
    id: "capricorn",
    en: "Capricornus",
    zh: "摩羯座",
    symbol: "♑",
    dates: "Dec 22 – Jan 19",
    mainStar: "Deneb Algedi",
    distance: "38.7 ly",
    season: "Autumn",
    seasonZh: "秋季",
    bestMonths: [7, 8, 9, 10],
    ra: "21h 02m",
    dec: "−18° 02′",
    stars: [
      { x: 28, y: 44, name: "Algedi", dist: "106 ly" },
      { x: 32, y: 52, name: "Dabih", dist: "328 ly" },
      { x: 48, y: 66, name: "Omega Cap", dist: "1000 ly" },
      { x: 64, y: 60, name: "Nashira", dist: "157 ly" },
      { x: 72, y: 50, name: "Deneb Algedi", dist: "38.7 ly" },
      { x: 52, y: 46, name: "Theta Cap", dist: "162 ly" }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    myth: [
      "When the monster Typhon stormed Olympus, the god Pan leapt into the Nile mid-transformation — goat above the water, fish below. The sea-goat has swum the sky ever since.",
      "To the Babylonians this was the goat-fish of Ea, god of deep waters and wisdom, rising at the winter solstice when the Sun begins its long climb back toward spring."
    ],
    mythZh: "潘神跳入尼罗河，上半身为羊、下半身为鱼，化作海山羊。"
  },
  {
    id: "aquarius",
    en: "Aquarius",
    zh: "水瓶座",
    symbol: "♒",
    dates: "Jan 20 – Feb 18",
    mainStar: "Sadalsuud",
    distance: "540 ly",
    season: "Autumn",
    seasonZh: "秋季",
    bestMonths: [8, 9, 10, 11],
    ra: "22h 17m",
    dec: "−10° 47′",
    stars: [
      { x: 30, y: 40, name: "Sadalsuud", dist: "540 ly" },
      { x: 44, y: 36, name: "Sadalmelik", dist: "520 ly" },
      { x: 52, y: 42, name: "Sadachbia", dist: "164 ly" },
      { x: 58, y: 38 },
      { x: 62, y: 46 },
      { x: 56, y: 58, name: "Skat", dist: "113 ly" },
      { x: 48, y: 72 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6]],
    myth: [
      "Ganymede, the most beautiful of mortals, was carried to Olympus by Zeus's eagle to be cupbearer to the gods, pouring nectar from a golden vessel.",
      "The 'water' he pours is a stream of faint stars flowing toward the Southern Fish. This entire region of sky was the Babylonian 'Sea' — home of fish, whales, and rivers of stars."
    ],
    mythZh: "美少年伽倪墨得斯为众神斟酒，瓶中流出星星之水。"
  },
  {
    id: "pisces",
    en: "Pisces",
    zh: "双鱼座",
    symbol: "♓",
    dates: "Feb 19 – Mar 20",
    mainStar: "Eta Piscium",
    distance: "350 ly",
    season: "Autumn / Winter",
    seasonZh: "秋冬",
    bestMonths: [9, 10, 11, 12],
    ra: "00h 28m",
    dec: "+13° 41′",
    stars: [
      { x: 70, y: 70, name: "Alrescha", dist: "139 ly" },
      { x: 60, y: 58 },
      { x: 48, y: 50, name: "Eta Psc", dist: "350 ly" },
      { x: 38, y: 40 },
      { x: 30, y: 30 },
      { x: 76, y: 58 },
      { x: 82, y: 48, name: "Fum al Samakah", dist: "492 ly" }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6]],
    myth: [
      "Aphrodite and her son Eros, fleeing the monster Typhon, transformed into fish and dove into the Euphrates — tied together by a cord so they would never be parted.",
      "The knot of that cord is the star Alrescha. Today the vernal equinox lies in Pisces: every spring begins, invisibly, among these faint stars."
    ],
    mythZh: "爱神母子化作双鱼跳入河中，用丝带相连，永不分离。"
  }
];
function visibleTonight(sign, date = /* @__PURE__ */ new Date()) {
  return sign.bestMonths.includes(date.getMonth() + 1);
}
function currentSignIndex(date = /* @__PURE__ */ new Date()) {
  const m = date.getMonth();
  const d = date.getDate();
  const cutoff = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
  const signAtCutoff = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return d >= cutoff[m] ? signAtCutoff[m] : signAtCutoff[(m + 11) % 12];
}
const BASE_URL = "";
const Route$7 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/zodiac", changefreq: "monthly", priority: "0.9" },
          { path: "/chronicle", changefreq: "monthly", priority: "0.8" },
          { path: "/galaxies", changefreq: "monthly", priority: "0.8" },
          { path: "/nebulae", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "yearly", priority: "0.5" },
          ...ZODIAC.map((s) => ({ path: `/zodiac/${s.id}`, changefreq: "monthly", priority: "0.7" }))
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$6 = () => import("./nebulae-DQv6vNhO.js");
const Route$6 = createFileRoute("/nebulae")({
  head: () => ({
    meta: [{
      title: "Nebula Atlas — Where Stars Are Born | COSMOS"
    }, {
      name: "description",
      content: "Emission, reflection, dark, planetary nebulae and supernova remnants — with the Hubble color decoder."
    }, {
      property: "og:title",
      content: "Nebula Atlas — Where Stars Are Born | COSMOS"
    }, {
      property: "og:description",
      content: "The most beautiful objects in the sky, with the Hubble color decoder."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./galaxies-iW0xdlhs.js");
const Route$5 = createFileRoute("/galaxies")({
  head: () => ({
    meta: [{
      title: "Galaxy Atlas — Islands of Stars | COSMOS"
    }, {
      name: "description",
      content: "Elliptical, spiral, irregular and lenticular galaxies — Hubble-style imagery with real data and a Milky Way size comparator."
    }, {
      property: "og:title",
      content: "Galaxy Atlas — Islands of Stars | COSMOS"
    }, {
      property: "og:description",
      content: "Galaxy types explained with imagery, data and size comparisons."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./chronicle-bH1DFQua.js");
const Route$4 = createFileRoute("/chronicle")({
  head: () => ({
    meta: [{
      title: "Cosmic Chronicle — 13.8 Billion Years | COSMOS"
    }, {
      name: "description",
      content: "The history of the universe from the Big Bang to this very moment, mapped onto a single cosmic day."
    }, {
      property: "og:title",
      content: "Cosmic Chronicle — 13.8 Billion Years | COSMOS"
    }, {
      property: "og:description",
      content: "From the Big Bang to this very moment, mapped onto a single day."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-BBHq8ERC.js");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — COSMOS"
    }, {
      name: "description",
      content: "About COSMOS — an immersive astronomy site. Data sources, imagery credits and intent."
    }, {
      property: "og:title",
      content: "About — COSMOS"
    }, {
      property: "og:description",
      content: "About COSMOS — data sources and intent."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-5yc37phE.js");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "COSMOS — 13.8 Billion Years, Waiting for You"
    }, {
      name: "description",
      content: "An immersive journey through the universe: zodiac constellations, cosmic chronicle, galaxies and nebulae."
    }, {
      property: "og:title",
      content: "COSMOS — 13.8 Billion Years, Waiting for You"
    }, {
      property: "og:description",
      content: "An immersive journey through the universe."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./zodiac.index-B2x1fdXw.js");
const Route$1 = createFileRoute("/zodiac/")({
  head: () => ({
    meta: [{
      title: "Zodiac — Twelve Constellations | COSMOS"
    }, {
      name: "description",
      content: "Rotate the ecliptic wheel and explore the twelve zodiac constellations — myth and astronomy together."
    }, {
      property: "og:title",
      content: "Zodiac — Twelve Constellations | COSMOS"
    }, {
      property: "og:description",
      content: "Rotate the ecliptic wheel and explore the twelve zodiac constellations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./zodiac._sign-Cf0btLKq.js");
const $$splitNotFoundComponentImporter = () => import("./zodiac._sign-BaJZajtf.js");
const $$splitErrorComponentImporter = () => import("./zodiac._sign-C-Vfoua3.js");
const Route = createFileRoute("/zodiac/$sign")({
  loader: ({
    params
  }) => {
    const sign = ZODIAC.find((s) => s.id === params.sign);
    if (!sign) throw notFound();
    return {
      id: sign.id
    };
  },
  head: ({
    loaderData
  }) => {
    const sign = ZODIAC.find((s) => s.id === loaderData?.id);
    return {
      meta: [{
        title: `${sign?.en ?? "Constellation"} · ${sign?.zh ?? ""} | COSMOS Zodiac`
      }, {
        name: "description",
        content: `${sign?.en} constellation — star map, key data and mythology.`
      }, {
        property: "og:title",
        content: `${sign?.en} · ${sign?.zh} | COSMOS Zodiac`
      }, {
        property: "og:description",
        content: `${sign?.en} constellation — star map, data and myth.`
      }]
    };
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$7.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$8
});
const NebulaeRoute = Route$6.update({
  id: "/nebulae",
  path: "/nebulae",
  getParentRoute: () => Route$8
});
const GalaxiesRoute = Route$5.update({
  id: "/galaxies",
  path: "/galaxies",
  getParentRoute: () => Route$8
});
const ChronicleRoute = Route$4.update({
  id: "/chronicle",
  path: "/chronicle",
  getParentRoute: () => Route$8
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const ZodiacIndexRoute = Route$1.update({
  id: "/zodiac/",
  path: "/zodiac/",
  getParentRoute: () => Route$8
});
const ZodiacSignRoute = Route.update({
  id: "/zodiac/$sign",
  path: "/zodiac/$sign",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ChronicleRoute,
  GalaxiesRoute,
  NebulaeRoute,
  SitemapDotxmlRoute,
  ZodiacSignRoute,
  ZodiacIndexRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  ZODIAC as Z,
  currentSignIndex as c,
  router as r,
  visibleTonight as v
};
