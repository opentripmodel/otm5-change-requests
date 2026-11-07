FROM node:22 AS build

WORKDIR /app

COPY app/package.json app/yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY app/ /app/

# This search and replace is needed to set the baseUrl to '/' only
RUN sed -i 's|/documentation/|/|g' docusaurus.config.ts

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx-conf /etc/nginx/conf.d
