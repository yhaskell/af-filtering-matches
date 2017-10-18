FROM node:latest

WORKDIR /usr/src/app/data
COPY data .

WORKDIR /usr/src/app/frontend

COPY frontend/package.json .
RUN npm install

COPY frontend .

RUN npm run build:bh

WORKDIR /usr/src/app/react-frontend

COPY react-frontend/package.json .
RUN npm install

COPY react-frontend .

RUN PUBLIC_URL='/react' npm run-script build

WORKDIR /usr/src/app/backend

COPY backend/package.json .
RUN npm install

COPY backend .

RUN npm run-script build

RUN mkdir -p static/react

RUN cp -r ../frontend/dist/* ./static/
RUN cp -r ../react-frontend/build/* ./static/react

ENV MONGOURL=mongodb://database/matches

EXPOSE 8274

CMD [ "npm", "run", "start:prod" ]