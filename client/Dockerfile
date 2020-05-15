FROM node:10

WORKDIR /home/node/app/client

COPY package*.json ./

RUN npm install -g @angular/cli@8.2.2

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"] 
