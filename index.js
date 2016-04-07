(function () {
    var http = require('http'),
        express = require('express'),
        app = express(),
        port = process.env.PORT || 80,
        ip = process.env.IP || '0.0.0.0';

    // Simple logger.
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        next();
    });

    // Set generic headers used in all responses.
    app.use(function (req, res, next) {
        res.set({
            'X-Powered-By': 'NodeJS',
            'Access-Control-Allow-Methods': 'GET, POST',               // Allowed request http verbs.
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'    // Allowed request headers.
        });
        next();
    });

    // Handle all static file GET requests.
    app.use(express.static(__dirname + '/build'));

    http.createServer(
        app.handle.bind(app)
    ).listen(port, ip, function() {
        console.log('Listening on http://' + ip + ':' + port);
    });
}());