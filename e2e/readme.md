## End-to-end testing the Ultra react-18 app using Puppeteer

---

End-to-end testing files are found in this folder that run tests against a
running Ultra react-18 application deployed from files in the react-18 git
branch. The tests use the
[Deno puppeteer/deno-puppeteer library](https://doc.deno.land/https://deno.land/x/puppeteer@9.0.2/mod.ts),
a fork of the [Node.js puppeteer library](https://pptr.dev/). These Puppeteer
tests run the Chrome browser in headless mode.

### Running the puppeteer tests

These tests need to be run on a deployed app, so you need to deploy the sample
app from the workspace folder using the following command:

```
deno task dev
```

In a terminal go to the root folder of this repository and run:

```
deno task e2e
```

These deno-puppeteer tests are run using the
[Deno test runner](https://deno.land/manual/testing) as can be done for unit
tests, so the results for a test run will display in the terminal as they would
for a Deno unit test.
