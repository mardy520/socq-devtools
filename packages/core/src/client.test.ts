import {mkdtemp, readFile, rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
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

  it("retries a transient 404 while waiting for a newly submitted task", async () => {
    vi.useFakeTimers();
    try {
      const succeeded = {task_id: "t1", status: "succeeded", results: {items: []}};
      const fetchMock = vi.fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({detail: "agent_task_not_found"}), {status: 404}))
        .mockResolvedValueOnce(new Response(JSON.stringify({code: 200, data: succeeded}), {status: 200}));
      const client = new SocqClient({baseUrl: "https://api.test", apiKey: "sk-test", fetch: fetchMock as typeof fetch});

      const waiting = client.waitTask("t1", {timeoutSeconds: 20, notFoundGraceSeconds: 10});
      await vi.runAllTimersAsync();

      await expect(waiting).resolves.toMatchObject(succeeded);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it("downloads task files without forwarding the API key to signed URLs", async () => {
    const directory = await mkdtemp(join(tmpdir(), "socq-download-"));
    try {
      const fetchMock = vi.fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({
          code: 200,
          data: {
            task_id: "t1",
            items: [{file_type: "jsonl", public_url: "https://files.test/result.jsonl"}],
          },
        })))
        .mockResolvedValueOnce(new Response('{"id":1}\n'));
      const client = new SocqClient({baseUrl: "https://api.test", apiKey: "sk-test", fetch: fetchMock as typeof fetch});

      const downloaded = await client.downloadFiles("t1", directory);

      expect(downloaded).toHaveLength(1);
      expect(await readFile(downloaded[0].path, "utf8")).toBe('{"id":1}\n');
      const calls = fetchMock.mock.calls as unknown as Array<[RequestInfo | URL, RequestInit?]>;
      expect(calls[0][1]?.headers).toMatchObject({Authorization: "Bearer sk-test"});
      expect(calls[1][1]).toBeUndefined();
    } finally {
      await rm(directory, {recursive: true, force: true});
    }
  });
});
