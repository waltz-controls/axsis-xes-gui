FROM node:12 AS build

ARG NODE_AUTH_TOKEN

RUN echo "//npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN" >> ~/.npmrc

COPY . .

RUN npm install && \
    npm run build

FROM nginx:mainline-alpine

COPY --from=build /index.html /usr/share/nginx/html
COPY --from=build /dist /usr/share/nginx/html/dist