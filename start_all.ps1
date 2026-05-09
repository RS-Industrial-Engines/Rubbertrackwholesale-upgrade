# start_all.ps1
# PowerShell script to launch both backend and frontend development servers concurrently

$projectRoot = "d:/Rubbertrackwholesale"
Set-Location -Path $projectRoot

# Paths to the individual start scripts
$backendScript = Join-Path $projectRoot "backend\\start_backend.ps1"
$frontendScript = Join-Path $projectRoot "frontend\\start_frontend.ps1"

# Start Backend in a new PowerShell window
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$backendScript`"" -WorkingDirectory (Join-Path $projectRoot "backend") -WindowStyle Normal
Write-Host "Backend server started in a new window."

# Start Frontend in a new PowerShell window
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$frontendScript`"" -WorkingDirectory (Join-Path $projectRoot "frontend") -WindowStyle Normal
Write-Host "Frontend development server started in a new window."

# End of script
