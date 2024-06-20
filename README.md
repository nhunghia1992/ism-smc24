## Config App
Copy `.env.production.local` file to `/app` folder

Re-config `REACT_APP_APP_URL` & `REACT_APP_CMS_URL`
## Config CMS
Copy `.env.production` file to `/cms` folder

Re-config Database settings
## Config docker compose
Copy `.env` file to root folder

Re-config service ports
## Build docker compose
Build app service:
```
docker compose up app --build -d
```
Build cms service:
```
docker compose up cms --build -d
```
Build all services:
```
docker compose up --build -d
```
