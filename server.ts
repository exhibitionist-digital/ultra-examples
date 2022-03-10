import ultra from "https://deno.land/x/ultra@v0.7.6/mod.ts";
import importmap from "./importmap.json" assert { type: "json" };

await ultra({
  importmap,
});
