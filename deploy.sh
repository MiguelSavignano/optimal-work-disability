rm -fr server/web/static
mkdir server/web/static
(cd front && npm run build)
git add .
git commit -m "upgrade version"
git push origin master
git push heroku master
