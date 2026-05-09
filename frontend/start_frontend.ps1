# start_frontend.ps1
# PowerShell script to install dependencies and start the React frontend
Set-Location -Path "d:/Rubbertrackwholesale/frontend"

Write-Host "Installing frontend dependencies..."
# Ensure yarn is installed; install if missing
if (-not (Get-Command yarn -ErrorAction SilentlyContinue)) {
    Write-Host "Yarn not found. Installing via npm..."
    npm install -g yarn
}

yarn install

Write-Host "Starting frontend development server..."
yarn start
