# Tiktok

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Tiktok.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`tiktok/comments`](https://docs.socq.ai/api-manual/tiktok/comments) | Fetch normalized comments data from Tiktok. | urls | live pricing |
| [`tiktok/hashtags`](https://docs.socq.ai/api-manual/tiktok/hashtags) | Fetch normalized hashtags data from Tiktok. | hashtags | live pricing |
| [`tiktok/profiles`](https://docs.socq.ai/api-manual/tiktok/profiles) | Fetch normalized profiles data from Tiktok. | usernames | live pricing |
| [`tiktok/search`](https://docs.socq.ai/api-manual/tiktok/search) | Fetch normalized search data from Tiktok. | query | live pricing |
| [`tiktok/videos`](https://docs.socq.ai/api-manual/tiktok/videos) | Fetch normalized videos data from Tiktok. | urls | live pricing |

## Validated examples

### `tiktok/comments`

Typed MCP tool: `socq_tiktok_comments`

```json
{
  "urls": [
    "https://www.tiktok.com/@scout2015/video/6718335390845095173"
  ]
}
```

### `tiktok/hashtags`

Typed MCP tool: `socq_tiktok_hashtags`

```json
{
  "hashtags": [
    "#travel"
  ]
}
```

### `tiktok/profiles`

Typed MCP tool: `socq_tiktok_profiles`

```json
{
  "usernames": [
    "@tiktok"
  ]
}
```

### `tiktok/search`

Typed MCP tool: `socq_tiktok_search`

```json
{
  "query": "AI tools"
}
```

### `tiktok/videos`

Typed MCP tool: `socq_tiktok_videos`

```json
{
  "urls": [
    "https://www.tiktok.com/@scout2015/video/6718335390845095173"
  ]
}
```
