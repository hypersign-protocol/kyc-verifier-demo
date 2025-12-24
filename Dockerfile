FROM node:20.19

WORKDIR /app

COPY package*.json ./
RUN npm i 
COPY . .


EXPOSE 6006

CMD ["npm", "start"]
