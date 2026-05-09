## start_backend.ps1
# PowerShell script to (re)install bcrypt and launch the FastAPI backend
# ---------------------------------------------------------------
# 1. Ensure we are in the backend folder
Set-Location -Path "d:/Rubbertrackwholesale/backend"

# 2. Uninstall any existing bcrypt version
Write-Host "Uninstalling existing bcrypt..."
C:\\Users\\bosco\\AppData\\Local\\Programs\\Python\\Python312\\python.exe -m pip uninstall -y bcrypt

# 3. Install the compatible bcrypt version (3.2.2)
Write-Host "Installing bcrypt==3.2.2..."
C:\\Users\\bosco\\AppData\\Local\\Programs\\Python\\Python312\\python.exe -m pip install bcrypt==3.2.2

# 4. Start the FastAPI server (uvicorn)
Write-Host "Starting FastAPI server..."
C:\\Users\\bosco\\AppData\\Local\\Programs\\Python\\Python312\\python.exe -m uvicorn server:app --reload --host 0.0.0.0 --port 8001

Write-Host "Backend process exited."
pause
