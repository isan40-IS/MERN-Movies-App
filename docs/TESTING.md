# Testing Documentation

## Overview

Testing is used as a CI quality gate. The project must pass backend tests, frontend tests, coverage thresholds, linting, formatting, and the frontend production build before it is considered ready for deployment.

## Backend Testing

Backend tests use:

- Jest as the test runner
- Supertest for HTTP API checks
- MongoDB Memory Server for isolated test databases
- Cobertura and LCOV coverage reports for CI artifacts

Command:

```bash
npm run test:backend:coverage
```

Coverage threshold:

```text
60% statements
60% branches
60% functions
60% lines
```

Covered backend scenarios:

- Health endpoint
- CORS allow/reject behavior
- Prometheus `/metrics` endpoint
- User registration, login, logout, profile, and admin user listing
- Admin authorization
- Genre CRUD
- Movie browsing and admin movie CRUD
- Movie reviews and admin comment deletion
- Image upload validation

Important files:

```text
backend/tests/health.test.js
backend/tests/auth.test.js
backend/tests/admin.test.js
backend/tests/genre.test.js
backend/tests/movie.test.js
backend/tests/review.test.js
backend/tests/upload.test.js
backend/tests/setup.js
backend/tests/testEnv.js
```

## Frontend Testing

Frontend tests use:

- Vitest as the test runner
- React Testing Library for component behavior
- V8 coverage provider
- Cobertura and LCOV coverage reports for CI artifacts

Command:

```bash
npm run test:frontend:coverage
```

Coverage threshold:

```text
60% statements
60% branches
60% functions
60% lines
```

Covered frontend scenarios:

- Route guards for private/admin pages
- Login and register form behavior
- Redux movie filter state
- RTK Query movie URL construction
- Movie search/filter UI behavior

Important files:

```text
frontend/src/__tests__/routeGuards.test.jsx
frontend/src/__tests__/authForms.test.jsx
frontend/src/__tests__/moviesSlice.test.js
frontend/src/__tests__/moviesApi.test.js
frontend/src/__tests__/allMovies.test.jsx
frontend/vite.config.js
```

## CI Integration

The CI workflow runs:

```bash
npm ci
npm ci --prefix frontend
npm run lint:backend
npm run lint:frontend
npm run format:check
npm run test:backend:coverage
npm run test:frontend:coverage
npm run build:frontend
```

Coverage artifacts uploaded by CI:

```text
coverage/lcov.info
coverage/cobertura-coverage.xml
frontend/coverage/lcov.info
frontend/coverage/cobertura-coverage.xml
```

## Test Failure Policy

If any lint, format, test, coverage, or build step fails, the code should not be deployed. The team must fix the failing check, push again, and wait for CI to pass.
