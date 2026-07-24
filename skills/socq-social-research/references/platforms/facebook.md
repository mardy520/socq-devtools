# Facebook

Generated from SocQ Capability Registry schema `v1-23199b4e1a3e`. Read this file when the request targets Facebook.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`facebook/comments`](https://docs.socq.ai/api-manual/facebook/comments) | Facebook Comments API | urls | 0.3 credits/result |
| [`facebook/events-search`](https://docs.socq.ai/api-manual/facebook/events-search) | Search public Facebook events by keyword. | query | 0.6 credits/result |
| [`facebook/group-posts`](https://docs.socq.ai/api-manual/facebook/group-posts) | Collect posts from public Facebook groups. | urls | 1.2 credits/result |
| [`facebook/pages`](https://docs.socq.ai/api-manual/facebook/pages) | Facebook Page API | one of query, urls, usernames | 2.4 credits/result |
| [`facebook/posts`](https://docs.socq.ai/api-manual/facebook/posts) | Facebook Posts API | one of query, urls, usernames | 1 credits/result |
| [`facebook/video-transcript`](https://docs.socq.ai/api-manual/facebook/video-transcript) | Extract transcripts from public Facebook videos and reels. | urls | 0.7 credits/result |

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

### `facebook/events-search`

Typed MCP tool: `socq_facebook_events_search`

```json
{
  "query": "technology conference",
  "results_limit": 20
}
```

### `facebook/group-posts`

Typed MCP tool: `socq_facebook_group_posts`

```json
{
  "urls": [
    "https://www.facebook.com/groups/1270525996445602/"
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

### `facebook/video-transcript`

Typed MCP tool: `socq_facebook_video_transcript`

```json
{
  "urls": [
    "https://www.facebook.com/reel/1535656380759655"
  ]
}
```
