import { jsx } from "react/jsx-runtime";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center text-muted-foreground", role: "alert", children: error.message });
export {
  SplitErrorComponent as errorComponent
};
