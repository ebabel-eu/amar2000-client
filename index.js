// In production (Heroku), node.js can be used to run this static website.
var server = function() {
  var http = require('http');
  var express = require('express');
  var app = express();
  var port = 80;
  var ip = '0.0.0.0';

  // Set generic headers used in all responses.
  app.use(function (req, res, next) {
    res.set({
      'X-Powered-By': 'NodeJS',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    });
    next();
  });

  // Handle all static file GET requests.
  app.use(express.static(__dirname + '/build'));

  http.createServer(
    app.handle.bind(app)
  ).listen(port, ip, () => {
    var logMessage = 'Listening on http://' + ip + ':' + port;
    console.log(logMessage);
  });
};

server();
