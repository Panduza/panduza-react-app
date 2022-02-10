FROM node:17

WORKDIR /work

COPY . /work

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN yarn

RUN yarn run build

EXPOSE 80
