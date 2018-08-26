#Deploy with heroku

## Heroku login
```
heroku login
```

## Logging in to the registry
```
heroku container:login
```

## Building and pushing image(s)
```
./dockerbuild.sh
```

## Deploy new release

Use latest image for release
```
heroku container:release web
```
