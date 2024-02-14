#!/bin/bash
source .env.production.local

# Function to check the status of the last executed command
check_status() {
  if [ $? -ne 0 ]; then
    echo "Error occurred, stopping the script."
    exit 1
  fi
}

# Create a ZIP file of your application
echo "Creating ZIP file..."
zip -r $ZIP_FILE . -x "*.git*" -x "*.env*" -x "*deployer.sh*" -x "*README.md*" -x "*LICENSE*" 2>&1 > /dev/null
check_status

# Deploy to Elastic Beanstalk S3 bucket
echo "Uploading to Elastic Beanstalk S3 bucket..."
aws s3 cp $ZIP_FILE s3://$EB_BUCKET/$ZIP_FILE --region $REGION > deploy-backend-output.log 2>&1
check_status

# Update environmental variables
echo "Updating environmental variables..."
aws lambda update-function-configuration --function-name $LAMBDA_FUNCTION_NAME --environment "Variables={
    TOKEN_SECRET=$TOKEN_SECRET,\
    REDIS_HOST=$REDIS_HOST,\
    REDIS_PORT=$REDIS_PORT,\
    REDIS_PASSWORD=$REDIS_PASSWORD,\
    MONGODB_URI=$MONGODB_URI,\
    MONGODB_NAME=$MONGODB_NAME,\
    EXPRESS_AWS_REGION=$EXPRESS_AWS_REGION,\
    EXPRESS_AWS_ACCESS_KEY_ID=$EXPRESS_AWS_ACCESS_KEY_ID,\
    EXPRESS_AWS_SECRET_ACCESS_KEY=$EXPRESS_AWS_SECRET_ACCESS_KEY,\
    CIPHER_IV=$CIPHER_IV,\
    CIPHER_KEY=$CIPHER_KEY,\
    SNS_SCHEDULE_TOPIC_ARN=$SNS_SCHEDULE_TOPIC_ARN,\
    RESEND_API=$RESEND_API,\
    SENDER_EMAIL=$SENDER_EMAIL,\
    FRONTEND_URL=$FRONTEND_URL,\
    NOTION_CLIENT_ID=$NOTION_CLIENT_ID,\
    NOTION_CLIENT_SECRET=$NOTION_CLIENT_SECRET,\
    }" --region $REGION >> deploy-backend-output.log 2>&1
check_status

# Update Lambda Function
echo "Updating Lambda Function..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --s3-bucket $EB_BUCKET --s3-key $ZIP_FILE --region $REGION >> deploy-backend-output.log 2>&1
check_status

# Cleanup
rm $ZIP_FILE
rm deploy-backend-output.log
echo "Deployment complete."
