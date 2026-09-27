# Builds an isolated copy of the knowledge base for an eval run.
#
# The point is that the run's isolation is physical, not a promise. The task file
# forbids reading .cache/, src/, test/ and eval/, but a forbidden directory that
# is present is only a request. A `git worktree` is worse: it shares the .git
# dir, so an agent could `git show HEAD:eval/results/...` and read every gap a
# previous run found.
#
# So: `git archive` the commit, which yields tracked files only — no .git, no
# .cache/ (gitignored), no node_modules — then drop what the agent must not see
# and fail if any of it survived.
#
# Usage:  .\eval\prepare-run.ps1
#         .\eval\prepare-run.ps1 -Commit abc1234 -Destination C:\tmp\run
#
# Then start a NEW session in the destination and give the agent everything
# below the `---` in eval\task-01-health-sync.md, telling it which commit it is
# reading. Never give it eval\task-01-notes.md.

# -Mcp builds the other channel: the agent gets the MCP server and no rendered
# tree at all. That is the point of the arm — with both present an agent reads
# files, and "does querying beat reading" stays unanswered for another run. So
# the copy holds the MCP skill and nothing else to open.
#
# The server has to run from somewhere, and that somewhere cannot be this
# repository: an MCP client config names the path it launches, and a curious
# agent that follows it would land in eval/results, where every gap a previous
# run found is written down. So a second archive is built to serve from, with
# eval/ removed and no .git. The honest statement of the boundary: eval/, .git/
# and .cache/ are physically absent from both directories; src/ is present in
# the server copy, because something has to run. An agent that goes looking can
# read the extractor. It cannot read a past report, and it cannot read history.

param(
  [string]$Commit = "HEAD",
  [string]$Destination = "..\zeppos-kb-eval",
  [switch]$Mcp
)

$ErrorActionPreference = "Stop"

Set-Location (git rev-parse --show-toplevel)

git rev-parse --verify --quiet $Commit | Out-Null
if (-not $?) {
  Write-Error "'$Commit' is not a commit in this repository"
  exit 1
}

# A run has to name the commit it measured, and uncommitted work is not nameable.
$dirty = git status --porcelain
if ($dirty -and $Commit -eq "HEAD") {
  Write-Warning "The working tree is dirty, so the copy will NOT include your"
  Write-Warning "uncommitted changes - git archive reads the commit, not the tree."
  Write-Warning "Commit first, or pass -Commit explicitly."
}

$resolved = (git rev-parse --short $Commit).Trim()

if (Test-Path $Destination) {
  Write-Error "'$Destination' already exists - remove it or pass another -Destination"
  exit 1
}

New-Item -ItemType Directory -Path $Destination -Force | Out-Null
$full = (Resolve-Path $Destination).Path

# `git archive` to a tar, then expand. tar ships with Windows 10+ and with Git.
$tar = Join-Path $env:TEMP "kb-eval-$resolved.tar"
git archive --format=tar --output=$tar $Commit
tar -x -f $tar -C $full
Remove-Item $tar -Force

# What the agent must not see. .cache/ and node_modules/ are already absent,
# being untracked, and .git/ never enters a git archive.
foreach ($hidden in @("eval", "src", "test", "tsconfig.json", "package.json", "package-lock.json")) {
  $target = Join-Path $full $hidden
  if (Test-Path $target) { Remove-Item $target -Recurse -Force }
}

if ($Mcp) {
  # The agent's directory keeps one thing: the skill that teaches the tools.
  # Everything else is a page, and a page left in reach is a page that gets read
  # instead of a tool that gets called.
  foreach ($entry in Get-ChildItem $full -Force -Name) {
    if ($entry -ne "skills") { Remove-Item (Join-Path $full $entry) -Recurse -Force }
  }
  $fileTaught = Join-Path $full "skills\zepp-os"
  if (Test-Path $fileTaught) { Remove-Item $fileTaught -Recurse -Force }

  $mcpSkill = Join-Path $full "skills\zepp-os-mcp\SKILL.md"
  if (-not (Test-Path $mcpSkill)) {
    Write-Error "$Commit has no skills/zepp-os-mcp/SKILL.md - the MCP channel has nothing to teach the agent with"
    exit 1
  }

  # The server copy. Same commit, eval/ removed, no .git - so the path named in
  # the client config leads somewhere that cannot answer what a past run found.
  $serverDir = "$Destination-server"
  if (Test-Path $serverDir) {
    Write-Error "'$serverDir' already exists - remove it or pass another -Destination"
    exit 1
  }
  New-Item -ItemType Directory -Path $serverDir -Force | Out-Null
  $server = (Resolve-Path $serverDir).Path

  $serverTar = Join-Path $env:TEMP "kb-eval-server-$resolved.tar"
  git archive --format=tar --output=$serverTar $Commit
  tar -x -f $serverTar -C $server
  Remove-Item $serverTar -Force
  Remove-Item (Join-Path $server "eval") -Recurse -Force

  # Copied rather than installed: `npm ci` would need the network, and a
  # different dependency tree than the one this commit was measured with is a
  # second variable in a run that is meant to move one.
  $modules = Join-Path (Get-Location) "node_modules"
  if (-not (Test-Path $modules)) {
    Write-Error "node_modules is missing here - run npm ci before preparing an MCP run"
    exit 1
  }
  Write-Host "copying node_modules into the server copy (this takes a moment)..."
  Copy-Item $modules -Destination (Join-Path $server "node_modules") -Recurse -Force

  # `node` and an absolute path to the tsx CLI, not `npx`: the client launches
  # this with the agent's directory as its working directory, which has no
  # node_modules and no network to fetch one.
  $config = [ordered]@{
    mcpServers = [ordered]@{
      "zeppos-knowledge" = [ordered]@{
        command = "node"
        args    = @(
          (Join-Path $server "node_modules\tsx\dist\cli.mjs"),
          (Join-Path $server "src\mcp\serve.ts")
        )
        env     = [ordered]@{ ZEPPOS_KB_ROOT = $server }
      }
    }
  }
  $config | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $full ".mcp.json") -Encoding utf8
}

Write-Host ""
Write-Host "isolated copy of $resolved at: $full"
Write-Host ""
Write-Host "present (what the agent may read):"
Get-ChildItem $full -Name | ForEach-Object { Write-Host "  $_" }
Write-Host ""

$mustBeAbsent = @("eval", ".git", ".cache", "src", "test", "node_modules")
# In the MCP arm a rendered page is a leak of the *channel*, not of the answers:
# an agent that can read `api/` will read it, and the run stops measuring what
# it was built to measure.
if ($Mcp) {
  $mustBeAbsent += @(
    "data", "api", "compatibility", "runtimes", "patterns", "examples",
    "manifest", "conflicts", "tools", "annotations", "site", "concepts",
    "README.md", "README.pt-BR.md"
  )
}

$leaked = $false
foreach ($leak in $mustBeAbsent) {
  if (Test-Path (Join-Path $full $leak)) {
    Write-Warning "LEAK: $leak is present in the copy"
    $leaked = $true
  }
}
if ($leaked) { exit 1 }

Write-Host "verified absent: $($mustBeAbsent -join ' ')"
Write-Host ""

if ($Mcp) {
  $manifest = Join-Path $server "data\manifest.json"
  $baseVersion = (Get-Content $manifest -Raw | ConvertFrom-Json).version

  Write-Host "server copy (not for the agent to read): $server"
  Write-Host "  eval/ removed, no .git - src/ is present because something has to run"
  Write-Host ""
  Write-Host "next: start a NEW session in $full, which holds only .mcp.json and"
  Write-Host "      skills/zepp-os-mcp. Confirm the server answered before giving"
  Write-Host "      the task: get_freshness must report version $baseVersion."
  Write-Host "      That version is what the report cites - neither copy has .git ($resolved)"
} else {
  Write-Host "next: start a new session in $full and give the agent the task text,"
  $manifest = Join-Path $full "data\manifest.json"
  if (Test-Path $manifest) {
    $baseVersion = (Get-Content $manifest -Raw | ConvertFrom-Json).version
    Write-Host "      the copy reports version $baseVersion in data/manifest.json,"
    Write-Host "      which is what the report cites - this copy has no .git ($resolved)"
  } else {
    Write-Host "      telling it the commit is $resolved"
  }
}
