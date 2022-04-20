import React, { Suspense, useEffect } from "react";
import { SWRConfig } from "swr";
import { Link, Route, Switch, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import ultraCache from "ultra/cache";
import Page from "./page.tsx";
import GitHub from "./github.tsx";
import Examples from "./examples.tsx";
import { Cache } from "https://deno.land/x/ultra/src/types.ts";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnMount: false,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  const [location] = useLocation();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // @ts-ignore sw not in navigator for some reason?
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);
  return (
    <SWRConfig value={options(cache)}>
      <Meta />
      <nav className="flex">
        <Link href="/" className="logo">
          <img src="/ultra.svg" width="50" height="50" alt="Ultra logo" />
          <h3>Ultra</h3>
        </Link>
        <div>
          <Link href="/docs" className={location == "/docs" ? "active" : ""}>
            Docs
          </Link>
          <Link
            href="/examples"
            className={location == "/examples" ? "active" : ""}
          >
            Examples
          </Link>
        </div>
        <div>
          <Suspense fallback={null}>
            <GitHub />
          </Suspense>
        </div>
      </nav>
      <main>
        <Switch>
          <Route path="/">
            <section className="hero">
              <img
                src="/clouds-1.webp"
                alt="Clouds at sunset."
                width="800"
                height="600"
              />
              <img
                src="/clouds-2.webp"
                alt="Clouds in a clear blue sky."
                width="800"
                height="600"
              />
              <h1>un-bundle the web</h1>
            </section>

            <p>
              <strong>Ultra</strong>{" "}
              is a web framework that leans hard into your browser's native
              features. Embrace the future of <strong>ES Modules</strong>,{" "}
              <strong>Import Maps</strong>, and{" "}
              <strong>Web Streams</strong>. All while supporting some of the
              non-standards that many normal people love for some reason
              (<strong>
                JSX
              </strong>{" "}
              and <strong>TypeScript</strong>).
            </p>
          </Route>
          <Route path="/examples">
            <Examples />
          </Route>
          <Route path="/:slug">
            <Page />
          </Route>
          <Route>
            <strong>404</strong>
          </Route>
        </Switch>
      </main>
    </SWRConfig>
  );
};

export default Ultra;

const Meta = () => {
  const img = "https://ultrajs.dev/ultra-share.jpg";
  const title = "Ultra: un-bundle the web";
  const desc = "Modern Streaming React Framework";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/ultra.svg"></link>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content="https://ultrajs.dev" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:image" content={img} />
      <link rel="prefetch" as="fetch" href="/api/docs" />
      <link rel="prefetch" as="fetch" href="/api/examples" />
    </Helmet>
  );
};
