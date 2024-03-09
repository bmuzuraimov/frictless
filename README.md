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
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#usage"><strong>Usage</strong></a> ·
  <a href="#checklist"><strong>Checklist</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

Frictless is a task automation tool designed to manage life with priorities.

### Frontend structure
```bash
./frontend
```bash
├── README.md
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── ... (image files)
├── src
│   ├── App.vue
│   ├── assets
│   │   └── ... (image files)
│   ├── components
│   │   ├── common
│   │   │   └── home
│   │   │       ├── BannerComponent.vue
│   │   │       ├── CTALeftComponent.vue
│   │   │       ├── CTARightComponent.vue
│   │   │       ├── FAQComponent.vue
│   │   │       ├── FeatureComponent.vue
│   │   │       ├── FooterComponent.vue
│   │   │       ├── HeroComponent.vue
│   │   │       ├── NavbarComponent.vue
│   │   │       ├── PricingComponent.vue
│   │   │       ├── StatsComponent.vue
│   │   │       ├── TestimonialsComponent.vue
│   │   │       ├── TimeCalculatorComponent.vue
│   │   │       └── WaitlistComponent.vue
│   │   ├── notion
│   │   │   └── SchedulerBtnComponent.vue
│   │   └── user
│   │       ├── NavbarComponent.vue
│   │       ├── SchedulerBtnComponent.vue
│   │       ├── SidebarComponent.vue
│   │       ├── agenda
│   │       ├── onboarding
│   │       │   ├── CalendarBtnComponent.vue
│   │       │   ├── IOSConnectComponent.vue
│   │       │   └── NotionBtnComponent.vue
│   │       └── overview
│   ├── index.css
│   ├── main.ts
│   ├── router
│   │   ├── common.ts
│   │   ├── index.ts
│   │   ├── notion.ts
│   │   └── user.ts
│   ├── services
│   │   ├── authService.ts
│   │   ├── commonService.ts
│   │   ├── notionService.ts
│   │   └── userService.ts
│   ├── stores
│   │   ├── buttonStore.ts
│   │   ├── common
│   │   │   └── authStore.ts
│   │   ├── notion
│   │   │   └── useNotionStore.ts
│   │   ├── user
│   │   │   ├── appleCalendar.ts
│   │   │   ├── calendarStore.ts
│   │   │   └── schedulerStore.ts
│   │   └── user.ts
│   ├── types
│   │   ├── env.d.ts
│   │   ├── shims-vue.d.ts
│   │   ├── tokenVerificationCache.d.ts
│   │   ├── userDecoded.d.ts
│   │   └── vue-jwt-decode.d.ts
│   ├── utils
│   │   └── api.ts
│   └── views
│       ├── common
│       │   ├── 404View.vue
│       │   ├── ConfirmCodeView.vue
│       │   ├── GuideView.vue
│       │   ├── HomeView.vue
│       │   ├── LoginView.vue
│       │   ├── MissionView.vue
│       │   ├── PrivacyView.vue
│       │   ├── StoryView.vue
│       │   ├── TermsView.vue
│       │   └── UnauthorizedView.vue
│       ├── layout
│       │   └── UserLayout.vue
│       ├── notion
│       │   └── NotionSchedulerView.vue
│       └── user
│           ├── AgendaView.vue
│           ├── NotionCallbackView.vue
│           ├── OnboardingView.vue
│           ├── OverviewView.vue
│           ├── ProfileView.vue
│           └── SettingsView.vue
├── tailwind.config.js
└── tsconfig.json
```

### Backend structure
```bash
./backend
├── README.md
├── __tests__
│   ├── ... (test files)
├── app.js
├── bin
│   └── www
├── config
│   ├── awsclient.js
│   ├── emailclient.js
│   ├── mongodb.js
│   └── redisdb.js
├── constants
│   └── notion_db_names.js
├── index.js
├── models
│   └── User.js
├── node_modules (omitted)
├── package-lock.json
├── package.json
├── routes
│   ├── authRoutes.js
│   ├── calendarRoutes.js
│   ├── index.js
│   ├── notionRoutes.js
│   └── userRoutes.js
├── scripts
│   ├── deploy-apigateway.sh
│   ├── deploy-backend.sh
│   └── expressjs_apigateway_template.json
└── utils
    ├── cipherman.js
    ├── error_handler.js
    ├── guard.js
    ├── handle_confirmation.js
    ├── mailman.js
    └── validations
        ├── authValidations.js
        ├── calendarValidations.js
        ├── index.js
        ├── notionValidations.js
        └── userValidations.js
```

### Scheduler structure
```bash
./scheduler
├── Dockerfile
├── README.md
├── app
│   ├── adapters
│   │   ├── __init__.py
│   │   ├── caldav_adapter.py
│   │   └── mongodb_adapter.py
│   ├── core
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── database_factory.py
│   │   ├── mongo_db.py
│   │   └── strategy.py
│   ├── notion_dbs
│   │   ├── __init__.py
│   │   ├── courses_database.py
│   │   ├── job_tasks_database.py
│   │   ├── jobs_database.py
│   │   ├── lecture_notes_database.py
│   │   ├── personal_database.py
│   │   ├── priorities_database.py
│   │   ├── recurring_database.py
│   │   ├── routine_database.py
│   │   ├── schedule_database.py
│   │   ├── sports_database.py
│   │   └── todo_database.py
│   ├── strategies
│   │   ├── __init__.py
│   │   ├── priority_strategy.py
│   └── utils
│   │   ├── __init__.py
│   │   └── scheduling.py
├── lambda_function.py
├── lambda_runner.py
├── logs
│   └── errors.log
├── requirements.txt
├── scheduler-local.sh
├── tests
│   ├── __init__.py
│   ├── ... (test files)
└── venv (omitted)
```

## Features

- [Notion Dashboard Management](https://www.frictless.com/features/analytics)
- [Apple calendar link](https://www.frictless.com/features/branded-links)
- [Personalization](https://www.frictless.com/features/personalization)

## Tech Stack

### Frameworks

- [Vue.js](https://vuejs.org/) – A progressive JavaScript framework for building user interfaces.
- [Express.js](https://expressjs.com/) – Minimal and flexible Node.js web application framework.
- [Python](https://python.org/) – A powerful programming language that lets you work quickly and integrate systems more effectively.
- [MongoDB](https://www.mongodb.com/) – NoSQL database for modern applications.

### Platforms

- [Vercel](https://vercel.com/) – Deploy modern static websites with Netlify.
- [Notion OAuth 2.0](https://developers.notion.com/docs/authorization) – Official Notion API for developers.
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

## Usage

This guide covers setting up the frontend Vue.js application, the backend Express.js server, and the Python scheduler script.

Clone the repository:

```bash
git clone git@github.com:bmuzuraimov/frictless.git
```

### Frontend Setup (Vue.js 3)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Serve the application locally for development
npm run serve

# Build the application for production
npm run build
```

### Backend Setup (Express.js)

```bash
# Navigate to the backend directory
cd ../backend

# Install dependencies
npm install

# Start the Express.js server
npm start
```

### Scheduler Setup (Python for AWS Lambda)

```bash
# Navigate to the scheduler directory
cd ../scheduler

# It's recommended to use a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

python3 ./lambda_runner.py
```

## Checklist

- [ ] Rename `.env.example` to `.env` and configure the environment variables for both the Vue.js application.

```bash
VITE_BASE_URL=
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_CLIENT_SECRET=
VITE_NOTION_REDIRECT_URI=
VITE_NOTION_TEMPLATE_URL=
VITE_BACKEND_URL=
```

- [ ] Rename `.env.example` to `.env` and configure the environment variables for the Express.js application.

```bash
TOKEN_SECRET=
PORT=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
MONGODB_URI=
MONGODB_NAME=
LAMBDA_SCHEDULE_URL=
SENDER_EMAIL=
FRONTEND_URL=
NOTION_CLIENT_ID=
NOTION_CLIENT_SECRET=
CIPHER_IV=
CIPHER_KEY=
SNS_SCHEDULE_TOPIC_ARN=
RESEND_API=
EXPRESS_AWS_REGION=
EXPRESS_AWS_ACCESS_KEY_ID=
EXPRESS_AWS_SECRET_ACCESS_KEY=
ZIP_FILE=
EB_BUCKET=
LAMBDA_FUNCTION_NAME=
REGION=
```

- [ ] Rename `.env.example` to `.env` and configure the environment variables for the Python scheduler script.

```bash
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_DBNAME=
MONGODB_CLUSTERNAME=
DEFAULT_TASK_DURATION=
BREAK_TIME=
CLIENT_ID=
CLIENT_SECRET=
AUTH_URL=
TEST_MODE=
```

## General Notes

- Replace `npm` with `pnpm` in the commands if you're using `pnpm`.
- Ensure environment variables (.env files) are configured appropriately for both the Vue.js and Express.js applications.
- For the AWS Lambda Python script, make sure your script is properly configured to handle Lambda events and adjust your `requirements.txt` according to your script's dependencies.
- Ensure AWS CLI is configured on your machine for deploying the Lambda function using command line tools.

This README provides a basic overview. Depending on your project's specific needs, you may need to adjust commands, configurations, and deployment strategies.

## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/bmuzuraimov/frictless/issues) if you believe you've encountered a bug.
- Follow the [local development guide](hhttps://github.com/bmuzuraimov/frictless#usage) to get your local dev environment set up.
- Make a [pull request](https://github.com/bmuzuraimov/frictless/pulls) to add new features/make quality-of-life improvements/fix bugs.

## Author

- Baiel Muzuraimov ([@bmuzuraimov](https://twitter.com/BMuzuraimov))
