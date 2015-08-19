var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var tweet = [];
app.get('/', function (req, res) {
    res.send('welcome to twitter');
});
app.post('/send', bodyParser, function (req, res) {
    if (req.body && req.body.tweet) {
        tweets.push(req.body.tweet);
        res.send('{"status": "ok", "message": "received"}');
    } else {
        res.send('{"status": "not ok", "message": "not received"}');
    }
});

app.get('/tweets', function (req, res) {
    res.send(tweet);
});

app.listen(8000);