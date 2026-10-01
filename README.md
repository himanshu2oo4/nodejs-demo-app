# Three-Tier Demo: React + Node/Express + PostgreSQL (Task Tracker)

React (Vite, served by Nginx) -> Express API -> PostgreSQL

## Run everything with Docker
    cp .env.example .env
    docker compose up --build -d
    open http://localhost:8080

## Run locally without Docker (3 terminals)
    # 1. DB
    docker run -d --name pg -p 5432:5432 -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=changeme -e POSTGRES_DB=tasksdb \
      -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql postgres:16-alpine
    # 2. Backend (DB_HOST defaults to localhost)
    cd backend && npm install && npm start
    # 3. Frontend (Vite proxies /api to localhost:5000)
    cd frontend && npm install && npm run dev      # http://localhost:3000

## Ports
| Service  | Container | Host |
|----------|-----------|------|
| frontend (Nginx) | 80   | 8080 |
| backend (Express)| 5000 | 5000 |
| db (Postgres)    | 5432 | 5432 |
| Vite dev server (local only) | - | 3000 |    npm run dev you can use 

## API Endpoints 
GET /health, GET /ready, GET/POST /api/tasks, PUT/DELETE /api/tasks/:id
