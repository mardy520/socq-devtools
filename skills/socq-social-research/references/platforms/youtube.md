# Youtube

Generated from SocQ Capability Registry schema `v1-063d1c96173a`. Read this file when the request targets Youtube.

## Endpoint selection

| Endpoint | Use for | Input choice | Cost |
| --- | --- | --- | --- |
| [`youtube/channel-videos`](https://docs.socq.ai/api-manual/youtube/channel-videos) | Fetch normalized channel videos data from Youtube. | urls | live pricing |
| [`youtube/channels`](https://docs.socq.ai/api-manual/youtube/channels) | Fetch normalized channels data from Youtube. | urls | live pricing |
| [`youtube/comments`](https://docs.socq.ai/api-manual/youtube/comments) | Fetch normalized comments data from Youtube. | urls | live pricing |
| [`youtube/search`](https://docs.socq.ai/api-manual/youtube/search) | Fetch normalized search data from Youtube. | query | live pricing |
| [`youtube/shorts`](https://docs.socq.ai/api-manual/youtube/shorts) | Fetch normalized shorts data from Youtube. | urls | live pricing |
| [`youtube/transcripts`](https://docs.socq.ai/api-manual/youtube/transcripts) | Fetch normalized transcripts data from Youtube. | urls | live pricing |
| [`youtube/videos`](https://docs.socq.ai/api-manual/youtube/videos) | Fetch normalized videos data from Youtube. | urls | live pricing |

## Validated examples

### `youtube/channel-videos`

Typed MCP tool: `socq_youtube_channel_videos`

```json
{
  "urls": [
    "https://www.youtube.com/@YouTube"
  ]
}
```

### `youtube/channels`

Typed MCP tool: `socq_youtube_channels`

```json
{
  "urls": [
    "https://www.youtube.com/@YouTube"
  ]
}
```

### `youtube/comments`

Typed MCP tool: `socq_youtube_comments`

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  ]
}
```

### `youtube/search`

Typed MCP tool: `socq_youtube_search`

```json
{
  "query": "AI agents tutorial"
}
```

### `youtube/shorts`

Typed MCP tool: `socq_youtube_shorts`

```json
{
  "urls": [
    "https://www.youtube.com/@YouTube"
  ]
}
```

### `youtube/transcripts`

Typed MCP tool: `socq_youtube_transcripts`

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  ],
  "language": "en"
}
```

### `youtube/videos`

Typed MCP tool: `socq_youtube_videos`

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  ]
}
```
