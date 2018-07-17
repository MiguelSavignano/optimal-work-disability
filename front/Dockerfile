FROM node:9.6.1

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN yarn install --pure-lockfile
RUN yarn global add react-scripts@1.1.1
COPY . .

CMD ["npm", "start"]
