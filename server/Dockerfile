FROM node:12

WORKDIR /usr/src/app/server
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install 

COPY . .
RUN yarn build

EXPOSE 3000