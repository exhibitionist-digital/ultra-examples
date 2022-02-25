import React from "react";
import { SWRConfig } from "swr";
import { Link, Route, Switch } from "wouter";
import { Helmet } from "react-helmet";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra@v0.7.2/src/types.ts";
import { Index } from "./index.tsx";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <Meta />
      <Switch>
        <Route path="/">
          <Index />
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
    </Helmet>
  );
};
