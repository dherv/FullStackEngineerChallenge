FROM node:12 as BUILD

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install
COPY ./ /usr/src/app/
RUN npm run build


FROM nginx:1.15

COPY --from=BUILD /usr/src/app/build/ /usr/share/nginx/html
COPY --from=BUILD /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf