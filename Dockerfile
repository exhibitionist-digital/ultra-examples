FROM denoland/deno:1.20.3
EXPOSE 8000
RUN apt-get update
RUN apt-get install -y jq moreutils
WORKDIR /
COPY . .
RUN deno task vendor
RUN jq '.importMap = "./vendorMap.json"' deno.json|sponge deno.json
CMD ["deno", "task", "start"]