FROM node:20-slim as front

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV=production
COPY front/package.json /app/package.json
RUN npm install --include=dev
COPY front /app/
RUN npm run build

# **** Multistage Server (front assets and api) *******
FROM python:3.12-slim
RUN mkdir /app
WORKDIR /app

COPY server/requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt

# Add our code
COPY server /app

COPY --from=front /app/build /app/web/static
COPY --from=front /app/build/index.html /app/web/templates/index.html

EXPOSE 8080

CMD gunicorn --bind 0.0.0.0:8080 webapp:app
