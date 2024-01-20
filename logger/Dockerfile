FROM node:latest

RUN mkdir -p /var/www/logger
WORKDIR /var/www/logger
ADD . /var/www/logger
RUN yarn install
CMD yarn run build && yarn run start:prod