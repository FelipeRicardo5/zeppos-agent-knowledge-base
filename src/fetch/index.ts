// Stage 1: fetch — clone/update official sources into an untracked local cache.

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
const GIT_TIMEOUT_MS = 30_000;

function git(args: string[]) {
  return run("git", args, { timeout: GIT_TIMEOUT_MS });
}

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

  try {
    if (existsSync(path.join(repoDir, ".git"))) {
      await git(["-C", repoDir, "fetch", "--depth", "1", "origin"]);
      // these two commands ensure that we are at the last commit of the default branch (which can be master or main)
      await git(["-C", repoDir, "remote", "set-head", "origin", "-a"]);
      await git(["-C", repoDir, "reset", "--hard", "origin/HEAD"]);
    } else {
      await git(["clone", "--depth", "1", url, repoDir]);
    }
  } catch (e) {
    throw new Error(`Failed to sync ${name} (${url}): ${(e as Error).message}`, { cause: e });
  }

  const { stdout } = await git(["-C", repoDir, "rev-parse", "HEAD"]);
  return { commit: stdout.trim() };
}

export async function fetchSources(cacheDir: string): Promise<Record<SourceName, FetchResult>> {
  await mkdir(cacheDir, { recursive: true });

  const entries = await Promise.all(
    (Object.entries(SOURCES) as [SourceName, string][]).map(
      async ([name, url]) => [name, await cloneOrUpdate(name, url, cacheDir)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<SourceName, FetchResult>;
}
