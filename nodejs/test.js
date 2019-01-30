var sqlite3 = require("sqlite3").verbose();
var strRandom = 'tagagagag';
var async = require('async');
// データベースオープン
var db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");
var fs = require('fs');

fs.readFile(`test.md`,'utf8',function(err,data){
  if(err){
    console.log('errorですよ');
    return;
  }else{
    console.log(escape_meta(data));
  }
})



/**
 * "md形式のデータから'---'で囲われているメタ情報(json形式)"と、
 * "元データからメタ情報を省いたデータ"の２つを配列で返すメソッド
 * 
 * @param {String} md_data　md形式のデータ 
 * @return {String} [json, md_data] 
 */
function escape_meta(data){

  console.log(data);

  // '---'で囲まれた文字列を取得
  // String.match()で正規表現を使った際は戻り値が "配列で返ってくる"ので注意
  var json = data.match(/---\n[\s\S]+---\n/)[0];

  // '---'で囲まれた文字列を排除したデータを取得
  var md = data.replace(/---\n[\s\S]+---\n/,'');

  // メタデータの各プロパティを取得
  var title = json.match(/title:\s.+/)[0].replace(/title:\s/,'');
  var tags = json.match(/tags:\s.+/)[0].replace(/tags:\s/,'');
  var author = json.match(/author:\s.+/)[0].replace(/author:\s/,'');

  // json形式にまとめる
  json = {
    title : title,
    tags : tags,
    author : author
  }

  return [json, md]
}