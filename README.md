# amar2000-client
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

## deploy to Heroky (production)

Any code merged into master and push to the remote repository on Github 
will be published to the Heroku server.

Browse to https://amar2000-client.herokuapp.com/

## Usefull links:
https://dev.netatmo.com/doc/authentication/usercred
https://github.com/fraserxu/react-chartist
http://www.buroepn.nl/ventilatie/co2-en-het-vergaderruimte-effect
