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

WORKDIR /usr/src/app
RUN mkdir -p backend/static/react
COPY data/*.json ./data/
COPY --from=backend /backend/node_modules ./backend/node_modules
COPY --from=backend /backend/build/* ./backend/
COPY --from=angular /angular/dist/* ./backend/static/
COPY --from=react /react/build/*  ./backend/static/react/

WORKDIR /usr/src/app/backend

ENV MONGOURL=mongodb://database/matches

EXPOSE 8274

CMD [ "node", "src" ]