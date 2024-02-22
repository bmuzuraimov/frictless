<p align="center">
  <a href="https://www.frictless.com">
    <img alt="Frictless – AI Era Life Management" src="https://www.frictless.com/favicon.ico">
  </a>
</p>
<h1 align="center">Frictionless</h1>

<p align="center">
  AI Era Life Management
</p>

<p align="center">
  <a href="https://twitter.com/BMuzuraimov">
    <img src="https://img.shields.io/twitter/follow/BMuzuraimov?style=flat&label=BMuzuraimov&logo=twitter&color=0bf&logoColor=fff" alt="Baiel Muzuraimov Twitter follower count" />
  </a>
  <a href="https://github.com/bmuzuraimov/frictless">
    <img src="https://img.shields.io/github/stars/bmuzuraimov/frictless?label=bmuzuraimov%Frictless" alt="Frictless repo star count" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack & Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

Frictless is a task automation tool designed to manage life with priorities.

To get started:

```bash
git clone "https://github.com/bmuzuraimov/frictless"
```

Then, install the dependencies:

```bash
# Using npm
npm install

# Using Yarn
yarn install

# Using pnpm
pnpm install
```

## Tech Stack & Features

![Frictless Demo](https://www.frictless.com/assets/demo.gif)

### Frameworks

- [Vue.js](https://vuejs.org/) – A progressive JavaScript framework for building user interfaces.
- [Express.js](https://expressjs.com/) – Minimal and flexible Node.js web application framework.
- [Python](https://python.org/) – A powerful programming language that lets you work quickly and integrate systems more effectively.
- [MongoDB](https://www.mongodb.com/) – NoSQL database for modern applications.

### Platforms

- [Vercel](https://vercel.com/) – Deploy modern static websites with Netlify.
- [AWS Lambda](https://aws.amazon.com/lambda/) – Run code without thinking about servers or clusters.
- [AWS ECR](https://aws.amazon.com/ecr/) – Fully-managed Docker container registry.

### UI

- [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapidly building custom designs.
- [Vuetify](https://vuetifyjs.com/) – Material Design Component Framework for Vue.js.
- [Lucide](https://lucide.dev/) – Beautifully crafted open source icons.
- [`Google Fonts`](https://fonts.google.com/) – A library of free licensed font families.

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Adds static types to JavaScript for better code quality.
- [Prettier](https://prettier.io/) – An opinionated code formatter.
- [ESLint](https://eslint.org/) – The pluggable linting utility for JavaScript and JSX.
- [Jest](https://jestjs.io/) – Delightful JavaScript Testing.

# Project Setup Instructions

This guide covers setting up the frontend Vue.js application, the backend Express.js server, and the Python scheduler script for AWS Lambda deployment.

## Frontend Setup (Vue.js 3)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# Or, if you prefer using Yarn
yarn install

# Serve the application locally for development
npm run serve
# Or with Yarn
yarn serve

# Build the application for production
npm run build
# Or
yarn build
```

## Backend Setup (Express.js)

```bash
# Navigate to the backend directory
cd ../backend

# Install dependencies
npm install
# Or, if using Yarn
yarn install

# Start the Express.js server
npm start
# Or with Yarn
yarn start
```

## Scheduler Setup (Python for AWS Lambda)

```bash
# Navigate to the scheduler directory
cd ../scheduler

# It's recommended to use a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Note: To deploy your Python script to AWS Lambda, you'll typically package your application and dependencies into a ZIP file and upload it to AWS Lambda.
```

## General Notes

- Replace `npm` with `pnpm` in the commands if you're using `pnpm`.
- Ensure environment variables (.env files) are configured appropriately for both the Vue.js and Express.js applications.
- For the AWS Lambda Python script, make sure your script is properly configured to handle Lambda events and adjust your `requirements.txt` according to your script's dependencies.
- Ensure AWS CLI is configured on your machine for deploying the Lambda function using command line tools.

This README provides a basic overview. Depending on your project's specific needs, you may need to adjust commands, configurations, and deployment strategies.

## Author

- Baiel Muzuraimov ([@bmuzuraimov](https://twitter.com/BMuzuraimov))
