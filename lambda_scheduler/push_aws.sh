#!/bin/bash

source .env.aws

# Corrected AWS ECR URI
AWS_ECR_URI="$SH_ACCOUNT_ID.dkr.ecr.$SH_REGION.amazonaws.com/$SH_ECR_NAME"

# Step 1: Build the Docker image
sudo docker build --platform linux/amd64 -t $SH_IMAGE_NAME:$SH_LOCAL_TAG .

# Step 2: Tag the Docker image
sudo docker tag $SH_IMAGE_NAME:$SH_LOCAL_TAG $AWS_ECR_URI:$SH_AWS_TAG

# Step 3: Sign in to Amazon ECR
aws ecr get-login-password --region $SH_REGION | docker login --username AWS --password-stdin $AWS_ECR_URI

# Check if $AWS_ECR_URI exists, if not create it
aws ecr describe-repositories --repository-names $SH_ECR_NAME > /dev/null 2>&1 || \
aws ecr create-repository --repository-name $SH_ECR_NAME --region $SH_REGION --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE

# Step 4: Push the Docker image to ECR
sudo docker push $AWS_ECR_URI:$SH_AWS_TAG

# Step 5: Deploy the Docker image to AWS Lambda
aws lambda update-function-code --function-name $SH_LAMBDA_NAME --image-uri $AWS_ECR_URI:$SH_AWS_TAG --region $SH_REGION > /dev/null 2>&1

# Step 6: Clean up
sudo docker rmi $SH_IMAGE_NAME:$SH_LOCAL_TAG
sudo docker rmi $AWS_ECR_URI:$SH_AWS_TAG

echo "Docker image redeployed successfully."
