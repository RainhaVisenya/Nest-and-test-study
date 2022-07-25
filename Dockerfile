FROM node:16.16.0-alpine3.15

RUN yarn global add @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app