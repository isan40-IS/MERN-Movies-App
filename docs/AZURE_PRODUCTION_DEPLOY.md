# Azure Production Deploy

This project deploys production as two Azure App Service Linux container apps:

- Backend API container from `mern-movies-backend`
- Frontend React container from `mern-movies-frontend`

Images are built and pushed to Azure Container Registry by `.github/workflows/cd.yml`.

## 1. Create Azure Resources

```powershell
az login
az account set --subscription "<SUBSCRIPTION_ID_OR_NAME>"

$suffix = Get-Random -Minimum 10000 -Maximum 99999
$rg = "rg-mernmovies-prod-$suffix"
$acr = "mernmoviesacr$suffix"
$plan = "plan-mernmovies-prod-$suffix"
$backend = "mernmovies-api-prod-$suffix"
$frontend = "mernmovies-web-prod-$suffix"
$location = "southeastasia"

az group create --name $rg --location $location
az acr create --resource-group $rg --name $acr --sku Basic --admin-enabled false
az appservice plan create --resource-group $rg --name $plan --is-linux --sku B1
az webapp create --resource-group $rg --plan $plan --name $backend --deployment-container-image-name "nginx:latest"
az webapp create --resource-group $rg --plan $plan --name $frontend --deployment-container-image-name "nginx:latest"
```

## 2. Allow App Service to Pull From ACR

```powershell
$acrId = az acr show --resource-group $rg --name $acr --query id -o tsv

az webapp identity assign --resource-group $rg --name $backend
az webapp identity assign --resource-group $rg --name $frontend

$backendPrincipal = az webapp identity show --resource-group $rg --name $backend --query principalId -o tsv
$frontendPrincipal = az webapp identity show --resource-group $rg --name $frontend --query principalId -o tsv

az role assignment create --assignee $backendPrincipal --scope $acrId --role AcrPull
az role assignment create --assignee $frontendPrincipal --scope $acrId --role AcrPull
```

## 3. Create GitHub Actions Azure Credentials

```powershell
$rgId = az group show --name $rg --query id -o tsv
az ad sp create-for-rbac --name "sp-mernmovies-prod-$suffix" --role Contributor --scopes $rgId --sdk-auth
```

Save the JSON output as the GitHub Actions secret `AZURE_CREDENTIALS`.

## 4. Configure GitHub Actions Secrets

Set these in GitHub repository settings: `Settings > Secrets and variables > Actions`.

```text
AZURE_CREDENTIALS=<service-principal-json>
AZURE_RESOURCE_GROUP=<resource-group-name>
ACR_NAME=<acr-name>
ACR_LOGIN_SERVER=<acr-name>.azurecr.io
BACKEND_WEBAPP_NAME=<backend-webapp-name>
FRONTEND_WEBAPP_NAME=<frontend-webapp-name>
MONGO_URI_PRODUCTION=<mongodb-atlas-production-uri>
JWT_SECRET=<long-random-secret>
FRONTEND_ORIGIN=https://<frontend-webapp-name>.azurewebsites.net
VITE_API_URL=https://<backend-webapp-name>.azurewebsites.net
```

## 5. Deploy

1. Push the branch containing the production CD workflow to GitHub.
2. Open GitHub Actions.
3. Run `CD Pipeline`.
4. Select `production`.

## 6. Verify

```powershell
az webapp log tail --resource-group $rg --name $backend
az webapp log tail --resource-group $rg --name $frontend
```

Open:

- `https://<backend-webapp-name>.azurewebsites.net/api/v1/health`
- `https://<frontend-webapp-name>.azurewebsites.net`

Then test search/filter and register/login.
