FROM node:latest

RUN mkdir -p /var/www/todo-platform
WORKDIR /var/www/todo-platform
ADD . /var/www/todo-platform
RUN yarn install
CMD yarn run build && yarn run start:prod