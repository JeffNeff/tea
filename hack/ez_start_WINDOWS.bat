@echo off

REM Replace 'your_executable_name' with the actual name of the executable file
set executable=windows.exe

REM Replace 'http://localhost:8081' with the URL you want to open in the browser
set url_to_open=http://localhost:8081

REM Function to execute the executable
call :execute_executable

REM Function to open the default web browser with the URL
call :open_browser
exit /b

:execute_executable
start "" "%executable%"
exit /b

:open_browser
timeout 3
start "" "%url_to_open%"
exit /b
