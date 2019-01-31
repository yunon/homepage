---
title: Webでどこまで遊べるか試してみた
tags: JavaScript three.js WebAudioAPI ServiceWorker manifest.json
author: Leonardo-mbc
slide: false
---
Sound Walker という Web アプリを作りました。
↓ここで遊べます↓（スマートフォンで開いてください）
https://www.sound-walker.app

リポジトリはこちら
https://github.com/Leonardo-mbc/sound-walker
![スクリーンショット 2019-01-26 18.50.39.png](https://qiita-image-store.s3.amazonaws.com/0/127936/12567704-e3c2-cec6-72e7-9d60c7a8d1b3.png)
ホーム画面に追加することで、インストールしたアプリのように遊べます。
<img width="226" alt="IMG_1975BC8804C9-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/60eef5fa-cd87-49b6-d8ef-755afffae577.jpeg">
Webでどこまでできるかをやってみようと思って作り始めて、
ほっといて数年たったら技術がみるみる変わっていて、いろいろ味が出てきました。

Service Worker, Add To HomeScreen などなど
Webでできるゲームってだけだったのが、普通にスマホで動くゲームになる時代になっております。

Sound Walker で使ってる技術は WebGL(Three.js), WebAudioAPI, ServiceWorker, manifest.json, React.js, redux です。
それぞれ、色んな思いがあって使用しております。
# Webで遊べるメリット
- インストールしなくていい、必要なものを必要なときにだけダウンロード  
  - ServiceWorker でキャッシュもできる
- ゲームのこの面がおもしろい、この面だけシェアしよう！ ができる
- PWA が実現できる、デバイスによって振る舞いや必要なリソース／アセットを変えれる
- モダンブラウザがあるものならどんなデバイスでも遊べる

昔には Flash があって Web で遊べるゲームは一般的なものでした。
ガラケーからスマホにかけてポータブルで遊べるようなアプリがたくさん出てきて、気づいた頃には Web で遊べるようなものは少なくなってきていました。

いまだと、Flash もかろうじて生きてて、あとは Unity Web Player があったりして。
これらの Web で動かせるモジュールたちは Web で動いてはいますが、PWA として作用させられなかったり、URL をシェアしてプレイ画面にいきなりジャンプすることはできず、Web であるメリットは少ないかもしれません。

最近だと WeChat や LINE でもアプリ内 Web でいろんなことをやろうとしています。

> WeChatのミニプログラムがApp Storeの脅威に？iOSやAndroidを「スーパーラップ」する可能性が指摘
> https://japanese.engadget.com/2019/01/28/wechat-app-store-ios-android/

> HTML5ゲームサービス「LINE QUICK GAME」が正式オープン。各タイトルで使えるポイント「QUICK」の導入も明らかに
> https://www.4gamer.net/games/428/G042839/20180919006/

たまごっちはおなかへったら LINE で通知送られてきます。こうなってくると、Web だとかアプリだとかスマートスピーカーだとか、ユーザー体験の境界線ってもはやなくなろうとしてるんじゃないでしょうか

# Three.js について
<img width="600" alt="IMG_1975BC8804C9-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/e3ff8548-48be-23f4-5854-85e8507ec2d5.png">
Sound Walker の画面はざっくり３レイヤーに分かれています。
React.js の普通のWebアプリを挟み込むように前後に Three.js の canvas が存在してます。

背景は演出用の canvas で、再生されてる音を見える化したものを表示しています。
プロトタイプでは背景に映像を載せていたんですけど、スマホで再生するとプレイヤーが起動してしまってコントロールを奪われるため断念しました。
<img width="600" alt="IMG_1975BC8804C9-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/53515d1b-e301-c4f0-2b6f-934fee055f86.gif">
↑背面の Three.js \<canvas\>

前面の Three.js <canvas> はトランジション用で、実はこれだけで２つのレンダラーを持っています。
透明なレンダラーと映像が投影されてるレンダラーのトランジションであたかも画面全体がトランジションしているように見せているという感じです。
![fg.gif](https://qiita-image-store.s3.amazonaws.com/0/127936/655ac3e3-3a68-919e-6e1f-38cfa7f2f9bd.gif)
↑前面の Three.js <canvas>

CSSだけでもリッチな表現ができますけど、あえて複雑で重い Three.js を使ったのは postprocessing に魅力があったからです。
postprocessing ではWebGLレンダラーに出力されてる映像にシェーダーなどを使って特殊な効果をつけれます。
↓はタイトル画面の Glitch Filter です、こういうのは CSS でまだできないですよね。
![bg-anim.gif](https://qiita-image-store.s3.amazonaws.com/0/127936/8eed3330-e085-1b00-a220-2fbeeeaae1dc.gif)
# WebAudioAPI について
## WebAudioAPI の制限
数年前に比べて、厳しい制限が追加されてました。
![スクリーンショット 2019-01-26 16.50.19.png](https://qiita-image-store.s3.amazonaws.com/0/127936/3703aa3d-6939-faa6-9308-5cf811781d13.png)
```The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu```

WebAudioAPI で音を鳴らすためには、ユーザーのアクション（クリックなど）を起因としなければなりません。
しかもこれは、再生できないのではなく、再生を検知して瞬時にブラウザが停止させています。
なので、AudioContext の status は `suspended` になり、 ユーザーのアクションから `context.resume()` する必要があります。

```resume-sample.js
document.querySelector('button').addEventListener('click', function() {
  if(context.state === 'suspended') {
    context.resume().then(() => {
      console.log('再生が再開されたはずです！');
    });
  }
});
```

![スクリーンショット 2019-01-26 17.11.20.png](https://qiita-image-store.s3.amazonaws.com/0/127936/0674fd34-0ad4-e2c3-e341-41eae609ccb6.png)
画面によっては、このような苦しい施策をやらないとなことも

Warning で怒られたくなければ、AudioContext の作成をユーザーのアクションを起因にして作成すると良いです。

```make-context-sample.js
document.querySelector('button').addEventListener('click', function() {
  const context = new AudioContext();
  // オーディオグラフを以下に組み上げていきます
  ...
});
```

ユーザーのアクションは redux-saga のような Action をdispatch するだけの仕組みでもちゃんと認識してくれました。
touchstart, click どちらでも大丈夫です。

## Sound Walker での WebAudioAPI
![sound-nodes.png](https://qiita-image-store.s3.amazonaws.com/0/127936/1149bdc1-2650-8c3d-186e-046f903c9374.png)
タイトル曲とかシステムで使う音ソースとプレイを始めたときになる音ソースは同じ GainNode。
cueA, cueB とあるのは曲選択時のクロスフェードのために別れているものです。
![スクリーンショット 2019-01-26 17.11.04.png](https://qiita-image-store.s3.amazonaws.com/0/127936/151533c6-9185-3626-9300-4dff14f05878.png)
DJプレイでのクロスフェードは曲をつなぐために使います。
ここでは１つの曲を遊ぶと、その曲の Remix が解禁される、つまりA面／B面のアイデアで用いてました。
（実際には Remix じゃない曲も多いですが）

オーディオグラフでは、すべてのGainNode の先に AnalyzerNode を設置して、ユーザーに聞こえている音すべてを分析します。ここでスペクトラムやウェーブフォーム用の値を生成してます。

# プレイシーンごとの固有のURL
![menus.png](https://qiita-image-store.s3.amazonaws.com/0/127936/ff9cc77f-bde9-6f45-da50-102baa4a6618.png)
誰かに「この曲やってみてよ！」みたいなシェアができたらいいなと思って、それぞれのシーンに固有の URL を持てるように設計しました。
実はいろいろ骨が折れましたし、後悔もあります。

骨が折れた点は普通に URL を遷移させると、うまく隠れてたステータスバーが表示されてしまう点です。
<img width="600" alt="IMG_1975BC8804C9-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/8ddda15e-9e32-88c9-e404-e27acc960065.jpeg">
URL は JavaScript 側で制御していますが、onClick で遷移したらステータスバーがにゅいっと出てくるので、`ontouchstart` で `preventDefault()` してあげる必要があります。
そうすると、ステータスバーを隠したまま URL を遷移できました。

後悔した点は遷移をリンクハッシュにしたことです。ようは JavaScript 側で SPA だけど URL という仕組みなので、OGP がそれぞれの曲 URL ごとに設定することができません。

<img width="330" alt="IMG_3346.jpg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/115f0b41-e46c-cddf-c3d0-42a83c79fa49.jpeg">
OGP の例

でも、実際はさらにたくさんの問題がありました。
ステータスバーがうまく隠れてたというのも、iPhone やいくつかのデバイスでは画面をランドスケープ（横）にするとステータスバーが隠れて全画面にできるんです。
もともと画面を倒して遊ぶ、というプレイスタイルはこのためだけに用意したものでした。
<img width="330" alt="IMG_3346.jpg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/2f27d0a0-9fe0-3d91-dfa6-32e8e67a95cb.jpeg">
だけど iPhone X でタブをいくつか持っている場合、ステータスバーはいつも表示されますし、Android Chrome はタブがなかろうとステータスバーが常に表示されます。
そこそこ諦めていたんですが、とりいそぎ対策として standalone な Web アプリにしてしまえと manifest.json を導入しました。

# manifest.json と ServiceWorker
ステータスバーがでるのやだなと言ってましたが、manifest.json を書けばもうアプリです。
<img width="667" alt="IMG_C4ADFECE22FC-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/39126b76-aa1b-1ee3-8032-b801af717477.jpeg">
これは本当にすごいことで、フルスクリーンにもなりますし Service Worker 共々インストールされます。
Web ブラウザだとメモリ使いすぎなのかバシバシ落ちていたのもなくなってサクサク。
Service Worker のキャシングのおかげでオフラインでも遊べる！

Service Worker、特にキャッシュ周りはとてもややこしいので Workbox と webpack プラグインを使って管理・作成しています。
![スクリーンショット 2019-01-26 19.36.46.png](https://qiita-image-store.s3.amazonaws.com/0/127936/6217540a-c454-eae4-ae0e-d361ef0eaef0.png)
https://developers.google.com/web/tools/workbox/

workbox-webpack-plugin
https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin

以下のような感じで Service Worker を生成できます。
生で書かないメリットとしては、webpack-config で管理できて設定も一望できるところです。

```webpack-config.js
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      precacheManifestFilename: 'precache-manifest/[manifestHash].js',
      runtimeCaching: [
        {
          urlPattern: /assets\/sounds/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'sounds',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },
      ],
    })
  ],
};
```

↑でわかるように assets のキャッシュなら大した問題じゃないかもですけど、script ファイルまで Service Worker にキャッシュされてしまうので、デバッグ用のコンフィグを以下のように設定すると良いと思います。

```webpack-config.js
const { GenerateSW } = require('workbox-webpack-plugin');

const IS_DEBUG = process.env.production !== 'true';

const DEBUG_PLUGINS = [
  new GenerateSW({
    skipWaiting: true,
    clientsClaim: true,
    precacheManifestFilename: 'precache-manifest-debug/[manifestHash].js',
    ignoreUrlParametersMatching: [/.*/],
    exclude: [/.*/],
  }),
];

module.exports = {
  ...
  plugins: [...(IS_DEBUG ? DEBUG_PLUGINS : PUBLISH_PLUGINS（←もともとの設定をここに）)],
};
```
`production=true webpack` としない限りは、Service Worker のキャッシュが動くことはなくなります。
# やりたかったけどできなかったこと
## ちゃんとした iPhoneX 対応
iPhoneX でランドスケープ（横持ち）にすると、ページ下部が見切れるという問題に悩まされていました。
`bottom: 0px` が画面領域外に出てしまってました。
<img width="600" src="https://qiita-image-store.s3.amazonaws.com/0/127936/eec9de3c-3a0e-6c81-83a4-481b5215116b.png" />
こうなってしまうと、Play ボタンが押せずに遊べなくなってしまいます。
`viewport-fit=cover` を試したり、`bottom: env(safe-area-inset-bottom);` を試しましたが、それで解決できず。

そもそもタブバーが出ているのも iPhoneX のデフォルトの設定によるものです。
<img width="330" src="https://qiita-image-store.s3.amazonaws.com/0/127936/95d7ef2f-1e0b-5924-eb27-aaccba23712e.jpeg">


苦肉の策ですが、２つの対策をすることにしました。

- JavaScript で iPhoneX かどうか判別して、`<body>` に `.iphonex` class を付与する
- `<body>` の底上げ

```iphonex-detect.js
// FIXME
const isIPhoneX =
window.devicePixelRatio === 3 &&
  (window.screen.width === 375 || window.screen.height === 375 || window.screen.width === 414 || window.screen.height === 414) &&
  /iPhone/.test(window.navigator.userAgent);

if (isIPhoneX) {
  document.body.classList.add('iphonex');
}
```
```global.css
body.iphonex {
  position: absolute;
  bottom: 80px;
}

body.iphonex canvas {
  bottom: 0px;
  position: absolute;
}
```
`devicePixelRatio === 3` で 高さが `375px` or `414px`、userAgent に iPhone を含む端末を iPhoneX とみなすようにしてますが、うーんという感じです。XR は近場になく検証できてません、、

サイズ感の詳しいまとめはこちらが便利でした
https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions

`<canvas>`はなぜか正しい位置にいたので、`bottom: 0px` に戻ってもらうようにしました。
`display: flex` でおかしくなっているような気もしますが、取り急ぎこの対処でしのぎました。
もしわかる方がいたら教えてください → https://github.com/Leonardo-mbc/sound-walker/blob/master/src/components/pages/music-select/style.css
![IMG_7861-1024x473.png](https://qiita-image-store.s3.amazonaws.com/0/127936/3a98b64a-2c4d-982c-6ecd-f8f4ed90e7b8.png)
上は切れるけど、UI は下部にあるからしょうがないかなぁと言う感じです。
誰か教えてください。

## WebAssembly
背面の Three.js <canvas> はオーディオのスペクトラムを表示しています。
これが円形になるように座標を計算しているんですが、重いです。
<img width="400" alt="IMG_1975BC8804C9-1.jpeg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/53515d1b-e301-c4f0-2b6f-934fee055f86.gif">
これを高速に計算したいために WebAssembly を使おうとしていました。
リポジトリを見ていただくとわかるのですが、TypeScript でコードを書いたので、書式を揃えるという意味で AssemblyScript を使うことにしました。

しかし、AssemblyScript にはまだ sin, cos, tan の関数が用意されておらず。
メインの計算は三角関数によるものなので、ここの高速化はもうしばらく待つことにしました。
もちろん C++ などで書いてもよいのですが、このあたりの計算は重いだけで、致命的になるような問題はないので急がず待つことにしました。
<img width="585" alt="スクリーンショット 2019-01-26 22.21.53.png" src="https://qiita-image-store.s3.amazonaws.com/0/127936/c5791d61-bf37-1e48-3845-192a25033913.png">

# おわりに
今の Web 技術をいろいろ組み合わせるとやばいくらい何でもできます。
（Web Bluetooth API, Payment Request API などなど）

↓ iOS の12.2 beta でも PWA 周りで多くの新機能が出てくる予定だそうです
<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">WHHATTT!!! iOS 12.2. beta comes with some big PWA updates!</p>&mdash; Mike Hartington (@mhartington) <a href="https://twitter.com/mhartington/status/1089292031548145666?ref_src=twsrc%5Etfw">2019年1月26日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


こういう仕組みはブラウザが搭載されていれば、どこでも動かせますし、アプリのようなインストールもいりません。
Nintendo Switch も内部的に Web を使っているわけですし、
そのうちインストールしなくてもストリーミングでゲームが遊べるような時代が来そうですね！

> Nintendo Switchの中ではReactが動いてる！Nintendo eShop開発秘話を聞いてきた
> https://html5experts.jp/shumpei-shiraishi/24538/

LINE のトーク内にも LIFF という仕組みがあるので、そのなかで 簡単な Webゲームを動作させたり、決済したりすることもできるようになってきています。
目が離せないですね
<img width="330" alt="IMG_3346.jpg" src="https://qiita-image-store.s3.amazonaws.com/0/127936/5d084900-9c53-4784-7038-7ea6000625a0.png">
（この家計簿アプリについてはこちらの記事を参照 http://blog.leonardo-mbc.blue/archives/293 ）

# 余談
A面を遊べば、どんどん曲が解禁されていきます！
全曲解禁を目指してみてください！
<img width="512" alt="737c2c5148000cbc7d5d2dd272e409dd-1024x474.png" src="https://qiita-image-store.s3.amazonaws.com/0/127936/9181543d-db9f-709b-c80a-d7d66f0f9234.png">