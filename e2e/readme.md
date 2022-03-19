## End-to-end testing the Ultra react-18 app using Puppeteer
---

End-to-end testing files are found in this folder that run tests against a running Ultra react-18 application deployed from files in the react-18 git branch. The tests use the [Deno puppeteer/deno-puppeteer library](https://doc.deno.land/https://deno.land/x/puppeteer@9.0.2/mod.ts), a fork of the [Node.js puppeteer library](https://pptr.dev/). These Puppeteer tests run the Chrome browser in headless mode.

### Running the puppeteer tests

In a terminal go to the root folder of this repository and run:
 ```
 make test
 ```

These deno-puppeteer tests are run using the [Deno test runner](https://deno.land/manual/testing) as can be done for unit tests, so the results for a test run will display in the terminal as they would for a Deno unit test.

### Chrome installed in a non-standard folder

Note that the `test` target in the root folder `makefile` sets the `chrome_path` environment variable to `/opt/google/chrome/chrome`, where the Chrome binary is installed on the Ubuntu Linux OS.

If your local Chrome browser is installed in a different folder, you can run the tests using this command:
```
chrome_path=<Your local Chrome binary path> deno test --unstable -A
```

### Running tests in a non-headless mode

If you want to run the deno-puppeteer tests in non-headless mode where you can watch the Chrome browser being exercised during test runs, change the `headless` argument in the call to `puppeteer.launch()` to `false` in the test files. In that case, deno-puppeteer will launch a new browser window and close it when the test completes. Test output will display in the terminal window in the same way it does in headless mode. We use headless mode to run the tests in a continuous integration environment.
