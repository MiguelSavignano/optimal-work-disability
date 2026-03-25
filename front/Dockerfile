FROM node:20-slim

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . .

CMD ["npm", "start"]
