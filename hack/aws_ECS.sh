#!/bin/bash

# Before running the script, make sure you have the AWS CLI installed and configured with the necessary IAM user credentials. 
# The script will prompt you to enter your AWS IAM user Access Key ID and Secret Access Key. It will also ask for the ECS cluster name, 
# ECS service name, and the container image URL that you want to deploy to ECS. The script will then create or update the ECS cluster, 
# register the task definition with the specified container image, and update the ECS service to use the new task definition.

# Please note that this script assumes you have the required IAM permissions to perform these AWS ECS operations. Additionally, 
# the script uses jq to parse the JSON output from AWS CLI. If you don't have jq installed, you can install it using your 
# package manager or download it from https://stedolan.github.io/jq/.

# Function to check if a command is available
function command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if AWS CLI is installed
if ! command_exists aws; then
  echo "AWS CLI not found. Please install and configure the AWS CLI from: https://aws.amazon.com/cli/"
  exit 1
fi

# Prompt the user to enter variables
read -p "Enter your AWS IAM user Access Key ID: " AWS_ACCESS_KEY_ID
read -p "Enter your AWS IAM user Secret Access Key: " AWS_SECRET_ACCESS_KEY
read -p "Enter the name for your ECS cluster: " ECS_CLUSTER_NAME
read -p "Enter the name for your ECS service: " ECS_SERVICE_NAME
read -p "Enter the container image URL (e.g., your-docker-repo/tea): " CONTAINER_IMAGE

# Configure AWS CLI with user credentials
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"

# Create or update the ECS cluster
aws ecs create-cluster --cluster-name $ECS_CLUSTER_NAME

# Register the task definition
TASK_DEFINITION=$(aws ecs register-task-definition --cli-input-json '{
  "family": "'$ECS_SERVICE_NAME'",
  "containerDefinitions": [
    {
      "name": "'$ECS_SERVICE_NAME'",
      "image": "'$CONTAINER_IMAGE'",
      "cpu": 256,
      "memory": 512,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ]
    }
  ]
}')

# Extract the revision number from the task definition output
REVISION=$(echo $TASK_DEFINITION | jq -r '.taskDefinition.revision')

# Update the ECS service with the new task definition
aws ecs update-service --cluster $ECS_CLUSTER_NAME --service $ECS_SERVICE_NAME --task-definition $ECS_SERVICE_NAME:$REVISION
