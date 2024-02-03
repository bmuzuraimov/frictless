#!/bin/bash

IMAGE_NAME="acuella"
LOCAL_TAG=$(date +%Y-%m-%d-%H-%M-%S)
CONTAINER_NAME="acuella_app"

# Step 1: Build the Docker image if doesn't exist, otherwise overwrite it
sudo docker build --platform linux/amd64 -t $IMAGE_NAME:$LOCAL_TAG .

# Step 2: Run the Docker container
sudo docker run --rm -d --name $CONTAINER_NAME --platform linux/amd64 -p 9000:8080 $IMAGE_NAME:$LOCAL_TAG
