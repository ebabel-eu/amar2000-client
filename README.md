# [AMAR2000 client](https://amar2000-client.herokuapp.com/) [![wercker status](https://app.wercker.com/status/801fa0b25ec6c9b39b0d7a5fe2bbd000/s "wercker status")](https://app.wercker.com/project/bykey/801fa0b25ec6c9b39b0d7a5fe2bbd000)

Dashboard the environment data of an office and alerts when parameters enter unhealthy ranges.

## Install

```
npm install
npm install -g http-server
npm install -g webpack
npm install -g eslint
npm install -g eslint-config-airbnb
npm install -g eslint-plugin-react
npm install -g babel-eslint
```

## Build

```
webpack
```

### Build continuously

```
webpack -w
```

## Unit test

```
npm test
```

### Unit test continuously

```
npm run test-watch
```

## Run locally

```
http-server build/
```

Browse to http://localhost:8080 or 8081

## Deploy to Heroku (staging)

Any code merged into the develop branch and pushed to the Github repository
will be deployed to Heroku staging environment.

```
[ develop branch ] => [ Heroku staging ]
```

Browse to https://amar2000-client-staging.herokuapp.com/

## Deploy to Heroku (production)

There are two methods to deploy to production:

1 - Promote the code that has been deployed to staging 
to the production environment by using the Heroku web app.

2 - Any code merged into the master branch and pushed to the Github repository 
will be deployed to Heroku production environment.

```
[ master branch ] => [ Heroku production ]
```

Create a tag with a version vX.Y.Z, following the canonical versioning rules.

Make sure the package.json file is changed accordingly with the correct version before deploying to the master branch and tagging it.

Example:

```
git tag -a v1.0.0 -m "Version deployed at the end of the Hackaton that launched this app."
git push --tags
```

Browse to https://amar2000-client.herokuapp.com/

Note: all deployments can be rollbacked on the Heroku web app.

## Visual Studio Code setup [optional]

In your settings.json (User Settings), the following can be set to lint this project inline:

```
{
  "jshint.enable": false,
  "eslint.enable": true,
	"editor.tabSize": 2
}
```

You will also need to install the following plugins:

```
ext install eslint
```

Optionally, since this project is Wallaby enabled, you can install it:

```
ext install wallaby
```

## Useful links:

- https://dev.netatmo.com/doc/authentication/usercred
- https://github.com/fraserxu/react-chartist
- http://www.buroepn.nl/ventilatie/co2-en-het-vergaderruimte-effect

## Release history

Currently being developed: v1.0.1

### v1.0.1 Refactoring and improvements (future release)
- creation of a staging environment
- post install step in package.json to run webpack
- Wercker continuous integration and deployment to Staging
- Heroku final deployment to Production
- refactoring of dev and live dependencies to fit the post install step
- removal of all build files from repos
- range parameters moved to constants.js instead of hardcoded magic numbers
- font name refactoring
- robots.txt file
- refactoring of Javascript to meet linting rules
- readme documentation updated

### v1.0.0 First release from initial Hackaton
- initial mvp version
