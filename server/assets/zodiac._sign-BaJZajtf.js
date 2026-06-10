import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-4", children: [
  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "This constellation isn't in our sky." }),
  /* @__PURE__ */ jsx(Link, { to: "/zodiac", className: "border border-border px-6 py-2 text-xs uppercase tracking-wide-x", children: "Back to Zodiac" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
