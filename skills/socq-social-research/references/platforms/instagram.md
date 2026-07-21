# Instagram

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Instagram.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`instagram/comments`](https://docs.socq.ai/api-manual/instagram/comments) | Instagram Comments API | urls | 0.3 credits/result |
| [`instagram/followers-count`](https://docs.socq.ai/api-manual/instagram/followers-count) | Instagram Followers Count API | one of query, urls, usernames | 0.52 credits/result |
| [`instagram/posts`](https://docs.socq.ai/api-manual/instagram/posts) | Instagram Post API | one of query, urls, usernames | 0.34 credits/result |
| [`instagram/reels`](https://docs.socq.ai/api-manual/instagram/reels) | Instagram Reel API | one of query, urls, usernames | 0.52 credits/result |
| [`instagram/search`](https://docs.socq.ai/api-manual/instagram/search) | Instagram Search API | one of query, urls, usernames | 0.54 credits/result |

## Validated examples

### `instagram/comments`

Typed MCP tool: `socq_instagram_comments`

```json
{
  "urls": [
    "https://www.instagram.com/p/ABC123xyz/"
  ]
}
```

### `instagram/followers-count`

Typed MCP tool: `socq_instagram_followers_count`

```json
{
  "usernames": [
    "instagram"
  ]
}
```

### `instagram/posts`

Typed MCP tool: `socq_instagram_posts`

```json
{
  "usernames": [
    "instagram"
  ]
}
```

### `instagram/reels`

Typed MCP tool: `socq_instagram_reels`

```json
{
  "usernames": [
    "instagram"
  ]
}
```

### `instagram/search`

Typed MCP tool: `socq_instagram_search`

```json
{
  "query": "travel photography"
}
```
