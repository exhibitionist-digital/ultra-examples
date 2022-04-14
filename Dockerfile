FROM denoland/deno:1.20.3
EXPOSE 8000
WORKDIR /
COPY . .
RUN importMap=importMap.json deno run -A --unstable --no-check https://deno.land/x/ultra@v0.8.2/vendor.ts
CMD ["deno", "task", "start"]