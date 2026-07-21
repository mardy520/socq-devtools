import {mkdtemp, rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {describe, expect, it, vi} from "vitest";
import {loadConfig} from "@socq/core";
import {parseArgs} from "./args.js";
import {serialize} from "./output.js";
import {runCli} from "./cli.js";

describe("CLI primitives", () => {
  it("parses endpoint flags without a static command registry", () => {
    expect(parseArgs(["youtube", "comments", "--urls", "a,b", "--wait", "--timeout=30"])).toEqual({
      positionals: ["youtube", "comments"],
      options: {urls: "a,b", wait: true, timeout: "30"},
    });
  });

  it("renders JSONL and CSV result rows", () => {
    const value = {items: [{id: 1, text: "a"}, {id: 2, text: "b"}]};
    expect(serialize(value, "jsonl").split("\n")).toHaveLength(2);
    expect(serialize(value, "csv")).toContain("id,text");
  });

  it("logs in, reports fallback credential status, and clears credentials", async () => {
    const directory = await mkdtemp(join(tmpdir(), "socq-cli-auth-"));
    const previous = {
      configHome: process.env.XDG_CONFIG_HOME,
      apiKey: process.env.SOCQ_API_KEY,
      disableKeyring: process.env.SOCQ_DISABLE_KEYRING,
    };
    const output = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    try {
      process.env.XDG_CONFIG_HOME = directory;
      process.env.SOCQ_DISABLE_KEYRING = "1";
      process.env.SOCQ_API_KEY = "sk-cli-test-value";
      expect(await runCli(["auth", "login", "--base-url", "https://dev-api.test"])).toBe(0);
      delete process.env.SOCQ_API_KEY;
      expect(await runCli(["auth", "status"])).toBe(0);
      expect(output.mock.calls.flat().join(" ")).toContain("(config)");
      expect(await loadConfig()).toEqual({apiKey: "sk-cli-test-value", baseUrl: "https://dev-api.test"});
      expect(await runCli(["auth", "clear"])).toBe(0);
      expect(await loadConfig()).toEqual({});
    } finally {
      output.mockRestore();
      await rm(directory, {recursive: true, force: true});
      restoreEnvironment("XDG_CONFIG_HOME", previous.configHome);
      restoreEnvironment("SOCQ_API_KEY", previous.apiKey);
      restoreEnvironment("SOCQ_DISABLE_KEYRING", previous.disableKeyring);
    }
  });
});

function restoreEnvironment(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
