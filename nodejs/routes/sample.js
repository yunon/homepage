var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();


/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 *
router.get('/', function(req, res, next) {
  var param = {"値":"これはサンプルAPIです"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});
*/


router.get('/sqlite', function(req, res, next){
  var db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");

  res.header('Content-Type', 'application/json; charset=utf-8');

  db.serialize(function(){
    db.all('SELECT id, title, time, group_concat(tagname) AS "tagname" FROM sourceTagJoin GROUP BY id ORDER BY time LIMIT 10', function(err, row){
      if(err){
        console.log(err)
      }
      res.send(row);
    })
  })
  db.close();
})


module.exports = router;