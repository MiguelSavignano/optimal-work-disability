HEROKU_APP=incapacidad-temporal-optima

docker build \
  -t registry.heroku.com/${HEROKU_APP}/web \
  -f Dockerfile.heroku \
  .
