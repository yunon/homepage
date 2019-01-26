var sqlite3 = require("sqlite3").verbose();
var strRandom = 'tagagagag';
var async = require('async');
// データベースオープン
var db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");
var tag = 'test java c';
  // タグを空白で分割する
  tag = tag.split(/\s+/);
  // 配列の重複を排除する
  tag = tag.filter(function(value, index, array){
    return array.indexOf(value) === index;
  });

// foreachの同期処理version
async.each(tag,function(i,callback){
  // 同期処理
  db.serialize(function(){
    console.log(i)
    // 登録済みのタグか確認
    sql = `SELECT COUNT(*) AS "count" FROM tagdata WHERE tagname = "${i}"`;
    db.each(sql, function(err, row){
      if(err){
        console.error('ERROR', err);
        return;
      }
      // 新規タグならデータベース(tagdataテーブル)に登録
      if(row.count == 0){
        db.run(`INSERT INTO tagdata(tagname) VALUES("${i}")`);
      }
    })

    // tagdataテーブルからtagIDを取得
    sql = `SELECT tagID FROM tagdata WHERE tagname="${i}"`;
    db.each(sql, function(err, row){
      if(err){
        console.error('ERROR', err);
        return;
      }
      // tagテーブルにidとタグIDを登録
      //db.run(`INSERT INTO tag VALUES("${strRandom}","${row.tagID}")`);
      callback();
    })

  })
},function(err){
  if(err){
    console.log(err);
  }
  console.log(2)
  //next();
});
/*
// データベースオープン
var db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");

async.series([
  function(next){

    // ランダムな10桁の英数字を生成する
    // 非同期処理を同期的にループする
    var status = true;
    async.whilst(
      // ループ条件
      function(){
        if(!status){
          next();
        }
        return status;
      },
      // 非同期処理
      function(callback){

        
        var str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
        var strlen  = str.length;
        var strRandom = '';
        // 生成する文字列の長さ
        const strRandomlen = 10; 
        for(let i=0; i< strRandomlen; i++){
          strRandom += str[Math.floor(Math.random()*strlen)];
        }
        

        // -- ID被りしていないか確認 --
        // テンプレートリテラルはバッククオートで囲まないといけない
        var sql = `SELECT COUNT(*) AS "count" FROM sourcedata WHERE id = "${strRandom}"`;
        // dbを同期処理
        console.log(sql)
        db.serialize(function(){
          // SQL文を実行
          db.each(sql, function(err, row){
            if(err){
              console.error('ERROR!!!', err);
              return;
            }
            console.log(row.count);
            // id被りが無かったらループを抜ける
            if(row.count == 0){
              status = false;
              console.log(1);
            }
            console.log(2);
            console.log(strRandom);
            callback();
          });
        });
      }
    );
  },
  function(next){
    console.log('success');
    next();
  }
])
/*
var sts = true;
while(sts){
  console.log(1);
  setTimeout(()=>{
    console.log(2);
    if(true){
      sts = false;
    }
  },500);
}
*/
/*
var count = 0;
async.whilst(
  function(){
    if(count >= 5){
      return false;
    }else{
      return true;
    }
  },
  function(callback){
    console.log(1);
    setTimeout(()=>{
      console.log(2);
      if(true){
        sts = false;
      }
      count++;
      callback();
    }, 500);
  }
)
*/