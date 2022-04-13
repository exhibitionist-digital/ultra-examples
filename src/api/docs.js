import { compile } from "mdx-js/compile";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export default async () => {
  const headers = {
    "content-type": "application/json",
  };

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
  const body = JSON.stringify({ content });
  return new Response(body, { headers });
};
