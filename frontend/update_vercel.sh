#!/bin/bash

source .env.production.local

echo "Setting env variables to vercel..."
vercel env add APP_ENV $APP_ENV --prod
vercel env add VITE_BASE_URL $VITE_BASE_URL --prod
vercel env add VITE_AUTH0_DOMAIN $VITE_AUTH0_DOMAIN --prod
vercel env add VITE_AUTH0_CLIENT_ID $VITE_AUTH0_CLIENT_ID --prod
vercel env add VITE_AUTH0_CLIENT_SECRET $VITE_AUTH0_CLIENT_SECRET --prod
vercel env add VITE_NOTION_REDIRECT_URI $VITE_NOTION_REDIRECT_URI --prod
vercel env add VITE_BACKEND_URL $VITE_BACKEND_URL --prod

echo "Deploying to vercel..."
vercel --prod
