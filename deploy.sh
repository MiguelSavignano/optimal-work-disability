HEROKU_APP=incapacidad-temporal-optima
./dockerbuild.sh
docker push registry.heroku.com/${HEROKU_APP}/web
heroku container:release web
