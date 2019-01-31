---
title: 猫に仕事を邪魔されてみたかったので技術で実現した
tags: クソアプリ
author: ampersand
slide: false
---
これはクソアプリアドベントカレンダー20日目の投稿です。

# 「猫が仕事を邪魔してくる〜ww」とかいうアレ
<img width="447" alt="スクリーンショット 2018-12-19 21.04.57.png" src="https://qiita-image-store.s3.amazonaws.com/0/7193/f94a6943-8310-0898-37c8-4895453e53d5.png">
なんなんだ？なんなんだお前ら。「猫が仕事邪魔するんだよ〜ｗｗｗ」っていいながらめっちゃ良い写真撮りやがって。あまつさえそれをSNSに流しやがって…！！困ってねえだろ！！明らかにエンジョイしてるじゃねーか！！！くそっ！！！！！**俺も猫飼いたい！！！！！！**

そうは思いつつ現実はやっぱり気軽に猫を飼うのはいろいろな都合があり簡単にはいかないものです。
であれば、エンジニアたるもの技術で願いを叶えましょう。

# 猫が仕事を邪魔してくるChrome拡張を作りました
![output-palette.gif](https://qiita-image-store.s3.amazonaws.com/0/7193/3f8c14d9-1f27-51df-1e50-838d0578a0c6.gif)
あ〜〜〜邪魔されるわ〜〜〜**猫に仕事邪魔されるわ〜〜〜〜**っかぁ〜！！

こうして願いをかなえることができました。


# 仕事を邪魔してくる猫たちと実装内容をちょっと解説
技術的にはまったく大したことはしていないのですが、ちょこちょこと小技を使っているのでTIPSとして書いておきます。
あと、絵については気合でアニメーションのコマを描いています。

## はしるねこ
縦横無尽に駆け回り足跡🐾を残していく猫。無限に足の裏が汚れている。

<img width="300" alt="黒ねこ" src="https://qiita-image-store.s3.amazonaws.com/0/7193/3570ab14-24c4-a537-e183-9e13ce6f375f.gif"><img width="60" alt="footstamp.png" src="https://qiita-image-store.s3.amazonaws.com/0/7193/f9a8d9cb-855d-9422-8e27-5e17da19e8c5.png">

どの方向に走ってもあまり違和感が出ないようにやや斜め上アングルで描いています。

### 実装内容
<img width="300" src="https://qiita-image-store.s3.amazonaws.com/0/7193/b7e88dae-6008-22d5-efd7-34635b026675.png">

1. 上か左右の辺どこかの位置を出発点、バッティングしない別の辺の何処かを到着点として走らせる経路を決めます
2. 出発点と到着点の位置から猫の向きを算出します
3. 足跡を配置するときに傾ける角度を算出します
4. 猫を走らせつつ、足跡を散らします

#### 画像の左右反転
左右どちらの向きにするかに応じて、CSSのtransformのscale要素を用いてX軸で回転させます

```
<img width="100" alt="元の向き" style="transform: scale(1, 1);" src="IMAGE_URL">
<img width="100" alt="水平反転" style="transform: scale(-1, 1);" src="IMAGE_URL">
```

#### 角度の算出
出発点、到着点の２点からatanを使ってラジアンを算出し度数を割り出します。
この角度を足跡画像をアペンドするときにCSSのtransformのrotateで角度指定します。

```javascript
  function getRadian(start, end) {
    let radian = Math.atan2(end.top - start.top, end.left - start.left);
    return radian;
  }
  let radian = getRadian(start, end);
  // 度数
  let degree = radian * ( 180 / Math.PI ) ;
```

##ねてるねこ
画面下の真ん中あたりで眠り続ける猫。ボタンとかが後ろにあっても気にしない。退かない。だって猫だから。
<img width="200" alt="ねてるねこ" src="https://qiita-image-store.s3.amazonaws.com/0/7193/1d1d6a8d-9fd6-7301-1c69-bb4304dc1c96.gif">

寝てる時クリックすると嫌な顔になります。嫌な顔になるだけ避けたりはしません。猫だから。あと、**元画像を雑に作ったせいで当たり判定が見た目より広いです。**
<img width="300" alt="スクリーンショット 2018-12-20 2.16.52.png" src="https://qiita-image-store.s3.amazonaws.com/0/7193/67ae716f-a2ee-6475-6ac8-55186dd56a3c.png">



### 実装内容
1. 画面左下から画面中央下まで向かって歩かせる
2. 目的地に到着したら中割コマを挟んで眠らせる
3. 眠った猫にクリックで発火するイベントをつける


<img width="100" alt="ねてるねこ" src="https://qiita-image-store.s3.amazonaws.com/0/7193/3ea54b8a-b7bc-b81f-8238-21f3569e1d26.gif"><img width="100" alt="ねてるねこ" src="https://qiita-image-store.s3.amazonaws.com/0/7193/a68557bd-77b1-4c8d-b59c-9c358e3b3300.gif"><img width="100" alt="ねてるねこ" src="https://qiita-image-store.s3.amazonaws.com/0/7193/861dd1f6-11e6-849c-5f2b-6f523b6e2173.gif">

歩かせるアニメーションは３つのGIF画像の組み合わせで作られています（真ん中はループしないGIFアニメ画像です）。
これを移動する→座ったアニメーションを表示する→眠らせるという順序の切り替えタイミングを合わせる方法としてasync functionを用いています。関数名が本気でどうしようもない感じですがスルーします。
promiseを使うアニメーションの実装については[こちらの記事](https://qiita.com/monpy/items/5f6f33d1f19926927c59)を参考にさせていただきました。

```javascript
// 順次アニメーションを実行
async function animate() {
  await moveCenter();
  await changePose1();
  await changePose2();
}
animate();

// 真ん中に10秒かけて移動させる
function moveCenter() {
  return $cat.animate({ left: "50%" }, 10000, "linear").promise();
}
// 座らせる
function changePose1() {
  return $cat 
  // 座りの画像に切り替え
    .attr("src", src_2) 
    // 切り替えた後1秒してから次の切り替えへ
    .animate({ left: "50%" }, 1000)
    .promise();
}
// 眠らせる
function changePose2() {
  return $cat // 眠りの画像に切り替え
    .attr("src", src_3) // クリックしたら1秒間嫌な顔になる
    .on("click", function(e) {
      // 嫌な顔
      $cat.attr("src", src_4).animate({ left: "50%" }, 1000, function() {
        // 眠りに戻す
        $cat.attr("src", src_3);
      });
    })
    .animate({ left: "50%" }, 1000)
    .promise();
}

```
`{'left': '50%'}`という要素が頻出していますが、移動先に直前アニメーションと同値を指定することで、Nミリ秒経過したら次、というようにPromiseをタイミングを合わせるために使っています。
ただ、この要素を同一オブジェクトを指定するとアニメーションの動きがバグるので同値の要素をオブジェクトリテラルで書いているという形です。なんでバグるんでしょうね（調査放棄）。

余談ですが細かいことに変にこだわったせいで中割のコマ数が多くなって泣きました
<img width="649" alt="スクリーンショット 2018-12-20 3.20.58.png" src="https://qiita-image-store.s3.amazonaws.com/0/7193/59b336fd-f430-ccc3-2b03-12662056c805.png">


##ディメンションねこ
亜空間を渡り歩き不思議パワーで空間を破壊する猫。高いところにあるものを落とす。棚の上が好きだけどウェブサイトの中には棚がない。
<img width="276" alt="スクリーンショット 2018-12-20 3.18.26.png" src="https://qiita-image-store.s3.amazonaws.com/0/7193/f78c56f4-20ae-afa6-146d-aa4e7cdcdc67.png">

５年ぐらい前に[BOX2d](http://paal.org/2012/box2d/Box2dWithDOM.html)というJavaScriptでページ中のDOMを物理演算することのできるライブラリを見かけて、それからずっと「これを使ってなんかやりてぇ！」とずっと虎視眈々と過ごしてきてようやくクソアプリという形でアウトプットできました。
ただ、物理演算の基礎周りがよく分からず、面白い演出ができなかったことが無念です。
デモページの内容を参考にしただけで、ここに説明を書けるほど使い方をライブラリの使用方法を理解していないのでコードについては割愛します。

また、すでにこのライブラリはメンテナンスされていないようです。使ってみて分かりましたが**DOMを物理演算で動かす用事ってそんなにない**ですからね。

でも、DOMが吹っ飛んだり落っこちて散らかってるのは絵面としては面白いです。

![output-palette2.gif](https://qiita-image-store.s3.amazonaws.com/0/7193/bee8f117-58bf-dd37-9007-a89fa6e16589.gif)


# お手元の環境で猫に仕事を邪魔されるには
Chromeウェブストアで拡張を配布しています。ただ、**ディメンションねこの破壊力が高すぎる**のでバージョンを分けるという対策を講じました。
本来、設定とかでその辺を切り替えできるべきだとは思うんですが、実装が面倒だったのと**なんかポケモンみたいで楽しいな**って思いついてしまったからです。

### マイルドバージョン
ディメンションねこが出現せず、はしるねこの足跡🐾も早めに消えます。とりあえず試してみたい場合はこちらをどうぞ。
https://chrome.google.com/webstore/detail/catcatcatcaaaaaaaaaaaaatm/jhdljcdadbppoiebnbjjlmmoblnjpahk/
<img width="400" src="https://qiita-image-store.s3.amazonaws.com/0/7193/9251c778-ef1e-5d3b-398a-8079a5b47a2f.jpeg">


### ワイルドバージョン
ディメンションねこが閲覧中のページをバッキバキに破壊しますし、はしるねこの足跡も結構長い間残ります。
**嫌いなやつのブラウザにこっそりインストールしておく拡張としてご利用ください。**
https://chrome.google.com/webstore/detail/catcatcatcaaaaaaaaaaaaat/pljdeblcblhdngbkhadobblaelhgfgim
<img width="400" src="https://qiita-image-store.s3.amazonaws.com/0/7193/d6f4a82f-b1de-0500-ed07-162bc45d8b07.jpeg">



# まとめ
技術によって願いをかなえることができました🐱やっててよかったプログラミング。つくってよかったクソアプリ。
