from node:latest

WORKDIR /usr/src/app/data
COPY data .

WORKDIR /usr/src/app/frontend

COPY frontend/package.json .
RUN npm install

COPY frontend .

RUN npm run-script build

WORKDIR /usr/src/app/backend

COPY backend/package.json .
RUN npm install

COPY backend .

RUN npm run-script build

RUN cp -r ../frontend/dist ./static
ENV MONGOURL=mongodb://database/matches
EXPOSE 8274

CMD [ "npm", "run", "start:prod" ]