# Final Presentation Demo Script

## Goal

Show that the MERN Movies App is managed through a working DevOps lifecycle: code changes are checked by CI, deployable through CD, verified in production, and observable through health and metrics endpoints.

## 10-Minute Flow

### 1. Introduce The Project

Say:

> We selected the DevOps track. We forked an existing MERN movie app and added a complete delivery pipeline around it. The application is the demo product, but the main final-project output is the automated CI/CD workflow.

Show:

- `README.md`
- Pipeline diagram
- Production frontend URL

### 2. Show The Live App

Open:

- `https://mernmovies-web-node-81448.azurewebsites.net`

Show:

- Movie list loads
- Search/filter if the UI is available
- Login/admin only if credentials are ready

Explain:

> This frontend is deployed on Azure App Service and calls the backend API.

### 3. Show Production Backend Checks

Open:

- `https://mernmovies-api-node-81448.azurewebsites.net/api/v1/health`
- `https://mernmovies-api-node-81448.azurewebsites.net/api/v1/movies/all-movies`
- `https://mernmovies-api-node-81448.azurewebsites.net/metrics`

Explain:

> The health endpoint is used for smoke testing. The movies endpoint proves the API and database are working. The metrics endpoint exposes Prometheus-compatible monitoring data.

### 4. Show CI Pipeline

Open GitHub Actions:

- `CI Pipeline`

Show that CI runs:

- Install dependencies
- Backend lint
- Frontend lint
- Format check
- Backend tests with coverage
- Frontend tests with coverage
- Frontend production build
- Coverage artifact upload

Say:

> CI protects the project from broken changes. If a developer pushes code that breaks tests, formatting, or the build, CI fails and the team must fix the code before treating it as stable.

### 5. Show CD Pipeline

Open GitHub Actions:

- `CD Pipeline`

Show:

- Trigger source: successful `CI Pipeline` run on `main`
- Staging Docker/ACR path
- Production Azure App Service deploy path
- Production health smoke test

Say:

> Deployment is not just a copy step. The CD workflow runs only after CI passes on main, deploys staging first, then deploys production and runs a health smoke check.

### 6. Show Production Status Workflow

Open GitHub Actions:

- `Production Status`

Show:

- Backend health check
- Movies API check
- Frontend check

Say:

> This workflow verifies that production is alive after changes reach main.

### 7. Explain A Real Problem The Team Fixed

Say:

> During hardening, a monitoring change accidentally broke backend tests by removing or weakening CORS and metrics behavior. CI caught the issue. We restored `/metrics`, fixed CORS, and added tests so local and production frontend origins are both covered.

Show:

- `backend/app.js`
- `backend/tests/health.test.js`

### 8. Close With The DevOps Lesson

Say:

> The main value of this project is automation. A developer can push a change, GitHub Actions validates the code, CD can deploy it, production smoke checks verify it, and metrics give visibility into the running backend.

## Backup Commands

Use these if internet/GitHub demo is slow:

```bash
npm run lint
npm run format:check
npm run test:backend:coverage
npm run test:frontend:coverage
npm run build:frontend
```

Use these if Docker Desktop is running:

```bash
npm run compose:up
npm run compose:down
```

## Demo Checklist

- GitHub `main` has latest green CI.
- Production Status workflow is green.
- Production frontend opens.
- Backend health returns `200`.
- Movies API returns data.
- `/metrics` returns Prometheus text.
- Team members know which part they will explain.
