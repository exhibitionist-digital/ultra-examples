FROM denoland/deno:1.20.3
EXPOSE 8000
WORKDIR /
COPY . .
RUN deno task vendor
CMD ["deno", "task", "start"]