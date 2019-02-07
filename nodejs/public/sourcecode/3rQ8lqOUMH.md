---
title: 良く使うnpmパッケージの紹介
tags: Node.js npm
author: test3
---
- 自分が良く使う npm パッケージを、雑に紹介し感想を述べる記事です
- 非 Noder さん用にもなるように、超有名ライブラリも載せました
- 個人的感想の羅列で、また 1年以上使ってない/調べてないものも含みます。申し訳ないのですが、参考程度でよろしくです


## Web アプリケーション作成
- [express](https://www.npmjs.com/package/express)
  - 一番有名でたぶん利用者も多い、Node.js の Webアプリケーションフレームワーク
  - `function (req, res, next) { return next(); }` のような middleware という概念のフィルターを重ねて処理し、どこかで `res.send(content)` 返したら終了という感じ
  - シンプル、覚えることが少なく直ぐ動かせる。JSON保存する位ならほんとに直ぐ
  - しかし、機能らしい機能が URL の Routing くらいしかない。特にバリデーション周りで決まったノウハウが無く、障害になり易いという感想
- [mongoose](https://www.npmjs.com/package/mongoose)
  - 一般的な MongoDB の ODM。他、調べていません
  - 肥大化していて、黒魔術的な処理も多く、何かあるとコード追うのが大変
  - まぁ、注意して使えばちゃんと動く
- [passport](https://www.npmjs.com/package/passport)
  - 認証ライブラリ、Rails の `devise` のようなやつ
  - Twitter, Facebook など外部サービスの OAuth にも対応
  - 自前で書く部分はやや多いけど、その分透明性も柔軟性も高い
- [jade](https://www.npmjs.com/package/jade)
  - 一般的なテンプレートエンジン。特に不満なく使っている
  - HTML が主だが、プレーンテキストのテンプレート化にも使えなくはない
  - include を使うと変数管理出来ずにひどいことになるので、簡単な部分テンプレート分離でもとりあえず mixin にしとけ、ってばっちゃが言ってた
- [validator](https://www.npmjs.com/package/validator)
  - isXXX な感じのバリデーション関数群のセット、形式的で同期的なチェックのみ対応
- [connect-chain](https://www.npmjs.com/package/connect-chain)
  - 複数の middleware を合成してひとつにする便利関数
- [http-errors](https://www.npmjs.com/package/http-errors)
  - 独自に `new Error('404 Not Found')` など書くぐらいなら、とりあえず使った方がいいのではというもの
- [hapi](https://www.npmjs.com/package/hapi)
  - 次使おうと思っているフレームワーク。未使用・未学習
  - 能書きに "built-in support for input validation, caching, authentication, and other essential facilities" とあるので、これが本当なら良い


## テスト
- [mocha](https://www.npmjs.com/package/mocha)
  - 最も使われているテスティングフレームワーク
  - 枠組みとしての機能のみ提供している。例えば、アサーションやブラウザ連携などの機能は含んでいない
  - 特に不便は感じていないので、別段の理由がなければこれを使っている。ただ、「AngularJSなら[karma](https://www.npmjs.com/package/karma)」のような、他の要因によって推奨されるテストツールもあるので、その際は別のものの検討はする
- [assert](https://nodejs.org/api/assert.html)
  - 標準のアサーションライブラリ
  - `assert()` `strictEqual`, `deepEqual`, `throws` だけ覚えれば最低限使える楽さが良い。そして標準様なので陳腐化しにくい
- [power-assert](https://www.npmjs.com/package/power-assert)
  - assert と同じ構文なのにエラー時に詳細な情報を出してくれる、アサーションライブラリ
  - 「最初は標準の assert で書いて、アプリが大きくなりそうなら power-assert へ一括置換」という戦略が取れるのが個人的には大きい
  - AST をしているので、ES6, CoffeeScript, TypeScript など他の AltJS を使用していると若干設定が必要になる
- [sinon](https://www.npmjs.com/package/sinon)
  - テスト用のモックライブラリ
  - `var stub = sinon.stub(obj, 'method', function() {})` のような感じで挙動をモックしたり、監視したりできる
  - どうしても API を覚えられなく、毎度ドキュメントを参照しながら使っている
- [superagent](https://www.npmjs.com/package/superagent), [supertest](https://www.npmjs.com/package/supertest)
  - ブラウザを介さずに HTTPリクエストや express の route （所謂コントローラorアクション、URIに対応している処理）を検証するもの
- [monky](https://github.com/behrendtio/monky)
  - Node.js版 `factory_girl`。まぁ動く
- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
  - ブラウザを操作してテストしてくれる、いわゆる E2E テストツール
  - 類似ツール内では、最も歴史が古く使われている Selenium 準拠である、という点に魅力を感じて選んだ。しかし、思ったより安定していなく、更に DOM セレクタが凄く足りてなくて不便
  - 次は違うものを探す予定
- [testem](https://www.npmjs.com/package/testem)
  - ブラウザ内で、mocha や Jasmine などのテストコードを実行できる
  - 強力な点は、node 上で実行するために書いたテストコードをそのままブラウザ内で実行できるということ
  - 例えば、node 用のモジュールを browserify 経由でクライアントJS化する際に、node 用に書いたテストがそのまま再利用できる


## CLI/CUI ツール作成
- [minimist](https://www.npmjs.com/package/minimist)
  - getopt 的なコマンド引数のパーサー
  - [commander](https://www.npmjs.com/package/commander) など他にもいくつかあるが、その中で最もスモール・イズ・ビューティフルなもので好み
- [keypress](https://www.npmjs.com/package/keypress) 
  - キー入力を標準入力から取得した場合に、解析してくれるもの
  - 例えば、K を入力したならこんな感じに `{ name: 'k', sequence: 'K', ctrl: false }` 解析してくれる
- [blessed](https://www.npmjs.com/package/blessed)
  - Node.js 版 curses、DOMのように要素を組み立ててビューを作る
  - 設計などに目新しさはないけど、実直なライブラリで好き
  - ただ少しドキュメントが足りない感じで、検証コードを都度書かないと不安。興味あれば[ご覧ください](https://github.com/kjirou/nodejs-codes/tree/master/examples/blessed)
  - 何故 `blessed`(祝福された) なのかと思ったら、`curses`(呪い)の逆ってことなんですね。多分
- [react-blessed](https://github.com/Yomguithereal/react-blessed)
  - React 形式で書けるライブラリ。ビューを書く際の枠組み他に無いというのもあり、非常に有り難い
  - 安定性が気になるところだと思うが、[少し使った感じ](https://github.com/kjirou/escape-from-the-maze)は大丈夫だった
  - ブラウザと違い VDom 処理が速度に貢献しないので、描画性能は生 blessed と較べて大分落ちているとは思う。ただ、そもそもターミナル出力は充分高速なので気にならない


## ユーティリティ
- [lodash](https://www.npmjs.com/package/lodash)
  - ユーティリティ関数一式のライブラリ
  - 元々は [underscore](https://www.npmjs.com/package/underscore) の高速改善版という位置づけだったが、今はもう別物と認識した方がいい。Backbone.jsを使うのでなければ、こっちにした方が
  - [lodash.assign](https://www.npmjs.com/package/lodash.assign) のように1つの関数だけ別にモジュール化しているシリーズもあり、軽さに配慮するならこちらを使うと良い
- [underscore.string](https://www.npmjs.com/package/underscore.string)
  - 文字列操作用のユーティリティ関数群
  - `numberFormat`, `pad`, `classify`, `titleize`, `humanize` などを良く使っている
- [chalk](https://www.npmjs.com/package/chalk)
  - 標準出力に色を付けられる Colorize ライブラリ
  - 別に有名なもので [colors](https://www.npmjs.com/package/colors) というものもあるが、こちらは string にメソッドを生やしたりなど影響範囲が大きい。そこまでせんでも、って思う
- [async](https://www.npmjs.com/package/async)
  - コールバックによる非同期処理の連鎖を綺麗に書けるようにしてくれるフレームワーク
  - ひたすらコールバックのネストで書くよりは、`async.series`, `async.parallel` だけでも使って平たくまとめると保守性が段違い
  - 他にも `waterfall`, `eachSeries` などの便利関数はあるが、覚えるのが大変なのであまり自分は使ってない
- [bluebird](https://www.npmjs.com/package/bluebird)
  - `Promises/A+` 互換の Promise クラスを提供してくれる
  - nodeなら標準で入ってるけど、browserify使用時にクロスブラウザ吸収のために `global.Promise = require('bluebird');` を良く書く


## ツール
- [browserify](https://www.npmjs.com/package/browserify)
  - nodeのソースコードを、クライアントJSとして動作できる様に、一枚の.jsに変換・結合してくれる。素晴らしい、実に素晴らしいツール（大事なことなので二回言いました）
  - 説明が難しいので、上記でピンとこなかったらお手数ですが各人調査願います
  - 同様のより多機能な [webpack](https://www.npmjs.com/package/webpack) というツールもあるが、browserify の方がデファクト
- [gulp](https://www.npmjs.com/package/gulp)
  - 説明不要だと思うけど一応。タスクランナー
  - これを使わずに、コマンドをつないで [npm run-script](https://docs.npmjs.com/cli/run-script) に記載するのでも良いが、それで破綻してきたら諦めて使うのが吉
- [eslint](https://www.npmjs.com/package/eslint)
  - Lint ツール。ES6対応してたり、マイルールを設定出来たり、便利
- [http-server](https://www.npmjs.com/package/http-server)
  - 簡易 Web サーバー。静的なHTMLなどを開発用に表示したい場合に
- [nodemon](https://www.npmjs.com/package/nodemon), [node-dev](https://www.npmjs.com/package/node-dev)
  - 開発用で、ソースコード変更時に自動で node プロセスを再起動してくれる
- [licensify](https://www.npmjs.com/package/licensify)
  - browserify でクライアントJSを生成する際に、ライセンス情報を自動で記載してくれる
  - 今現在、元ライセンス条項をコピーするなどして頑張っている方は、アプローチが面白いので仕組みだけでも把握して置くと良さそう
- [fixpack](https://www.npmjs.com/package/fixpack)
  - package.json のディレクティブ順を、決まったルールでソートしてくれる
  - `"private": true` どこに入れるの？上なの？下なの？と悩むことが良く合ったので助かった


## AltJS / AltCSS / その他トランスパイラ関係
- AltJS は例えば [babel](https://www.npmjs.com/package/babel), [coffee-script](https://www.npmjs.com/package/coffee-script), [typescript](https://www.npmjs.com/package/typescript) など、AltCSS は例えば [stylus](https://www.npmjs.com/package/stylus), [node-sass](https://www.npmjs.com/package/node-sass), [less](https://www.npmjs.com/package/less) などがある。また、cssnext が使いたいなら [postcss](https://www.npmjs.com/package/postcss) というものもある
- 単品で変換したい場合は、ほぼ必ず付属のコマンドがあるので、`npm install -g` してそのコマンドを使えば利用できる
- しかし、案件で使う場合は、「一部のファイルだけをビルドしたい」「watchしたい」「変換後にminifyしたい」「並列で変換処理をしたい」など、トランスパイリングに伴って様々な要望が発生すると思うので、その際はシェルでコマンドを組み立てるか、それでもダメな時は gulp や grunt と連携するしかない
- また、[watchify](https://github.com/substack/watchify) などの特定の状況だけを解決するツールもあるので、そういうのを探すのもいいかも

----

## 以上

皆様のノウハウも、是非シェアして欲しいと思って書いてみました。
