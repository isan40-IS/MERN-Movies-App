# Production Deployment Evidence

## Deployment Status

Production is deployed on Azure App Service and verified by the `Production Status` GitHub Actions workflow.

Verified on: June 18, 2026

## Azure Resources

- Resource group: `rg-mern-movies-production`
- App Service plan: `plan-mernmovies-prod-81448`
- Backend Web App: `mernmovies-api-node-81448`
- Frontend Web App: `mernmovies-web-node-81448`
- Runtime: `NODE|22-lts`
- HTTPS-only: enabled

## Production URLs

- Frontend: `https://mernmovies-web-node-81448.azurewebsites.net`
- Backend: `https://mernmovies-api-node-81448.azurewebsites.net`
- Health: `https://mernmovies-api-node-81448.azurewebsites.net/api/v1/health`
- Movies API: `https://mernmovies-api-node-81448.azurewebsites.net/api/v1/movies/all-movies`
- Metrics: `https://mernmovies-api-node-81448.azurewebsites.net/metrics`

## Verification Results

The live environment has been verified for:

- Backend health endpoint returns `200 OK`.
- Movies API endpoint returns `200 OK` and movie data.
- Frontend endpoint returns `200 OK`.
- Metrics endpoint returns Prometheus-compatible text.
- Backend allows the production frontend origin with credentials through CORS.
- Production Status workflow passes on GitHub Actions.

## Deployment Method

The production path uses:

- Azure App Service Linux runtime
- Node.js runtime
- GitHub Actions `workflow_run` after successful CI on `main`
- Publish profile based deployment
- Backend and frontend deployment packages
- Post-deployment backend health smoke check

The repository also keeps Docker and Docker Compose support for local/staging container evidence, but the final production deployment path is Azure App Service package deployment.

## Commands For Manual Smoke Checks

```bash
curl -f https://mernmovies-api-node-81448.azurewebsites.net/api/v1/health
curl -f https://mernmovies-api-node-81448.azurewebsites.net/api/v1/movies/all-movies
curl -f https://mernmovies-web-node-81448.azurewebsites.net
curl -f https://mernmovies-api-node-81448.azurewebsites.net/metrics
```
