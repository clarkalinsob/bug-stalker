FROM node:10

WORKDIR /home/node/app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"] 
