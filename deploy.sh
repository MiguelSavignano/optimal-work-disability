rm -fr server/web/static
mkdir server/web/static
(cd front && npm run build)
git add .
git commit -m "upgrade version"
git push origin master
./dockerbuild.sh
heroku container:release web
