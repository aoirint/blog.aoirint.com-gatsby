FROM node:14-slim

WORKDIR /work
ADD package.json package-lock.json .npmrc /work/

RUN npm ci

ADD . /work
