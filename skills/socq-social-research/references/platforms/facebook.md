# Facebook

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Facebook.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`facebook/comments`](https://docs.socq.ai/api-manual/facebook/comments) | Facebook Comments API | urls | 0.3 credits/result |
| [`facebook/pages`](https://docs.socq.ai/api-manual/facebook/pages) | Facebook Page API | one of query, urls, usernames | 2.4 credits/result |
| [`facebook/posts`](https://docs.socq.ai/api-manual/facebook/posts) | Facebook Posts API | one of query, urls, usernames | 1 credits/result |

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
