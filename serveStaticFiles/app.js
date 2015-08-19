var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
                serveStaticFile(res, '/public/home.html', 'text/html');
                break;
        case '/about':
                serveStaticFile(res, '/public/about.html', 'text/html');
                break;
        case '/guang.jpg':
                serveStaticFile(res, '/public/guang.jpg', 'image/jpeg');
                break;
        default:
                serveStaticFile(res, '/public/notfound.html', 'image/jpeg', 404);
    }
}).listen(3000);

function serveStaticFile(res, filename, type, statusCode) {
    if (!statusCode) {
        statusCode = 200;
    }
    console.log(__dirname + filename);
    fs.readFile(__dirname + filename, function (err, data) {
        if (err) {
            res.writeHead(500, {'ContentType': 'text/plain'});
            res.end('500-internal error');
        } else {
            res.writeHead(statusCode, {'ContentType': type});
            res.end(data);
        }
    })
}