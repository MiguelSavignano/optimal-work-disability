HEROKU_APP=incapacidad-temporal-optima
./dockerbuild.sh
docker push registry.heroku.com/incapacidad-temporal-optima/web
heroku container:release web --app incapacidad-temporal-optima
