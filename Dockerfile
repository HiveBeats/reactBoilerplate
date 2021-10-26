FROM node:lts-alpine3.14 AS builder

#set working directory
WORKDIR /app

#install app dependencies:

#1. copy package.json to Docker env
COPY package.json ./

#2. install all it's packages
RUN npm install

#3. copy everything to Docker env
COPY . ./

#4. Build release ver
RUN npm run build

# RUN ON NODE (but it will never runs on docker create command)
CMD ["npm", "start"]
