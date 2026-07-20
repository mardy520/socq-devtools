import {describe, expect, it, vi} from "vitest";
import {SocqClient} from "./client.js";

describe("SocqClient", () => {
  it("sends auth, source, and idempotency headers", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({code: 200, data: {task_id: "t1", status: "queued"}}), {status: 200}));
    const client = new SocqClient({baseUrl: "https://api.test", apiKey: "sk-test", source: "cli", fetch: fetchMock as typeof fetch});
    await client.submit("youtube", "comments", {urls: ["x"]}, {idempotencyKey: "retry-1"});
    const calls = fetchMock.mock.calls as unknown as Array<[RequestInfo | URL, RequestInit?]>;
    const init = calls[0][1] as RequestInit;
    expect(init.headers).toMatchObject({Authorization: "Bearer sk-test", "X-Socq-Source": "cli", "Idempotency-Key": "retry-1"});
  });

  it("uses an ETag for an unfiltered cached catalog", async () => {
    const data = {schema_version: "v1-x", platforms: [], endpoints: {items: [], next_cursor: null, has_more: false}};
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({code: 200, data}), {headers: {etag: '"abc"'}}))
      .mockResolvedValueOnce(new Response(null, {status: 304}));
    const client = new SocqClient({baseUrl: "https://api.test", fetch: fetchMock as typeof fetch});
    await client.catalog();
    await client.catalog();
    const calls = fetchMock.mock.calls as unknown as Array<[RequestInfo | URL, RequestInit?]>;
    expect((calls[1][1] as RequestInit).headers).toMatchObject({"If-None-Match": '"abc"'});
  });
});
