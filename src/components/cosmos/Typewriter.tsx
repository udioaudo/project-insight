import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 65,
  delay = 600,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
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

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span
        className={`inline-block w-[1px] translate-y-[2px] bg-foreground/70 ${count < text.length ? "animate-twinkle" : "opacity-0"}`}
        style={{ height: "1em" }}
      />
    </span>
  );
}
