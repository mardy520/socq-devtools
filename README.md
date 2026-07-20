# SocQ Devtools

Official SocQ CLI, stdio MCP bridge, and Agent Skill. Endpoint schemas are discovered from the hosted SocQ Capability Registry rather than maintained in this repository.

```bash
pnpm install
pnpm build
pnpm test
```

Public packages:

- `@socq/core`: typed REST/Catalog client
- `@socq/cli`: `socq` command
- `@socq/mcp`: stdio bridge to `https://api.socq.ai/mcp`
