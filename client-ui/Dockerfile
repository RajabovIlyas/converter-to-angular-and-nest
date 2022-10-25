###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As development

RUN mkdir /client && chown node:node /client

RUN mkdir /client/node_modules && chown node:node /client/node_modules

WORKDIR  /client

COPY --chown=node:node package*.json ./

RUN npm ci --quiet

COPY --chown=node:node . .

USER node




###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
