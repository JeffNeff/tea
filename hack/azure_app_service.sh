#!/bin/bash

# Function to check if a command is available
function command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Azure CLI is installed
if ! command_exists az; then
  echo "Azure CLI not found. Please install and configure the Azure CLI from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
  exit 1
fi

# Prompt the user to enter variables
read -p "Enter your Azure subscription ID: " SUBSCRIPTION_ID
read -p "Enter the name for your resource group: " RESOURCE_GROUP_NAME
read -p "Enter the name for your App Service plan: " APP_SERVICE_PLAN_NAME
read -p "Enter the name for your App Service: " APP_SERVICE_NAME
read -p "Enter the container image URL (e.g., your-docker-repo/tea): " CONTAINER_IMAGE

# Log in to Azure with Azure CLI
az login

# Set the default Azure subscription
az account set --subscription $SUBSCRIPTION_ID

# Create a resource group
az group create --name $RESOURCE_GROUP_NAME --location eastus

# Create an App Service plan
az appservice plan create --name $APP_SERVICE_PLAN_NAME --resource-group $RESOURCE_GROUP_NAME --sku B1 --is-linux

# Create the Web App with a Docker container
az webapp create --name $APP_SERVICE_NAME --plan $APP_SERVICE_PLAN_NAME --resource-group $RESOURCE_GROUP_NAME --deployment-container-image-name $CONTAINER_IMAGE
