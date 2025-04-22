@echo off
cd /d %~dp0

IF EXIST file.js (
    node file.js
    exit /b 1
)