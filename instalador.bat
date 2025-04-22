@echo off
cd /d %~dp0
setlocal enabledelayedexpansion

:: Verificar si Node.js está instalado
where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js no está instalado.
    echo descargalo desde su sitio oficial.
    start "" "https://nodejs.org/es"
    pause
    exit /b
)
for /f "tokens=* usebackq" %%v in (`node -v`) do set "NODE_VERSION=%%v"
echo Node.js encontrado: %NODE_VERSION%

:: Quitar la "v" del inicio de la versión
set "NODE_VERSION_NUM=%NODE_VERSION:~1%"

:: Verificar si es >= 20.17.0
call :compare_versions "%NODE_VERSION_NUM%" "20.17.0"
IF %ERRORLEVEL% NEQ 0 (
    echo Se requiere Node.js v20.17.0 o superior.
    echo Considere actualizar
    start "" "https://nodejs.org/es"
    pause
    exit /b
)

:: Verificar si npm está instalado
where npm >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo npm no está instalado.
    echo Instalando...
    npm install -g npm
    pause
    exit /b
)
for /f "tokens=* usebackq" %%v in (`npm -v`) do set "NPM_VERSION=%%v"
echo npm encontrado: %NPM_VERSION%

:: Verificar si es >= 11.2.0
call :compare_versions "%NPM_VERSION%" "11.2.0"
IF %ERRORLEVEL% NEQ 0 (
    echo Se requiere npm v11.2.0 o superior.
    echo Actualizando...
    npm install -g npm
    pause
    exit /b
)

call npm install

pause


:: ========================
:: Función para comparar versiones
:compare_versions
:: Parámetro 1: versión actual
:: Parámetro 2: versión mínima
setlocal
set "v1=%~1"
set "v2=%~2"

for /f "tokens=1-3 delims=." %%a in ("%v1%") do (
    set "v1_1=%%a"
    set "v1_2=%%b"
    set "v1_3=%%c"
)
for /f "tokens=1-3 delims=." %%a in ("%v2%") do (
    set "v2_1=%%a"
    set "v2_2=%%b"
    set "v2_3=%%c"
)

if !v1_1! LSS !v2_1! exit /b 1
if !v1_1! GTR !v2_1! exit /b 0

if !v1_2! LSS !v2_2! exit /b 1
if !v1_2! GTR !v2_2! exit /b 0

if !v1_3! LSS !v2_3! exit /b 1
if !v1_3! GEQ !v2_3! exit /b 0

exit /b 1