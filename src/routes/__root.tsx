import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Starfield } from "../components/cosmos/Starfield";
import { SideNav, MobileNav } from "../components/cosmos/SideNav";
import { GridTransition } from "../components/cosmos/GridTransition";
import { BigBang } from "../components/cosmos/BigBang";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-light tracking-cosmos text-foreground">404</h1>
        <p className="mt-4 text-sm tracking-wide-x text-muted-foreground">
          Lost in space — this page doesn't exist.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center border border-border px-6 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary"
          >
            Return to Earth
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-light tracking-wide-x text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center border border-border px-5 py-2 text-xs uppercase tracking-wide-x text-foreground transition-colors hover:bg-secondary"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center border border-border px-5 py-2 text-xs uppercase tracking-wide-x text-muted-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "COSMOS — An Immersive Journey Through the Universe" },
      {
        name: "description",
        content: "13.8 billion years, waiting for you. Explore the zodiac, cosmic history, galaxies and nebulae.",
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
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/92e7ba1b-a0ae-42b3-8d65-fc5381a8f3e6/id-preview-3cfd88ba--01639990-bd44-45f1-8309-3e3f78c5795e.lovable.app-1781107881419.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;500&family=JetBrains+Mono:wght@300;400&family=Noto+Serif+SC:wght@300;400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Starfield />
      <SideNav />
      <MobileNav />
      <GridTransition />
      <BigBang />
      <div className="relative z-10">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
