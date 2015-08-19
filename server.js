var http = require('http');
var util = require('util');

http.createServer(function (req, res) {
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function () {
        console.log(util.inspect(post));
        res.end(util.inspect(post));
    })
}).listen(3000);