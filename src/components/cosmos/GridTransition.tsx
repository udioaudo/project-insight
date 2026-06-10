import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Celestial coordinate grid flash on route change — like aiming a telescope. */
export function GridTransition() {
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

  return (
    <div key={flashKey} className="animate-grid-flash pointer-events-none fixed inset-0 z-50">
      <svg className="h-full w-full opacity-60" aria-hidden="true">
        <defs>
          <pattern id="ra-dec" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(237,240,244,0.25)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ra-dec)" />
        <ellipse cx="50%" cy="50%" rx="46%" ry="30%" fill="none" stroke="rgba(237,240,244,0.2)" strokeWidth="0.5" />
        <ellipse cx="50%" cy="50%" rx="30%" ry="46%" fill="none" stroke="rgba(237,240,244,0.2)" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(237,240,244,0.3)" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(237,240,244,0.3)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
