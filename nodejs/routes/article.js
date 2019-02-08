const express = require('express');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const async = require('async');
const myfunc = require('../myfunc');
const fs = require('fs');

/**
 *  記事の投稿画面を表示する
 *  http://localhost:3000/article
 */
router.get('/', (req, res)=>{
  // ログインチェック
  if(!req.session.loginStatus){
    res.redirect(`/login?redirect=/article`);
    return;
  }
  let html = (()=>{/*
    <div id="formbody" style="height: 1000px">
      <div style="height: 100%; background-color: #a3a3a3">
        <form action="/article/post" method="post" name="form" id="form1" style="height: 100%">
          <fieldset style="height: 100%">
            <p>タイトル <input type="text" name="title" required><p>
            <p>タグ <input type="text" name="tag"></p>
            <p>コンテンツ</p>
            <p class="p"><textarea id="codeeditor" name="sourcecode"></textarea></p>
            <button type="submit" class="btn btn-primary" id="submit">送信する</button><button type="reset" class="btn btn-primary" id="reset" onclick="return confirm('本当に書き込み内容をリセットしますか？')">リセットする</button>
          </fieldset>
        </form>
      </div>
    </div>
    <script>
      // codemirror の実装   ※textareaの場合fromTextAreaをつけないといけない
      var editor = CodeMirror.fromTextArea(document.getElementById("codeeditor"), {
        mode: "javascript", lineNumbers: true, autoCloseBrackets: true, theme: "3024-day", 
      }); 
    </script>
  */}).toString().match(/\/\*([^]*)\*\//)[1];

  res.render('profile.ejs',{
    title: '記事を投稿',
    main: html,
    loginStatus: myfunc.login_html(req.session)
  })
})

/**
 *  記事の情報をjson形式で返すAPI
 *  url: http://localhost:3000/article/return
 **/
router.post('/return', (req, res)=>{

  // レスポンスヘッダーの設定
  res.header('Content-Type', 'application/json; charset=utf-8');

  // データベースオープン
  const db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");
  // リクエストを取得
  let num = req.body.num;
  let filter = req.body.filter;
  let word = req.body.word;
  let searchtype = req.body.searchtype;
  let colname = 'time';

  // リクエストの種類によって処理を分岐
  if(searchtype == 0){
    word = `(SELECT id FROM article WHERE title LIKE "%${word}%")`;
  }else{
    word = `(SELECT id FROM tag_view Where tagname="${word}")`;
  }
  if(filter == "new"){
      filter = "ASC";
  }else if(filter == "old"){
      filter = "DESC";
  }else{
      colname = "title";
      filter = "DESC";
  }  
  
  // sql文を置き換え
  let sql = `SELECT id, title, time, group_concat(tagname) AS "tagname", name, icon FROM article_tag_user_view WHERE id IN ${word} GROUP BY id ORDER BY ${colname} ${filter} LIMIT ${num} , 20`;
  
  // 同期処理をする
  db.serialize(()=>{
    // SQL文を実行
    db.all( sql ,(err, row)=>{
      if(err){
        console.log(err)
      }
      // データベースクローズ
      db.close();
      // レスポンスを送る
      res.send(row);
    })
  })
})


/**
 * 新しい記事の登録処理をする
 * url: http://localhost:3000/article/post
 */
router.post('/post',(req, res)=>{

  // リクエストを取得
  
  let title = req.body.title;
  let tag = req.body.tag;
  let name = req.session.loginData.name;
  // データベースオープン
  const db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");
  // ランダムな10文字の英数字
  let strRandom = '';
  let meta = `---\ntitle: ${title}\ntags: ${tag}\nauthor: ${name}\n---\n`;
  let sourcecode = meta+req.body.sourcecode;
  // ユーザID
  let user_id;

  // タグを空白で分割する
  tag = tag.split(/\s+/);
  // 配列の重複を排除する
  tag = tag.filter((value, index, array)=>{
    return array.indexOf(value) === index;
  });
  // 空要素を削除
  tag = tag.filter((value)=>{
    return value != '';
  })

  // 一部を同期処理にする
  async.series([
    // ユーザIDの取得
    function(next){
      db.get(`SELECT id FROM user WHERE name = "${name}"`,(err, data)=>{
        if(err)console.log(err);
        user_id = data.id;
        next();
      })
    },
    // 非同期処理(1)
    // ランダムな10桁の英数字を生成する
    function(next){

      // 非同期処理を同期的にループする
      let status = true;
      async.whilst(
        // ループ条件
        function(){
          if(!status){
            // idとtitleとユーザIDをsourcedataテーブルに登録
            db.run(`INSERT INTO article(id, title, user) VALUES("${strRandom}","${title}","${user_id}")`);
            next();
          }
          return status;
        },
        // 非同期処理
        function(callback){
          const str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ';
          let strlen  = str.length;
          // 生成する文字列の長さ
          const strRandomlen = 10; 
          for(let i=0; i< strRandomlen; i++){
            strRandom += str[Math.floor(Math.random()*strlen)];
          }
          // -- ID被りしていないか確認 --
          // (注意)テンプレートリテラルを使うときはバッククオートを使う必要がある
          let sql = `SELECT COUNT(*) AS "count" FROM article WHERE id = "${strRandom }"`;
          // dbを同期処理
          db.serialize(()=>{
            // SQL文を実行
            db.get(sql,(err, row)=>{
              if(err){
                console.error('ERROR!!!', err);
                return;
              }
              // id被りが無かったらループを抜ける
              if(row.count == 0){
                status = false;
              }
              callback();
            });
          });
        }
      );
    },
    // 非同期処理(2)
    // タグの登録処理
    function(next){
      // foreachの同期処理version
      async.each(tag,(i,callback)=>{
        // 同期処理
        db.serialize(()=>{

          async.series([
            function(next){
              // 登録済みのタグか確認
              let sql = `SELECT COUNT(*) AS "count" FROM tag WHERE tagname = "${i}"`;
              db.get(sql,(err, row)=>{
                if(err){
                  console.error('ERROR', err);
                  return;
                }
                // 新規タグならデータベース(tagdataテーブル)に登録
                if(row.count == 0){
                  db.run(`INSERT INTO tag(tagname) VALUES("${i}")`,(err)=>{
                    if(err){
                      console.log(err);
                      return;
                    }
                    next();
                  })
                }else{
                  next();
                }
              })
            },
            function(){
                // tagdataテーブルからtagIDを取得
                let sql = `SELECT tagID FROM tag WHERE tagname="${i}"`;
                db.get(sql,(err, row)=>{
                  if(err){
                    console.error('ERROR', err);
                    return;
                  }
                  // tagテーブルにidとタグIDを登録
                  db.run(`INSERT INTO tag_article VALUES("${strRandom}","${row.tagID}")`);
                  callback();
                })
            }
          ])
        })
      },function(err){
        if(err){
          console.log(err);
        }
        next();
      });
    },
    //非同期処理(3)
    // ファイル生成など
    function(next){

      // ファイル作成
      fs.writeFile(`./public/sourcecode/${strRandom}.md`,sourcecode,(err)=>{return err});
      // データベースクローズ
      db.close();
      // リダイレクト
      res.redirect('http://localhost:3000');
      next();
    }
  ])
})
module.exports = router;