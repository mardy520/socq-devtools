export interface JsonSchema {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  [key: string]: unknown;
}

export interface Capability {
  public_id: string;
  platform: string;
  resource: string;
  tool_name: string;
  title: string;
  description: string;
  input_schema: JsonSchema;
  output_schema: JsonSchema;
  billing: {credits: number | null; unit: string; dynamic?: boolean; config?: Record<string, unknown>};
  examples: Array<Record<string, unknown>>;
  tags: string[];
  execution_mode: "async";
  supports_pagination: boolean;
  supports_files: boolean;
  supports_callback: boolean;
  status: string;
  docs_url: string;
}

export interface PlatformSummary {
  platform: string;
  title: string;
  endpoint_count: number;
  tools: string[];
}

export interface CatalogData {
  schema_version: string;
  platforms: PlatformSummary[];
  endpoints: {items: Capability[]; next_cursor: string | null; has_more: boolean};
}

export interface TaskData {
  task_id: string;
  status: string;
  public_id?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  result_count?: number;
  error_message?: string | null;
  credits_amount?: number;
  created_time?: string | null;
  finished_time?: string | null;
  idempotent_replay?: boolean;
  results?: {limit: number; next_cursor: string | null; has_more: boolean; items: unknown[]};
  poll_after_seconds?: number;
}

export interface ClientOptions {
  baseUrl?: string;
  apiKey?: string;
  source?: "rest" | "cli" | "skill";
  fetch?: typeof globalThis.fetch;
}
