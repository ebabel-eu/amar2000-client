# AMAR2000 client

Dashboard the environment data of an office and alerts when parameters enter unhealthy ranges.

## install

```
npm install
npm install -g http-server
npm install -g webpack
npm install -g eslint
npm install -g eslint-config-airbnb
npm install -g eslint-plugin-react
npm install -g babel-eslint
```

## build

```
webpack
```

### build continuously

```
webpack -w
```

## unit test

```
npm test
```

### unit test continuously

```
npm run test-watch
```

## run locally

```
http-server build/
```

Browse to http://localhost:8080 or 8081

## deploy to Heroku (production)

Any code merged into master and pushed to the remote repository on Github 
will be deployed to Heroku.

```
[ master branch ] => [ heroku instance ]
```

Create a tag with a version vX.Y.Z, following the canonical versioning rules.

Make sure the package.json file is changed accordingly with the correct version before deploying to the master branch and tagging it.

Example:

```
git tag -a v1.0.0 -m "Version deployed at the end of the Hackaton that launched this app."
git push --tags
```

Browse to https://amar2000-client.herokuapp.com/

## Usefull links:
https://dev.netatmo.com/doc/authentication/usercred
https://github.com/fraserxu/react-chartist
http://www.buroepn.nl/ventilatie/co2-en-het-vergaderruimte-effect
