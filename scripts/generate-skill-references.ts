import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

function option(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return resolve(index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback);
}

interface Capability {
  public_id: string;
  title: string;
  description: string;
  billing: {credits: number | null; unit: string};
  input_schema: {required?: string[]; properties?: Record<string, unknown>};
  docs_url: string;
}

const input = option("input", "artifacts/capability-catalog.json");
const output = option("output", "skills/socq-social-research/references/catalog.md");
const catalog = JSON.parse(await readFile(input, "utf8")) as {schema_version: string; endpoints: Capability[] | {items: Capability[]}};
const endpoints = Array.isArray(catalog.endpoints) ? catalog.endpoints : catalog.endpoints.items;
const lines = [
  "# Capability Catalog",
  "",
  `Generated from SocQ Capability Registry schema \`${catalog.schema_version}\`. Do not edit endpoint definitions manually.`,
  "",
  "| Endpoint | Purpose | Required input | Credits |",
  "| --- | --- | --- | ---: |",
  ...endpoints.map((item) => {
    const required = item.input_schema.required?.join(", ") || "—";
    const credits = item.billing.credits === null ? "live" : String(item.billing.credits);
    return `| [\`${item.public_id}\`](${item.docs_url}) | ${item.description.replace(/\|/g, "\\|")} | ${required} | ${credits}/${item.billing.unit} |`;
  }),
  "",
];
await writeFile(output, lines.join("\n"), "utf8");
process.stderr.write(`Wrote ${output}\n`);
