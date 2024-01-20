FROM node:latest

RUN mkdir -p /var/www/todo-platform
WORKDIR /var/www/todo-platform
ADD . /var/www/todo-platform
RUN npm install
CMD npm run build && npm run start:prod