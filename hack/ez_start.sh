#!/bin/bash

# Replace 'your_executable_name' with the actual name of the executable file
executable="linux" # Replace with the correct executable for each platform
url_to_open="http://localhost:8081"

# Function to execute the executable based on the platform
execute_executable() {
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    ./"$executable"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    ./"$executable"
  else
    ./"$executable.exe"
  fi
}

# Call the function to execute the executable
execute_executable &

# Function to open the default web browser with the URL
open_browser() {
  sleep 3 # Wait for 3 seconds to allow the server to start
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    xdg-open "$url_to_open"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "$url_to_open"
  else
    start "$url_to_open"
  fi
}

# Call the function to open the browser
open_browser
