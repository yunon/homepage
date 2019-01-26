var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//POSTでリクエストを取得するのに必要
var bodyParser = require('body-parser');
app.use(bodyParser());

var database = require('./routes/database');


app.listen(3000);

// publicディレクトリを公開
app.use(express.static('public'));

app.use('/database', database);

