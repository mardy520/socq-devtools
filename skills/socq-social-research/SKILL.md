---
name: socq-social-research
description: Research public social-platform content and accounts with SocQ. Use when Codex needs to discover the right SocQ endpoint, estimate credits, submit asynchronous social-data jobs, poll results, paginate normalized records, retrieve raw files, or coordinate cross-platform research through SocQ MCP or CLI.
---

# SocQ Social Research

Use SocQ to collect public social data through an asynchronous, credit-metered workflow.

## Choose the integration

1. Prefer the hosted MCP server at `https://api.socq.ai/mcp`.
2. Use a filtered MCP URL when the platforms or endpoints are known:
   - `?platforms=youtube,tiktok` for at most five platforms.
   - `?tools=youtube_comments,x_search` for at most thirty endpoint tools.
3. Run `npx @socq/mcp` when the client only supports local stdio MCP.
4. Fall back to `npx @socq/cli` or REST only when MCP is unavailable.

Never place an API key in a prompt, query string, committed file, or shell command that will be retained. Read [authentication.md](references/authentication.md) before configuring credentials.

## Execute research

1. Restate the requested platforms, entities, date range, and result volume.
2. Search the Capability Registry, then describe the selected endpoint before constructing input. Read [catalog.md](references/catalog.md) when tool discovery is unavailable.
3. Prefer direct URLs or canonical usernames over broad keyword search when the user supplies them.
4. Check account credits before a large or cross-platform run. Read [billing.md](references/billing.md) for cost controls.
5. Submit with a reusable idempotency key when a transport retry is possible.
6. Treat `queued` and `running` as incomplete. Poll until `succeeded` or `failed`; follow [async-tasks.md](references/async-tasks.md).
7. Follow every `next_cursor` needed for the requested scope, respecting a user-provided result cap. Read [pagination.md](references/pagination.md).
8. Use task files for complete raw JSONL exports when normalized pages are insufficient.
9. Report partial coverage, failed platforms, filters, and collection time with the results.

For research spanning multiple networks, follow [cross-platform.md](references/cross-platform.md). For authentication, rate limits, provider failures, and recovery, follow [errors.md](references/errors.md).

## Guardrails

- Collect only public data supported by the selected endpoint.
- Do not retry a failed paid request blindly; inspect the normalized error first.
- Do not invent unsupported parameters. Re-read the endpoint schema after a validation error.
- Do not claim completeness when pagination stopped early, a provider failed, or the requested date filter is unsupported.
- Keep task IDs in the working notes so interrupted research can resume without resubmission.
