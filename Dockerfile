FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm i -g nodemon
RUN npm install --production --silent
COPY . .
VOLUME [ "/usr/src/app/node_modules" ]
EXPOSE 1337
CMD nodemon