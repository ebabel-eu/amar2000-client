const server = () => {
  const http = require('http');
  const express = require('express');
  const app = express();
  const port = process.env && process.env.PORT || 80;
  const ip = process.env && process.env.IP || '0.0.0.0';

  // Simple logger.
  app.use((req, res, next) => {
    console.log('%s %s', req.method, req.url);
    next();
  });

  // Set generic headers used in all responses.
  app.use((req, res, next) => {
    res.set({
      'X-Powered-By': 'NodeJS',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    });
    next();
  });

  // Handle all static file GET requests.
  app.use(express.static(`${__dirname}/build`));

  http.createServer(
    app.handle.bind(app)
  ).listen(port, ip, () => {
    const logMessage = `Listening on http://${ip}:${port}`;
    console.log(logMessage);
  });
};

server();
