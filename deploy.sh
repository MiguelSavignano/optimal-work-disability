rm -fr server/web/static
mkdir server/web/static
(cd front && npm run build)
./dockerbuild.sh
git add .
git commit -m "upgrade version"
git push origin master
heroku container:release web
