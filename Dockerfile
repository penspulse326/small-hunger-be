FROM node:22.14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

FROM node:22.14-alpine As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

RUN rm -rf node_modules src test

CMD ["node", "dist/main"]