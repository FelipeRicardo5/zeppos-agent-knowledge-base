// Stage 1: fetch — clone/update official sources into an untracked local cache.

const SOURCES = {
  "zeppos-docs": "https://github.com/zepp-health/zeppos-docs.git",
  "zeppos-samples": "https://github.com/zepp-health/zeppos-samples.git",
} as const;

export async function fetchSources(cacheDir: string): Promise<void> {
  throw new Error("not implemented");
}
