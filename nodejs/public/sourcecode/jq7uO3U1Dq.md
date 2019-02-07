---
title: クライアント側でセッションの情報を保持するSessionStorageの使い方
tags: JavaScript session sessionStorage RESTful
author: Yuta_Fujiwara
slide: false
---
## クライアント側でセッション情報を保持
クライアントサーバ型のアプリケーションを開発しているとき、セッションの情報をどこに？どのように？保持するのかという課題がありました。僕の本番サーバはスペックがよくないので、ステートフルな設計でクライアントから大量のリクエストが発生したときに、処理ができなくなるのではないか...ということを懸念していました。
そこで、GETorPOSTのリクエストに対して、サーバの処理としてはレスポンスを返すだけのRESTの設計手法を用いました（クライアントの情報やこれまでの履歴等はサーバは一切持たない）。セッション情報などもサーバではなくクライアント側で保持するためにSessionStorageを使っています。

## SessionStorageとは
WebStorageという仕組みがHTML5から導入されており、SessionStorageはWebブラウザのストレージにデータを保持することができます。。利用方法は2種類あって、一つがlocalStorage、もう一つが今回のsessionStorageです。

 * SessionStorage：ブラウザが閉じるまで保持し続ける 
 * localStorage ：ブラウザが閉じても保持し続ける

###対応ブラウザ
| 機能 | Chrome | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit) |
|:--|--:|--:|--:|--:|--:|
| localStorage | 4 | 3.5 | 8 | 10.50 | 4 |
| sessionStorage | 5 | 2 | 8 | 10.50 | 4 |
※[参考にさせていただきました](https://qiita.com/uralogical/items/ade858ccfa164d164a3b):@uralogical :bow_tone2:

## SessionStorageを使った登録ページのデモ
SessionStorageの登録・取得・破棄は以下の関数を使います。

```javascript:登録
window.sessionStorage.setItem(['user_email'],[mail]);
window.sessionStorage.setItem(['user_name'],[name]); 
```
```javascript:取得
var mail = window.sessionStorage.getItem(['user_email']);        
var name = window.sessionStorage.getItem(['user_name']);
```
```javascript:破棄
window.sessionStorage.clear();
```

### ソース
![セッション.gif](https://qiita-image-store.s3.amazonaws.com/0/147291/45209797-ed68-8d31-82a5-101f385d3f6c.gif)

``` javascript:main.js
$(function() {

    var mail = '';
    var name = '';

    //**** 初期処理 ****
    (function (){

        // 初期処理でセッション情報を取得
        mail = window.sessionStorage.getItem(['user_email']);        
        name = window.sessionStorage.getItem(['user_name']);
        
        if(mail!=null && name !=null){
            $('#result').after('<div id="submit_result" class="section__block section__block--notification"><p>メール:'+mail+'</br>名前  :'+name+'</br>セッション情報を保持しています。</p></div>');             
        }
        
    })();

    // 登録ボタン押下イベント
    $('#submit').click(onClickSubmit);

    // セッション解除押下イベント
    $('#clear').click(onClickClear);

    //更新押下イベント
    $('#load').click(onLoad);

    //登録ボタン押下処理
    function onClickSubmit(){
        $('#submit_result').remove();
        mail = $('#user_mail').val();
        name = $('#user_name').val();
        
        if(mail!='' && name !=''){

            //セッションストレージ開始
            window.sessionStorage.setItem(['user_email'],[mail]);
            window.sessionStorage.setItem(['user_name'],[name]); 

            //セッション登録完了メッセージ
            $('#result').after('<div id="submit_result" class="section__block section__block--notification"><p>メール:'+mail+'</br>名前  :'+name+'</br>セッション情報に登録しました。</p></div>');            

        }else{
            //登録失敗メッセージ
            $('#result').after('<div id="submit_result" class="section__block section__block--notification-red"><p>メールアドレス・名前を入力してください。</p></div>');            
        }
    }

    function onClickClear(){
        $('#submit_result').remove();
        $('#result').after('<div id="submit_result" class="section__block section__block--notification"><p>セッション情報を破棄しました。</p></div>');                    
        //セッション情報クリア
        window.sessionStorage.clear();
    }

    function onLoad(){
        $('#submit_result').remove();
        location.reload();
    }
});
```

開発者コンソールでSessionStorage確認しても、セッション情報が保持できていることが確認できます。

<img width="1272" alt="スクリーンショット 2018-01-16 8.46.11.png" src="https://qiita-image-store.s3.amazonaws.com/0/147291/53ed69c5-6e47-9b74-d031-3dcaac137fc2.png">

## デモページ・ソース

### デモページ
[http://tech-portfolio.org/demo/session_strage/](http://tech-portfolio.org/demo/session_strage/)

### Github
[https://github.com/FujiyamaYuta/sessionstrage_demo.git](https://github.com/FujiyamaYuta/sessionstrage_demo.git)

### 参考文献
[javascriptでセッション？HTML5 SessionStorageの使い方](http://wp.tech-style.info/archives/787)
[Window.sessionStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage)
[sessionStorageをつかってみる](https://qiita.com/uralogical/items/ade858ccfa164d164a3b) - @uralogical 
参考にさせていただきました。ありがとうございました...:bow_tone2: