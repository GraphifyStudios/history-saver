import { exists } from "node:fs/promises";

if (!(await exists("./data.json"))) await Bun.write("./data.json", "{}");

const dataFile = Bun.file("./data.json");

const dataCache = new Map<string, any>(
  dataFile.size === 0 ? [] : Object.entries(await dataFile.json())
);

export function getKey(key: string) {
  return dataCache.get(key);
}

export function setKey(key: string, value: any) {
  dataCache.set(key, value);
}

setInterval(async () => {
  await Bun.write(
    "./data.json",
    JSON.stringify(Object.fromEntries(dataCache.entries()))
  );
}, 30_000);
