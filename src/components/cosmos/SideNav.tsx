import { Link, useRouterState } from "@tanstack/react-router";

const SECTIONS = [
  { to: "/", en: "Home", zh: "宇宙" },
  { to: "/zodiac", en: "Zodiac", zh: "星座" },
  { to: "/chronicle", en: "Chronicle", zh: "时间" },
  { to: "/galaxies", en: "Galaxies", zh: "星系" },
  { to: "/nebulae", en: "Nebulae", zh: "星云" },
  { to: "/about", en: "About", zh: "关于" },
] as const;

/** Right-side dot navigation — label fades in on hover, like the demo. */
export function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Site sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex"
    >
      {SECTIONS.map((s) => {
        const active = s.to === "/" ? pathname === "/" : pathname.startsWith(s.to);
        return (
          <Link key={s.to} to={s.to} className="group flex items-center gap-3">
            <span
              className={`whitespace-nowrap text-[11px] tracking-wide-x transition-all duration-300 ${
                active
                  ? "text-foreground opacity-100"
                  : "translate-x-2 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              <span className="font-zh">{s.zh}</span>
              <span className="ml-2 uppercase">{s.en}</span>
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active
                  ? "h-2 w-2 bg-foreground shadow-[0_0_8px_rgba(237,240,244,0.8)]"
                  : "h-1.5 w-1.5 bg-muted-foreground/50 group-hover:bg-foreground/80"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobile top bar nav fallback */
export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex justify-center gap-4 bg-background/70 px-3 py-3 backdrop-blur-sm md:hidden">
      {SECTIONS.map((s) => {
        const active = s.to === "/" ? pathname === "/" : pathname.startsWith(s.to);
        return (
          <Link
            key={s.to}
            to={s.to}
            className={`text-[10px] uppercase tracking-wide-x transition-colors ${
              active ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {s.en}
          </Link>
        );
      })}
    </nav>
  );
}
