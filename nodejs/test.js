var assert = require('assert');
var myModule = require('./routes/login.js');
//requestをrequire
var request = require('request');

//ヘッダーを定義
var headers = {
  'Content-Type':'application/json'
}

//オプションを定義
var options = {
  url: 'http://localhost:3000/login',
  method: 'POST',
  headers: headers,
  json: true,
  form: { name : "test1", pass:"test03", redirect : "/"},
}

//リクエスト送信
request( options , function (error, res, body) {
  console.log(res.caseless)
})