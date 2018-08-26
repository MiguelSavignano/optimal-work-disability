HEROKU_APP=incapacidad-temporal-optima

docker build \
  -t registry.heroku.com/${HEROKU_APP}/web \
  -f server/Dockerfile.heroku \
  server

docker push registry.heroku.com/${HEROKU_APP}/web
