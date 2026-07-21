# X

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets X.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`x/posts`](https://docs.socq.ai/api-manual/x/posts) | Fetch normalized posts data from X. | urls | live pricing |
| [`x/profiles`](https://docs.socq.ai/api-manual/x/profiles) | Fetch normalized profiles data from X. | usernames | live pricing |
| [`x/search`](https://docs.socq.ai/api-manual/x/search) | Fetch normalized search data from X. | query | live pricing |
| [`x/user-posts`](https://docs.socq.ai/api-manual/x/user-posts) | Fetch normalized user posts data from X. | usernames | live pricing |

## Validated examples

### `x/posts`

Typed MCP tool: `socq_x_posts`

```json
{
  "urls": [
    "https://x.com/X/status/1234567890123456789"
  ]
}
```

### `x/profiles`

Typed MCP tool: `socq_x_profiles`

```json
{
  "usernames": [
    "@X"
  ]
}
```

### `x/search`

Typed MCP tool: `socq_x_search`

```json
{
  "query": "AI agents"
}
```

### `x/user-posts`

Typed MCP tool: `socq_x_user_posts`

```json
{
  "usernames": [
    "@X"
  ]
}
```
