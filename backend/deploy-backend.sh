#!/bin/bash
source .env.production.local

# Create a ZIP file of your application
echo "Creating ZIP file..."
zip -r $ZIP_FILE . -x "*.git*" -x "*.env*" -x "*deployer.sh*" -x "*README.md*" -x "*LICENSE*" >> /dev/null

# Deploy to Elastic Beanstalk
echo "Uploading to Elastic Beanstalk S3 bucket..."
aws s3 cp $ZIP_FILE s3://$EB_BUCKET/$ZIP_FILE --region $REGION

# Update environmental variables
echo "Updating environmental variables..."
aws lambda update-function-configuration --function-name $LAMBDA_FUNCTION_NAME --environment "Variables={
    TOKEN_SECRET=$TOKEN_SECRET,\
    REDIS_HOST=$REDIS_HOST,\
    REDIS_PORT=$REDIS_PORT,\
    REDIS_PASSWORD=$REDIS_PASSWORD,\
    MONGODB_URI=$MONGODB_URI,\
    MONGODB_NAME=$MONGODB_NAME,\
    AWS_REGION=$AWS_REGION,\
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID,\
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY,\
    CIPHER_IV=$CIPHER_IV,\
    CIPHER_KEY=$CIPHER_KEY,\
    SNS_SCHEDULE_TOPIC_ARN=$SNS_SCHEDULE_TOPIC_ARN,\
    RESEND_API=$RESEND_API,\
    SENDER_EMAIL=$SENDER_EMAIL,\
    FRONTEND_URL=$FRONTEND_URL,\
    NOTION_CLIENT_ID=$NOTION_CLIENT_ID,\
    NOTION_CLIENT_SECRET=$NOTION_CLIENT_SECRET,\
    }" --region $REGION >> /dev/null

# Update Lambda Function
echo "Updating Lambda Function..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --s3-bucket $EB_BUCKET --s3-key $ZIP_FILE --region $REGION >> /dev/null

rm $ZIP_FILE

echo "Deployment complete."
