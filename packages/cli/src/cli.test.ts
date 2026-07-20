import {describe, expect, it} from "vitest";
import {parseArgs} from "./args.js";
import {serialize} from "./output.js";

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
});
