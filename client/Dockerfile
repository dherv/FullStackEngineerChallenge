FROM node:12 as BUILD

WORKDIR /usr/src/app/client
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install 

COPY . .
RUN yarn build

FROM nginx:1.15

COPY --from=BUILD /usr/src/app/client/build/ /usr/share/nginx/html
COPY --from=BUILD /usr/src/app/client/nginx.conf /etc/nginx/conf.d/default.conf