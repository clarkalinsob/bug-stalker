FROM node:10

WORKDIR /home/node/app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"] 
