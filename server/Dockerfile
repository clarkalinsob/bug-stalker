FROM node:10

WORKDIR /home/node/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"] 
