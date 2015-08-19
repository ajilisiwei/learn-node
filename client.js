var http = require('http');
var querystring = require('querystring');

var content = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University'
});

var opts = {
    host: 'localhost',
    port: 3000,
    path: '/testPost',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length' : content.length
    }
};

var req = http.request(opts, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log(data);
    });
});
req.write(content);
req.end();