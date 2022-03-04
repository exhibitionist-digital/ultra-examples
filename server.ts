import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { ultraHandler } from "https://deno.land/x/ultra@v0.8.0/mod.ts";
import importmap from "./importmap.json" assert { type: "json" };

const port = 8000;

const app = new Application();
const router = new Router();

router.get("/custom-route", (context) => {
  context.response.body = "#1";
});

app.use(router.routes());
app.use(router.allowedMethods());

// ULTRA middleware
// needs to go AFTER your custom routes
// it acts as the final catch all when no
// other route matche
app.use(async (context) => {
  await ultraHandler({
    importmap,
    context,
    root: `http://localhost:${port}`,
  });
});

console.log(`Ultra + Oak listening on localhost:${port}`);
await app.listen({ port });
