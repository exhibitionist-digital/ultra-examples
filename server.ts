import ultra from "https://deno.land/x/ultra/mod.ts";
import importmap from "./importmap.json" assert { type: "json" };

await ultra({
  importmap,
});
