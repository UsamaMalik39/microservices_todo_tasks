FROM node:latest

RUN mkdir -p /var/www/logger
WORKDIR /var/www/logger
ADD . /var/www/logger
RUN npm install
CMD npm run build && npm run start:prod