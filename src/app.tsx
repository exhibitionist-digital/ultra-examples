import React, { Suspense } from "react";
import useSWR, { SWRConfig } from "swr";
import { Link, Route, Switch } from "wouter";
import { Helmet } from "react-helmet";
import ultraCache from "ultra/cache";
import Page from "./page.tsx";
import GitHub from "./github.tsx";
import Examples from "./examples.tsx";
import { Cache } from "https://deno.land/x/ultra@v0.6/src/types.ts";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <Meta />
      <section className="flex">
        <img src="/ultra.svg" width="100" height="100" alt="ultra" />
        <div style={{ margin: "1em 0 1em" }}>
          <h1>ULTRA</h1>
          <h2>Modern Streaming React Framework</h2>
        </div>
      </section>
      <nav>
        <Link href="/">
          About
        </Link>
        <Link href="/docs">
          Docs
        </Link>
        <Link href="/examples">
          Examples
        </Link>
        <Suspense fallback={null}>
          <GitHub />
        </Suspense>
      </nav>
      <section>
        <Switch>
          <Route path="/">
            <Page />
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
      </section>
    </SWRConfig>
  );
};

export default Ultra;

const Meta = () => {
  const img = "https://ultrajs.dev/ultra.jpg";
  const desc = "💎 Modern Streaming React Framework";
  return (
    <Helmet>
      <title>Ultra</title>
      <meta name="description" content={desc} />
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/ultra.svg"></link>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Ultra" />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content="https://ultrajs.dev" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="Ultra" />
      <meta property="twitter:image" content={img} />
      <link
        rel="preload"
        href="https://d1vbyel82rxsrf.cloudfront.net/about"
        as="fetch"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://d1vbyel82rxsrf.cloudfront.net/docs"
        as="fetch"
        crossOrigin
      />
      <link
        rel="preload"
        href="https://d1vbyel82rxsrf.cloudfront.net/examples"
        as="fetch"
        crossOrigin
      />
    </Helmet>
  );
};
