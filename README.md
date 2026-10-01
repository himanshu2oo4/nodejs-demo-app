# Three-Tier Demo: React + Node/Express + PostgreSQL (Task Tracker)

React (Vite, served by Nginx) -> Express API -> PostgreSQL


## Run everything with Docker

ENVIRONMENT VARIABLES :  <br> put this in an .env file before running the docker compose  
<br>====== DATABASE TIER 3 Env vars
<br>
POSTGRES_USER  , 
POSTGRES_PASSWORD  , 
POSTGRES_DB     <br>

==== BACKEND TIER 2 ENV vars <br>
PORT , 
DB_HOST , 
DB_PORT , 
CORS_ORIGIN  , 
NODE_ENV
<br>
=== FRONTEND TIER 1 : backend connection env vars  <br>

BACKEND_HOST , 
BACKEND_PORT  , 
FRONTEND_HOST_PORT

<br>

## FINALLY run     
docker compose up --build -d   <br>
open http://localhost:8080



## Ports
| Service  | Container | Host |
|----------|-----------|------|
| frontend (Nginx) | 80   | 8080 |
| backend (Express)| 5000 | 5000 |
| db (Postgres)    | 5432 | 5432 |
| Vite dev server (local only) | - | 3000 |    npm run dev you can use 

## API Endpoints 
GET /health, GET /ready, GET/POST /api/tasks, PUT/DELETE /api/tasks/:id


## IN GITHUB ACTIONS CI PIPELINE 
steps : <br>
    1.  NPM audits <br>
    2.  Build Tests   <br> 
    3.  SAST -> Sonarqube scan <br>
    4.  Trivy file scan   <br>
    5.  Final Docker builds and Push to DockerHUB  
