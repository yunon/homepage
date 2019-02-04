---
title: 【2017年版】Node.js入門情報まとめ
tags: Node.js
author: test11
---
この記事は[Node.js Advent Calendar 2017](https://qiita.com/advent-calendar/2017/nodejs) 5日目の記事です。

**Node.jsを今から始めるぞ！**っていう人向けの情報です。

下記記事の更新が1年以上前でしたので、参考にしつつまとめなおしてみました。

- [Node.js良記事まとめ(随時更新)](https://qiita.com/kenju/items/fe149acfa8f7b0ec25c8)

## 公式サイト
### [本家サイト](https://nodejs.org/ja/)

Node.js公式サイト（日本語）。最新情報やドキュメントの確認に。

ただしNode.jsはアップデートが速いので、ダウンロード・インストールは後述のバージョン管理ツールを使ったほうがよいです。

## 環境構築について
コマンドラインからバージョンを確認したり変更したりできるバージョン管理ツールが便利です。

各記事最新バージョンの取り方を参考に、バージョンを直して読んでください。

### nodebrew
日本人のコミッターが多く、日本では使ってる人が多い印象です。

- [node.jsのversionを管理するためにnodebrewを利用する](https://qiita.com/sinmetal/items/154e81823f386279b33c)


### nvm
スター数で見ると世界的には主流っぽい。筆者はnvm使ってます。

- [いまアツいJavaScript！ゼロから始めるNode.js入門〜5分で環境構築編〜](https://liginc.co.jp/web/programming/node-js/85318)

### nodist
windowsの人はこれがいいみたい。

- [nodistでNode.jsをバージョン管理](https://qiita.com/satoyan419/items/56e0b5f35912b9374305)

## ES2015について
Node.js v6.0以降あたりから、ES2015を大幅サポートしています。今から始める人はES2015で書きましょう。

- [可読性アップのためのes2015入門](https://qiita.com/fnobi/items/e33d7b07db9e9aaa89a7)
- [春からはじめるモダンJavaScript / ES2015](https://qiita.com/mizchi/items/3bbb3f466a3b5011b509)

## 入門チュートリアル
注意：下記で紹介するサイトは全て、ES2015以前の情報です！

参考にしつつ、記述はES2015にのっとるようにしましょう。

### [Node Study](https://github.com/yosuke-furukawa/node_study)

- 日本語
- Hello, WorldからExpress、Socket.io入門まで

Node.js日本ユーザグループ代表の @yosuke_furukawa 氏が公開しているものです。

日本語で圧倒的に読みやすい＆補足説明付きでオススメです。

### [dotinstall](https://dotinstall.com/lessons/basic_nodejs)

- 日本語
- 動画形式
- 詳細な概要、簡単なアプリケーション作成、DB接続まで

概要・特徴や設定などから詳しく説明があります。動画でじっくりやりたい人向け。

### [Udemy](https://blog.udemy.com/node-js-tutorial/)

- 英語サイト
- Node.jsの概要、状況（ちょい古）、よく使う構成のインストール、Angularの導入

ミニマムでとりあえず始めたい人にはちょっと重い内容かも。

### [Code School](https://www.codeschool.com/courses/real-time-web-with-node-js)

- 英語サイト
- 動画

イベント、ストリーム、モジュールなど各項目について説明してくれてそう。（見れてない）

## 各機能について
### promise

- [Promiseについて0から勉強してみた](https://qiita.com/toshihirock/items/e49b66f8685a8510bd76)

### async/await

- [async/await 入門（JavaScript）](https://qiita.com/soarflat/items/1a9613e023200bbebcb3)

- [JavaScriptのasync/awaitがPromiseよりもっと良い](https://qiita.com/Anders/items/dfcb48d8b27ceaffb443)


## コミュニティ

### [Node学園](https://nodejs.connpass.com/)

- セッション＆LT

Node.jsについて発表するイベント。毎月開催。

「レベルが高すぎる」という声も聞きますが、とりあえず言ってみればなにか始まるはず！臆するなかれ！

### [NodeSchool Tokyo](https://nodejs.connpass.com/)

- NodeSchoolワークショップ
- ゲスト講演（毎回かは不明）

NodeSchoolという学習プログラムをもくもくするイベントです。Osaka、Fukuiなどもあるみたい。

メンターさんが来てくれるので独学が不安な人はぜひ。（※募集はNode学園同ページ）

### [東京Node学園付属小学校](https://nodejs.connpass.com/event/23463/)

- 入門者LT
- ゲスト講演（毎回かは不明）

Node学園を初心者向けに開催するイベントです。不定期開催。

### [Node女学園](https://nodegirls-jp.connpass.com/)

- ハンズオン、LT、ゲスト講演など

私が主催している女性向けイベントです。勉強したい人ぜひ！持ち込み企画歓迎です。（以前のイベント募集はNode学園の方）

ちなみに「男性向けも開催してください」とよく言われますが、**開催したいと思った人が開催してください**！！

### [NodeBots](https://nodebots.connpass.com/)

- もくもく会

JavaScript Roboticsという、JavaScriptでハードウェアを動かしてみようというイベント。

NodeSchool内のカリキュラムを使ったワークショップです。

### [これから始める人のためのNode.js,React.js勉強会](https://node.connpass.com/)

- もくもく会

Node, Reactとあるのでフロント寄りな人向けかも。最近やってないみたい。。

## 書籍

### [初めてのJavaScript 第3版](https://www.oreilly.co.jp/books/9784873117836/)

定番のオライリー本。**ES2015に対応してます**。

Node.jsについての章は一つだけですが、しっかり勉強したい人向け。

## 界隈の人
情報を発信していてウォッチするとよい人。アルファベット順にしました。

### Node core
- [@about_hiroppy](https://twitter.com/about_hiroppy)
- [@jovi0608](https://twitter.com/jovi0608)
- [@watilde](https://twitter.com/watilde)
- [@yosuke_furukawa](https://twitter.com/yosuke_furukawa)

### Socket.io, next.js
- [@nkzawa](https://twitter.com/nkzawa)

### React.js
- [@koba04](https://twitter.com/nkzawa)
- [@mizchi](https://twitter.com/mizchi)

### Vue.js
- [@kazu_pon](https://twitter.com/kazu_pon)

### Angular.js
- [@laco2net](https://twitter.com/laco2net)

### JavaScript全般
- [@azu_re](https://twitter.com/azu_re)
- [@teppeis](https://twitter.com/teppeis)

### その他
- [@mysticatea](https://twitter.com/mysticatea) - ESLint中の人
- [@n0bisuke](https://twitter.com/n0bisuke) - JavaScript Robotics
- [@t_wada](https://twitter.com/t_wada) - TDDの権威

## おわりに

調べ切れていない部分があるので、間違った情報・追加情報ガシガシ編集依頼ください！

本記事のまとめ方は「[Go言語の初心者が見ると幸せになれる場所　#golang](https://qiita.com/tenntenn/items/0e33a4959250d1a55045)」を参考にさせていただきました！

