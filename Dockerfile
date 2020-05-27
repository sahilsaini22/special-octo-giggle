FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
 
RUN npm install
RUN npm run client-install
RUN npm run build
 
EXPOSE 4000
 
CMD ["node", "server.js"]