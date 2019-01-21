var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sample = require('./routes/sample');

app.listen(3000);

// publicディレクトリを公開
app.use(express.static('public'));

app.use('/sample', sample);

