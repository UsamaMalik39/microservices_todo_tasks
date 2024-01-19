FROM node:latest

RUN mkdir -p /var/www/user-platfrom
WORKDIR /var/www/user-platfrom
ADD . /var/www/user-platfrom
RUN yarn install
CMD yarn run build && yarn run start:prod