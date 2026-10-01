# ---- Stage 1: build the React app ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build            # this will create a dist file which we'll host using nginx 

# ---- Stage 2: serve with Nginx ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
