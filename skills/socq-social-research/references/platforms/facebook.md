# Facebook

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Facebook.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`facebook/comments`](https://docs.socq.ai/api-manual/facebook/comments) | Fetch normalized comments data from Facebook. | urls | live pricing |
| [`facebook/pages`](https://docs.socq.ai/api-manual/facebook/pages) | Fetch normalized pages data from Facebook. | one of query, urls, usernames | live pricing |
| [`facebook/posts`](https://docs.socq.ai/api-manual/facebook/posts) | Fetch normalized posts data from Facebook. | one of query, urls, usernames | live pricing |

## Validated examples

### `facebook/comments`

Typed MCP tool: `socq_facebook_comments`

```json
{
  "urls": [
    "https://www.facebook.com/nasa/posts/1234567890"
  ]
}
```

### `facebook/pages`

Typed MCP tool: `socq_facebook_pages`

```json
{
  "usernames": [
    "nasa"
  ]
}
```

### `facebook/posts`

Typed MCP tool: `socq_facebook_posts`

```json
{
  "urls": [
    "https://www.facebook.com/nasa"
  ]
}
```
