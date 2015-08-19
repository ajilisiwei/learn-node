var http = require('http');
var htutil = require('./htutil.js');

// 路由
var server = http.createServer(function (req, res) {
    htutil.loadParams(req, res, undefined);
    if (req.requrl.pathname === '/') {
        require('./home-node').get(req, res);
    } else if(req.requrl.pathname === '/square') {
        require('./square-node').get(req, res);
    } else if (req.requrl.pathname === '/factorial-node') {
        require('./factorial-node').get(req, res);
    } else if (req.requrl.pathname === '/fibo2') {
        require('./fibo2-node.js').get(req, res);
    } else if (req.requrl.pathname === '/mult') {
        require('./mult-node.js').get(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('bad url ' + req.url);
    }
}).listen(3000);