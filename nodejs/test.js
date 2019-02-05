var assert = require('assert');
var myModule = require('./routes/login.js');
var http = require('http');

http.get('http://localhost:3000',function(res){
    res.setEncoding('utf8');
    res.on('data',(data)=>{
        console.log(data);
    })
})