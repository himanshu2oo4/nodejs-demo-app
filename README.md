# Three-Tier Demo: React + Node/Express + PostgreSQL (Task Tracker)

React (Vite, served by Nginx) -> Express API -> PostgreSQL


## Run everything with Docker

ENVIRONMENT VARIABLES :   put this in an .env file before running the docker compose  
# ---- Database (Tier 3) ----
POSTGRES_USER 
POSTGRES_PASSWORD
POSTGRES_DB

# ---- Backend (Tier 2) ----
PORT
DB_HOST
DB_PORT
CORS_ORIGIN
NODE_ENV

# ---- Frontend (Tier 1) ----
BACKEND_HOST
BACKEND_PORT
FRONTEND_HOST_PORT

## FINALLY run     
docker compose up --build -d
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
steps : 
    1.  NPM audits
    2.  Build Tests 
    3.  SAST -> Sonarqube scan 
    4.  Trivy file scan  
    5.  Final Docker builds and Push to DockerHUB 
