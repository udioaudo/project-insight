import { useEffect, useState } from "react";

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
  "a",
];

/** Konami code easter egg — full-screen big bang particle burst. */
export function BigBang() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setActive(true);
          setTimeout(() => setActive(false), 3000);
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
    const angle = (i / 80) * Math.PI * 2 + Math.random() * 0.3;
    const dist = 30 + Math.random() * 60;
    return {
      id: i,
      bx: `${Math.cos(angle) * dist}vmax`,
      by: `${Math.sin(angle) * dist}vmax`,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 0.25,
    };
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/80">
      <div className="relative">
        {particles.map((p) => (
          <span
            key={p.id}
            className="animate-bang absolute rounded-full bg-foreground"
            style={
              {
                width: p.size,
                height: p.size,
                left: 0,
                top: 0,
                animationDelay: `${p.delay}s`,
                "--bx": p.bx,
                "--by": p.by,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <p className="animate-fade-up absolute bottom-[18%] text-center text-sm tracking-wide-x text-muted-foreground">
        <span className="font-zh">138亿年前，也许就是这样</span>
        <span className="mt-2 block text-xs uppercase">13.8 billion years ago, perhaps it began like this</span>
      </p>
    </div>
  );
}
