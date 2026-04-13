<#
File: readme/Clone_ArtisAuc.ps1
Purpose:
  Backup the ArtisAuc workspace to a new location, excluding heavy dependencies
  (node_modules), caches, logs, and large artifacts.

Quick Start:
  1) Open PowerShell
  2) Run: & "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1"

Usage Examples:
  # Dry run (list only)
  & "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1" -WhatIf

  # Default backup to G:\ArtisAuc_Backup
  & "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1"

  # Custom destination and threads
  & "F:\ArtisAuc\readme\Clone_ArtisAuc.ps1" -Destination "D:\Backups\ArtisAuc" -Threads 8

Exit Codes:
  0 = No files copied (already up to date)
  1 = Success (files copied)
  2+ = Errors occurred
#>

param(
    [string]$Source      = "F:\ArtisAuc",
    [string]$Destination = "G:\ArtisAuc_Backup",
    [switch]$WhatIf,
    [int]$Threads = 16,
    [string]$LogPath
)

if (-not (Test-Path -LiteralPath $Source)) {
    throw "Source path not found: $Source"
}

if (-not (Test-Path -LiteralPath $Destination)) {
    New-Item -Path $Destination -ItemType Directory -Force | Out-Null
}

$excludeDirs = @(
    ".git",
    ".pnpm-store",
    "node_modules",
    "__pycache__",
    ".next",
    "dist",
    "build",
    ".cache",
    ".parcel-cache",
    ".vite",
    "coverage",
    "logs",
    "uploads",
    "imports",
    "sessions",
    "chats"
)

$excludeFiles = @(
    "*.log",
    "*.tmp",
    "*.zip",
    "*.tar",
    "*.tar.gz",
    "*.7z",
    "*.mp3",
    "*.wav",
    "*.ogg",
    "*.webm",
    "*.bin",
    "Thumbs.db",
    ".DS_Store"
)

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
if ([string]::IsNullOrWhiteSpace($LogPath)) {
    $logName = "ArtisAucClone_$timestamp.log"
    $LogPath = Join-Path ([IO.Path]::GetTempPath()) $logName
}

$args = @(
    $Source,
    $Destination,
    "/E",
    "/R:2",
    "/W:2",
    "/COPY:DAT",
    "/NFL", "/NDL", "/NP",
    "/FFT",
    "/MT:$Threads",
    "/LOG:$LogPath"
)

if ($excludeDirs.Count -gt 0) {
    $args += "/XD"
    $args += $excludeDirs
}

if ($excludeFiles.Count -gt 0) {
    $args += "/XF"
    $args += $excludeFiles
}

if ($WhatIf) {
    $args += "/L"
    Write-Host ">>> WHATIF mode — no files will be copied."
} else {
    $args += "/TEE"
}

Write-Host "=== Cloning ArtisAuc workspace ==="
Write-Host "Source:      $Source"
Write-Host "Destination: $Destination"
Write-Host "Excluding:   $($excludeDirs.Count) directories, $($excludeFiles.Count) file patterns"
Write-Host "Log file:    $LogPath"
Write-Host "----------------------------------------------"

$result = robocopy @args
$exitCode = $LASTEXITCODE

Write-Host "----------------------------------------------"
Write-Host "Robocopy exit code: $exitCode"
if ($exitCode -ge 8) {
    Write-Warning "Robocopy reported errors (code $exitCode). Review output above for details."
    Write-Warning "Full log captured at: $LogPath"
} else {
    Write-Host "Clone completed with exit code $exitCode."
    Write-Host "Log file: $LogPath"
}

exit $exitCode
