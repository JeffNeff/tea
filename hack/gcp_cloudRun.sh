#!/bin/bash

# Function to check if a command is available
function command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Google Cloud SDK is installed
if ! command_exists gcloud; then
  echo "Google Cloud SDK not found. Please install and configure the Google Cloud SDK (gcloud) from: https://cloud.google.com/sdk/docs/install"
  exit 1
fi

# Prompt the user to enter variables
read -p "Enter your Google Cloud project ID: " PROJECT_ID
read -p "Enter a name for your Cloud Run service: " SERVICE_NAME
read -p "Enter the region where you want to deploy the service (e.g., us-central1): " REGION
read -p "Enter the container image URL (e.g., gcr.io/mineonlium/tea): " IMAGE

# Authenticate with Google Cloud if not already logged in
if ! gcloud auth list | grep -q "^*"; then
  echo "Please authenticate with Google Cloud using: gcloud auth login"
  exit 1
fi

# Set the project for gcloud
gcloud config set project $PROJECT_ID

# Deploy the container image to Google Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --platform managed \
  --region $REGION
