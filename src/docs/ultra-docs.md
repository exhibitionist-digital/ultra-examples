- [Quickstart](#quickstart)
- [Anatomy of an Ultra project](#anatomy-of-an-ultra-project)
- [Suspense data fetching](#suspense-data-fetching)
- [Routing](#routing)
- [Head](#head)
- [Vendoring](#vendoring)
- [Deploying](#deploying)

---

### Quickstart

Clone this [repo](https://github.com/exhibitionist-digital/ultra-examples) and run `deno task dev`. See how you go.

More examples on the following branches: `react-18` `three-js` `web3`

---

### Anatomy of an Ultra project

This is the bare minimum for an **Ultra** project.

```bash
- server.ts
- src/app.tsx
- importMap.json
- deno.json
```

You can run the project with `deno run -A --importmap importmap.json --no-check server.ts` 

> Note: At the time of writing, the published types for React point to `v17`. Which is why we need to use `--no-check` when running the Ultra server.

#### server.ts

```javascript
import ultra from "https://ultra.land/x/ultra/mod.ts";

await ultra();
```

#### importMap.json

Here we include the dependencies of the project.

```javascript
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18",
    "react-dom/server": "https://esm.sh/react-dom@18/server",
    "react-helmet": "https://esm.sh/react-helmet-async?deps=react@18",
    "wouter": "https://esm.sh/wouter?deps=react@18",
    "swr": "https://esm.sh/swr?deps=react@18",
    "ultra/cache": "https://deno.land/x/ultra@v0.8.0/cache.js",
    "app": "./src/app.tsx"
  }
}
```

The above imports are all required to run **Ultra**. You can add other dependencies here, and use them with a standard bare import specifier in your project.

`app` is the entry point to your application. It can live anywhere in the `src` directory. It can be `jsx` or `tsx`.

#### src

All of your project code should live in the `src` directory. The only requirement is an `app.tsx/jsx` file, which is included in your importmap above. Feel free to structure your project how you like. Static files (css, images, etc) can be placed in this directory as well, and will be served as the `root` of your domain.

#### src/app.tsx

```javascript
import React,  from "react";
import { SWRConfig } from "swr";
import { Link, Route, Switch } from "wouter";
import { Helmet } from "react-helmet";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra/src/types.ts";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

export default const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <Helmet>
        <title>Ultra</title>
      </Helmet>
      <main>
        <Switch>
          <Route path="/">
            <h1>Homepage</h1>
          </Route>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </main>
    </SWRConfig>
  );
};
```

> Note: File extensions are important. Always include `.tsx`/`.jsx` in your import statements.

#### deno.json

Using the native [Deno config](https://deno.land/manual/getting_started/configuration_file), ensure you specify your importMap path here, as well as any common tasks.

```javascript
{
  "tasks": {
    "dev": "mode=dev deno run -A --no-check --unstable server.js",
    "start": "deno run -A --no-check --unstable server.js",
    "cache": "deno cache --reload --no-check server.js",
    "vendor": "importMap=importMap.json deno run -A --unstable https://deno.land/x/ultra/vendor.ts",
  },
  "importMap": "importMap.json"
}
```

---

### Suspense data fetching

Vercel's [SWR](https://github.com/vercel/swr) lets us fetch data anywhere in our components, works with Suspense.

**Ultra** uses the brand new **SWR 1.0.0+**. We have a custom cache which allows building of a cache server side, and repopulating on client side.

All **SWR** options are supported: [SWR docs](https://swr.vercel.app/docs/options#options)

```javascript
import { SWRConfig } from "swr";
import ultraCache from "ultra/cache";

const options = (cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const Ultra = ({ cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <h1>Hello World</h1>
    </SWRConfig>
  );
};
```

---

### Routing

Powered by [Wouter](https://github.com/molefrog/wouter). **Wouter** is a fully-featured, tiny (1.36 KB), and best React router that we've ever used. **Ultra** comes with a server side integration which allows full functionality of **Wouter**.

All **Wouter** hooks and functionality is supported: [Wouter docs](https://github.com/molefrog/wouter#wouter-api)

```javascript
import React, { Suspense } from "react";
import { Route } from "wouter";

const Home = lazy(() => import("./home.jsx"));

const App = () => {
  return (
    <Route path="/">
       <Home />
    </Route>
  );
};
```

---

### Head

Powered by [react-helmet-async](https://github.com/staylor/react-helmet-async).

```javascript
import React from "react";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <Helmet>
      <title>Ultra</title>
    </Helmet>
  );
};
```

---

### Vendoring

During development, it's helpful to utilise CDNs like `esm.sh`, `unpkg.com`, and `deno.land/x` to serve your projects dependencies. When deploying to production, you may want to forego the CDNs and serve your dependencies locally. We have a script for doing just this.

```bash
importMap=importMap.json deno run -A --unstable https://deno.land/x/ultra/vendor.ts
```

This will download a complete graph of your dependencies to a `.ultra/x` directory, as well as create a `vendorMap.json` import map file. You can then define this new import map in your `deno.json` file to swap to local dependencies.

> As of v0.8.0, all projects deployed to Deno Deploy will have this feature enabled by default.

---

### Deploying

#### With Deno Deploy

Now supporting the official [Deno GitHub Action](https://deno.com/blog/deploy-static-files)!

1. Create a project in the Deno Deploy Dashboard
2. Select `GitHub Action` integration
3. Add the following action to your project. (Note to update the `root` and `project name`)

> Note: Deno Deploy does **NOT** support dynamic imports (yet). If you are using these for routing, the project will not deploy.

```yaml
name: deno deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Clone repository
        uses: actions/checkout@v2

      - name: Install Deno
        uses: denoland/setup-deno@main
        with:
          deno-version: 1.20.3

      - name: Build site
        run: root=https://example.com deno run -A https://deno.land/x/ultra/build.ts

      - name: Upload to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: [PROJECT_NAME]
          entrypoint: ULTRA.js
          root: .ultra
```

#### With Docker/Fly

`dockerfile`

```bash
FROM denoland/deno:1.20.3
EXPOSE 8000 
WORKDIR /ultra
COPY . .
RUN deno task cache
CMD ["deno", "task", "start"]
```