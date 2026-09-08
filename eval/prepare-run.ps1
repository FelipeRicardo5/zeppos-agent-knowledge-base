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

param(
  [string]$Commit = "HEAD",
  [string]$Destination = "..\zeppos-kb-eval"
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

Write-Host ""
Write-Host "isolated copy of $resolved at: $full"
Write-Host ""
Write-Host "present (what the agent may read):"
Get-ChildItem $full -Name | ForEach-Object { Write-Host "  $_" }
Write-Host ""

$leaked = $false
foreach ($leak in @("eval", ".git", ".cache", "src", "test", "node_modules")) {
  if (Test-Path (Join-Path $full $leak)) {
    Write-Warning "LEAK: $leak is present in the copy"
    $leaked = $true
  }
}
if ($leaked) { exit 1 }

Write-Host "verified absent: eval/ .git/ .cache/ src/ test/ node_modules/"
Write-Host ""
Write-Host "next: start a new session in $full and give the agent the task text,"
Write-Host "      telling it the commit is $resolved"
