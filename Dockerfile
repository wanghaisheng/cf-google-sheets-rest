FROM node:16

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY . /app
WORKDIR /app
RUN npm install 
CMD [ "npm", "run", "start:prod" ]