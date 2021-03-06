FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 9001

CMD [ "node", "server.js" ]