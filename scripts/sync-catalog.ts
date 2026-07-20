import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

function option(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const baseUrl = option("base-url", process.env.SOCQ_BASE_URL ?? "https://api.socq.ai").replace(/\/$/, "");
const catalogOutput = resolve(option("catalog-output", "artifacts/capability-catalog.json"));
const openapiOutput = resolve(option("openapi-output", "artifacts/agent-openapi.json"));

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {headers: {Accept: "application/json"}});
  if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}: ${(await response.text()).slice(0, 500)}`);
  return response.json();
}

const catalogEnvelope = await fetchJson(`${baseUrl}/v1/catalog?limit=100`) as {data?: unknown};
const catalog = catalogEnvelope.data ?? catalogEnvelope;
const openapi = await fetchJson(`${baseUrl}/v1/catalog/openapi.json`);
for (const [path, value] of [[catalogOutput, catalog], [openapiOutput, openapi]] as const) {
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
process.stderr.write(`Wrote ${catalogOutput}\nWrote ${openapiOutput}\n`);
