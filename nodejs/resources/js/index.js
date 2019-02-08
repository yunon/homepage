import '../sass/index.scss';
// Bootstrapのスタイルシート側の機能を読み込む
import 'bootstrap/dist/css/bootstrap.min.css';

// BootstrapのJavaScript側の機能を読み込む
import 'bootstrap';

var num = 0;
var filter = "new";
var word = null;
var searchtype = 0;
$(function() {
  post();
  // 送信無効化
  //$("#submit").prop("disabled", "true");
  // タグがクリックされたら再読み込み
  $(".tag").click(function(){
    searchtype = 1;
    num = 0;
    $("#add").empty();
    post();
  })
  // ENTERキーが押されたとき
  $("#search").keypress(function(e){
    if(e.which == 13){
      $("#search input[type='button']").click();
    }
  })
  // 検索ボタンが押されたら再読み込み
  $("#form02 input[type='button']").on("click",function(){
    searchtype = $("#search select").val();
    word = $("#search input").val();
    num = 0;
    $("#add").empty();        
    post();
  })
  // 並び替えボタンが押されたら再読み込み
  $("#filter").change(function(){
    num = 0;
    $("#add").empty();
    filter = $("#filter select").val();
    post();
  })
  // moreボタンを押すとさらに表示
  $("#more").on("click", function(){
    num += 20;
    post();
  })
});
function post(){
   $.ajax({
      url:'http://localhost:3000/article/return',
      type:'POST',
      data:{
          'num': num,
          'filter': filter,
          'word': word,
          'searchtype': searchtype
      }
   })
   // Ajaxリクエストが成功した時発動
   .done( (data) => {
      console.log(data);
      var htmlcode = (function() {/*
          <div id="contents">
            <div id="icon">
              <a><img src="image/user_icon/:icon" onclick="window.location.href = '/:username'"></a>
              
            </div>
            <div id="href">
              <a id="title" href="/:id"><span>:title</span></a>
              <div id="href2">
                <ul>:tag </ul><div id="time">:time</div>
              </div>
            </div>
          </div>
          <style>
            #icon a img {
              cursor : pointer;
            }
          </style>
      */}).toString().match(/\/\*([^]*)\*\//)[1];
      var tag = "<li><a class='tag' href='#' onclick=\"word=this.firstElementChild.innerHTML;$('#search input[type=&quot;text&quot;]').val(word);searchtype=1;num = 0;$('#add').empty();post()\"><span>:tag</span></a></li>";
     
      for(var i in data){
        var tagRes = "";
        // 時間処理
        let time = data[i]["time"];
        if(time<60)time+="秒前";
        else if(time<3600)time=Math.floor(time/60)+"分前";
        else if(time<86400)time=Math.floor(time/3600)+"時間前";
        else if(time<2628003)time=Math.floor(time/86400)+"日前";
        else if(time<31557600)time=Math.floor(time/2628003)+"ヶ月前";
        else time=Math.floor(time/31557600)+"年前";
        // タグ処理
        if(data[i]["tagname"] != null){
          var array = data[i]["tagname"].split(",");
          for(var j in array){
            tagRes += tag.replace(":tag", array[j]);
          }
        }
        // 文字変換
        var rp_htmlcode = htmlcode
        .replace(":title", data[i]["title"])
        .replace(":id", data[i]["id"])
        .replace(":time", time)
        .replace(":tag", tagRes)
        .replace(":icon", data[i]["icon"])
        .replace(":username", data[i]["name"]);
        $("#add").append(rp_htmlcode);
      }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        $('.result').html(data);
        console.log(data);
    })
    // Ajaxリクエストが成功・失敗どちらでも発動
    .always( (data) => {
     });
}