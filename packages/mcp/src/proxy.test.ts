import {describe, expect, it, vi} from "vitest";
import {forwardMessage, remoteUrl} from "./proxy.js";

describe("stdio bridge", () => {
  it("uses the API hostname for the hosted MCP server by default", () => {
    const previous = process.env.SOCQ_MCP_URL;
    delete process.env.SOCQ_MCP_URL;
    try {
      expect(remoteUrl({}).toString()).toBe("https://api.socq.ai/mcp");
    } finally {
      if (previous === undefined) delete process.env.SOCQ_MCP_URL;
      else process.env.SOCQ_MCP_URL = previous;
    }
  });

  it("forwards initialize and negotiates a protocol version", async () => {
    const fetchMock = vi.fn(async (_url, init) => {
      expect((init as RequestInit).headers).toMatchObject({"X-Socq-Source": "mcp-stdio", Authorization: "Bearer sk-test"});
      return new Response(JSON.stringify({jsonrpc: "2.0", id: 1, result: {protocolVersion: "2025-11-25"}}));
    });
    const result = await forwardMessage(
      {jsonrpc: "2.0", id: 1, method: "initialize", params: {protocolVersion: "2025-11-25"}},
      {url: "https://mcp.test/mcp", apiKey: "sk-test"},
      fetchMock as typeof fetch,
    );
    expect(result.protocolVersion).toBe("2025-11-25");
  });

  it("adds exactly one tool filter", () => {
    expect(remoteUrl({url: "https://mcp.test/mcp", platforms: "youtube,tiktok"}).searchParams.get("platforms")).toBe("youtube,tiktok");
    expect(() => remoteUrl({platforms: "youtube", tools: "x_search"})).toThrow(/either platforms or tools/i);
  });
});
