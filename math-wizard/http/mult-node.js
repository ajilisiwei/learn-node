var htutil = require('./htutil');

exports.get = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var result = req.a * req.b;
    res.end(
        htutil.page('multiplication', htutil.navbar(),[
            (!isNaN(req.a) && !isNaN(req.b)
                ? ('<p class="result">{a} * {b} = {result}</p>'
                .replace('{a}', req.a)
                .replace('{b}', req.b)
                .replace('{result}', result))
                : ''
            ),
            '<p>enter numbers to multiply</p>',
            '<form name="mult" action="/mult" method="get">',
            'a: <input type="text" name="a" /><br/>',
            'b: <input type="text" name="b" />',
            '<input type="submit" value="submit" />',
            '</form>'
            ].join('\n'))
    );
}