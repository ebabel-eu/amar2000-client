const server = () => {
  const http = require('http');
  const express = require('express');
  const app = express();
  const port = 80;
  const ip = '0.0.0.0';

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
