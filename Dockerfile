FROM node:20.16.0

RUN mkdir -p /root/app
COPY . /root/app

WORKDIR /root/app

COPY package*.json /root/app

RUN yarn install

ENV NODE_ENV=production

COPY . /root/app
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]