// Stage 1: fetch — clone/update official sources into an untracked local cache.

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

// we can input timeout in execFile? 
const run = promisify(execFile);

export const SOURCES = {
  "zeppos-docs": "https://github.com/zepp-health/zeppos-docs.git",
  "zeppos-samples": "https://github.com/zepp-health/zeppos-samples.git",
} as const;

export type SourceName = keyof typeof SOURCES;

export interface FetchResult {
  commit: string;
}

async function cloneOrUpdate(name: SourceName, url: string, cacheDir: string): Promise<FetchResult> {
  const repoDir = path.join(cacheDir, name);

  if (existsSync(path.join(repoDir, ".git"))) {
    try {
      await run("git", ["-C", repoDir, "fetch", "--depth", "1", "origin"]);
      // these two commands ensure that we are at the last commit of the default branch (which can be master or main)
      await run("git", ["remote", "set-head", "origin", "-a"]);
      await run("git", ["-C", repoDir, "reset", "--hard", "origin/HEAD"]);
    } catch (e) {
      // claude improve this catch pls!
      console.error(`Failed to fetch from ${url}: ${e}`);
      throw e;
    }
  } else {
    await run("git", ["clone", "--depth", "1", url, repoDir]);
  }

  const { stdout } = await run("git", ["-C", repoDir, "rev-parse", "HEAD"]);
  return { commit: stdout.trim() };
}

export async function fetchSources(cacheDir: string): Promise<Record<SourceName, FetchResult>> {
  await mkdir(cacheDir, { recursive: true });
  // we can parallelize with Promise.all in future if source grows
  const results = {} as Record<SourceName, FetchResult>;
  for (const [name, url] of Object.entries(SOURCES) as [SourceName, string][]) {
    results[name] = await cloneOrUpdate(name, url, cacheDir);
  }
  return results;
}
