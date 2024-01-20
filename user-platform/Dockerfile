FROM node:latest

RUN mkdir -p /var/www/user-platfrom
WORKDIR /var/www/user-platfrom
ADD . /var/www/user-platfrom
RUN npm install
CMD npm run build && npm run start:prod