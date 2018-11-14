// Dependencies
const app = require('express')();
const proxy = require('http-proxy-middleware');
var fs = require('fs')
var https = require('https')
var enableHttps = false

// Config
const { routes } = require('./config.json');


for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/');
            }
        })
    );
}

if(enableHttps){
    // redirects HTTP requests to HTTPS
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.host + req.url });
        res.end();
    }).listen(80);
    https.createServer({
        key: fs.readFileSync('cert.key'),
        cert: fs.readFileSync('cert.pem')
      }, app)
      .listen(443, function () {
        console.log('listening on port 443')
      })
} else {
    app.listen(80, () => {
        console.log('Proxy listening on port 80');
    });
}



