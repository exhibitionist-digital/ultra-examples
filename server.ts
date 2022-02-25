import ultra from "https://deno.land/x/ultra@v0.7.4/mod.ts";
import importmap from "./importmap.json" assert { type: "json" };

await ultra({
  importmap,
});
