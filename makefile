config = --allow-net --allow-read --allow-run --allow-env --allow-write --no-check --import-map importmap.json --unstable
chrome_path = /opt/google/chrome/chrome
dev:
	mode=dev deno run $(config) server.ts

start:
	deno run $(config) server.ts

cache:
	deno cache --import-map=importmap.json --reload --no-check server.ts

test:
	 chrome_path=$(chrome_path) deno test --unstable -A