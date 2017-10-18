# Angular frontend
FROM node:latest as angular
WORKDIR /angular
COPY angular-frontend/package.json .
RUN npm install

COPY angular-frontend .
COPY data /data
RUN npm run build:bh

# React frontend
FROM node:latest as react
WORKDIR /react
COPY react-frontend/package.json .
RUN npm install
COPY react-frontend .
COPY data /data
RUN PUBLIC_URL='/react' npm run-script build

# Backend
FROM node:latest as backend
WORKDIR /backend
COPY backend/package.json .
RUN npm install
COPY backend .
COPY data /data
RUN npm run-script build

# Finishing result
FROM node:latest

WORKDIR /app
RUN mkdir -p backend/static/react
COPY data/*.json ./data/

WORKDIR /app/backend

COPY --from=backend /backend/node_modules ./node_modules
COPY --from=backend /backend/build /app
COPY --from=angular /angular/dist ./static
COPY --from=react /react/build  ./static/react

ENV MONGOURL=mongodb://database/matches

EXPOSE 8274

CMD [ "node", "src" ]