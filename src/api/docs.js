import { compile } from "https://esm.sh/@mdx-js/mdx?no-check";
import rehypeHighlight from "https://esm.sh/rehype-highlight?no-check";
import rehypeSlug from "https://esm.sh/rehype-slug?no-check";
import LRU from "https://deno.land/x/lru/mod.ts";

const docCache = new LRU(20);

export default async () => {
  const headers = {
    "content-type": "application/json",
  };

  let body = docCache.get("mdx");

  if (!body) {
    const source = await Deno.readTextFile(
      `${Deno.cwd()}/src/mdx/ultra-docs.mdx`
    );

    const content = String(
      await compile(source, {
        outputFormat: "function-body",
        useDynamicImport: true,
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      })
    );
    body = JSON.stringify({ content });
    docCache.set("mdx", body);
  }

  return new Response(body, { headers });
};
