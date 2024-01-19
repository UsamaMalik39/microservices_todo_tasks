FROM node:latest

RUN mkdir -p /var/www/notification-platform
WORKDIR /var/www/notification-platform
ADD . /var/www/notification-platform
RUN yarn install
CMD yarn run build && yarn run start:prod