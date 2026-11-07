# Build context must be the repository root, because the website includes the
# OTM API specifications from otm-api/. Build with:
#   docker build -f website/Dockerfile .
FROM node:22 AS build

WORKDIR /src/website/app

COPY website/app/package.json website/app/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY otm-api/ /src/otm-api/
COPY website/app/ ./

# This search and replace is needed to set the baseUrl to '/' only
RUN sed -i 's|/otm5-change-requests/|/|g' docusaurus.config.ts

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /src/website/app/build /usr/share/nginx/html
COPY website/nginx-conf /etc/nginx/conf.d
