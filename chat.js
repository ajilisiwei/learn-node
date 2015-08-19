var net = require('net');

var chatServer = net.createServer();
var clientList = [];
chatServer.on('connection', function (client) {
    client.write('hello\n');
    clientList.push(client);
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.on('data', function(data) {
        for (var i = 0; i < clientList.length; i++) {
            clientList[i].write(clientList[i].name + ' *' + data);
        }
    });
});

chatServer.listen(9000);