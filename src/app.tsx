import React, { Suspense } from "react";
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
  return (
    <SWRConfig value={options(cache)}>
      <Meta />
      <nav className="flex">
        <Link href="/" className="logo">
          <img src="/ultra.svg" width="50" height="50" alt="ultra" />
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

      <Switch>
        <Route path="/">
          <section className="hero">
            <img src="/clouds-1.webp" alt="Clouds at sunset." />
            <img src="/clouds-2.webp" alt="Clouds in a clear blue sky." />
            <h1>un-bundle the web</h1>
          </section>
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
    </SWRConfig>
  );
};

export default Ultra;

const Meta = () => {
  const img = "https://ultrajs.dev/ultra-share.jpg";
  const title = "Ultra: Un-bundle the web";
  const desc = "Modern Streaming React Framework";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="stylesheet" href="/style.css?v=2" />
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
      <link
        rel="preload"
        href="https://d1vbyel82rxsrf.cloudfront.net/examples"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://d1vbyel82rxsrf.cloudfront.net/docs"
        as="fetch"
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};
