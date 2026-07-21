# Instagram

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Instagram.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`instagram/comments`](https://docs.socq.ai/api-manual/instagram/comments) | Fetch normalized comments data from Instagram. | urls | live pricing |
| [`instagram/followers-count`](https://docs.socq.ai/api-manual/instagram/followers-count) | Fetch normalized followers count data from Instagram. | one of query, urls, usernames | live pricing |
| [`instagram/posts`](https://docs.socq.ai/api-manual/instagram/posts) | Fetch normalized posts data from Instagram. | one of query, urls, usernames | live pricing |
| [`instagram/reels`](https://docs.socq.ai/api-manual/instagram/reels) | Fetch normalized reels data from Instagram. | one of query, urls, usernames | live pricing |
| [`instagram/search`](https://docs.socq.ai/api-manual/instagram/search) | Fetch normalized search data from Instagram. | one of query, urls, usernames | live pricing |

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
