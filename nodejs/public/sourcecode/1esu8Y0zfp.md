---
title: 【React Native入門】Java Scriptでアプリ作ろう【Reactやったことない人向け】１
tags: reactjs reactnative JavaScript iOS
author: YutamaKotaro
slide: false
---
その２[【React Native入門】Java Scriptでアプリ作ろう【Reactやったことない人向け】2](https://qiita.com/YutamaKotaro/items/0521d83049536e451f15)

# はじめに
後輩がReact Nativeの入門記事ないかって調べてたら僕の記事を見つけたらしい・・・。

<img width="725" alt="スクリーンショット 2017-10-24 0.41.06.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/c804821b-e14c-8107-828f-6d098dbbbb8c.png">

ということで調べてみると僕がReact Nativeはじめたての頃の記事が出てきた！
僕がちゃんとこの業界に入りだしたのもこのぐらいで、このころはQiitaすらやってなくてQiitaの発音もわからないほどだった。なのでQiitaというよくわかんないけど検索すると出てくるいろいろと記事の書いてあるサイトという認識でしかなかったと思われる。ゆえにサクラドメインでブログを作ったのだと思う。このころはgitの使い方すらわからなかった・・・・。

せっかくなのでこのサイトに書いてあることを掘り起こしつつ最近の書き方を踏襲しつつ、当時の僕でもわかるようにTodoアプリぐらいは作れるようになるような感じで書いていきたいと思います。

僕の書いた記事だけでなく、他の方の書いた記事もリンクとして転載しております。
何卒ご容赦くださいませ。

# React Native ?
React（JavaScript）でアプリを作れるフレームワークです。
かつてよくHTML5アプリという響きのワードを聞いていたのですがそれとは別物で、Swiftとかで作るネイティブアプリとHTML5アプリの中間ぐらいの位置にいます。
HTML５アプリはwebViewを使ったアプリですが、React NativeはネイティブアプリのUI部品をそのまま使うので見た目はネイティブアプリにかなり近くなります。ですが、JavaScriptで動くのでJavaScriptとReactを覚えればネイティブアプリを作れるようになります。

facebookやinstagramのアプリがReact Nativeで作られています。また、国内でもかなり普及してきて多くの企業で使われるようになってきています。

企業の導入事例についてはこの前技術書典で出させていただきました！

# 対象者

- プログラミングはじめたてでアプリ作りたい
- JavaScriptは覚えた！
- 黒画面怖い
- mac使ってるよー

っていう方のお役に立てるような記事を書いていきたいです！。なのでとても優しい記事にしていきたいと思います・・・。そんなことわかってるわ！とかは言わないようにお願いします。
ハンズオンでは時間の制約があったりと本当にあっさりなので、それよりも深良い感じになったらなと思います。

# 必要なもの

- XCode
- node
- homebrew
- テキストエディタ

## XCode

今からはiOSアプリを作るので、これがいります！がSwiftを触ったりはしないので安心してください。
インストールしてない人は[App Store](https://itunes.apple.com/jp/app/xcode/id497799835?mt=12)からインストールします。
久しく触っていない人はXCodeのアップデートをしておいてください。


## node

ターミナルを開いて、

```
node -v
```

と打ってください。

<img width="138" alt="スクリーンショット 2017-10-24 0.59.03.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/a02476bb-7174-4dd6-5c67-047fdcee2b82.png">

こんな感じにバージョンが表示される人はOKです！
古すぎるバージョンの人はバージョンを上げておいた方が良いかも。

入っていない方はここの記事を参考にインストールしてください。
**注意点としては0.10.12は古すぎるので8.6.0など新しいものを入れてください**

[node.jsのversionを管理するためにnodebrewを利用する](https://qiita.com/sinmetal/items/154e81823f386279b33c)

```
node -v
```

でバージョンが表示されたらOKです。

### node？
サーバサイドで動くJavaScriptです。Node.jsのことです。
開発中に必要なのでいれました。Node.js上でコードが動くんですが、これをどうにかしたりはしません。
覚えておくと今後サーバサイドもかけるようになりますのでおすすめです！
[node-express-curriculm](https://github.com/osamu38/node-express-curriculum)という記事があるので気になった方はそちらを参考にサーバサイドをjsで書くことをやってみてください！（僕の友達が書いているのでバグとかいろいろあったらお教えください）

### nodebrew?
nodeのバージョン管理ツールです。いろんなものがありますが僕はnodebrewを使っています。
最近はnvmの方がインストール早いんじゃないかとちょっと思ってます。
割とnodeのバージョンを変更することがあるので、管理ツールを入れておくととても便利です。

# homebrew

これも必要になってきます。
<img width="403" alt="スクリーンショット 2017-10-24 1.00.57.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/ed64754b-5d56-b8cb-964e-b861750e3e5a.png">

いろんな用途で使えるので入れておいて損はないです。
[インストール](https://brew.sh/index_ja.html)はこちら

この子の出番はあとで一瞬だけ出てきます。

# テキストエディタ
僕はVSCodeを使っているのでそちらをオススメします。

<img width="215" alt="スクリーンショット 2017-10-24 1.18.43.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/002c4e85-f4d9-d8ba-64e7-f6d6ccf4e84f.png">

[インストールはこちら](https://code.visualstudio.com/)

これはカスタマイズせずともいろいろできるので僕みたいなめんどくさがりにはオススメです。

<img width="317" alt="スクリーンショット 2017-10-24 1.21.09.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/9f5b4244-b445-a5bf-c617-321eddc3a0ad.png">

こんな感じに便利なプラグインを入れることができます。

- file-icons(ファイルのアイコン設定)
- Code Spell Checker（コードのスペルを確認する。typo防止）

ぐらいはあると良いかもです。

# 環境構築

```
brew install watchman
```

をターミナルで打ってください。
次に

```
npm install -g react-native-cli
```

を打ちます。
以上で環境構築は終わりです！


## watchman？
ファイル監視ツールです。使い方を覚えたりする必要はほとんどありません。よしなにしてくれます。
ファイルを変更したけども反映されないという事態がごく稀にあります。そうした場合、watchman関連の何かがおかしいので確認してみるといいかもしれません。

## react-native-cli?
React Native関連のコマンドを打つのに必要になります。


# プロジェクト作成

```
cd ~/Desktop/
react-native init sample
```

と打ちます。するとデスクトップにsampleというフォルダが出てきたと思います。
もちろんデスクトップじゃなくても大丈夫です。

# 起動

Desktop/sample/ios/sample.xcodeprojを開きます。そしてRunボタンを押します。

<img width="124" alt="スクリーンショット 2017-10-26 23.06.27.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/d5f3eb7a-2e8c-4824-775a-ab1f3fb1e36b.png">

するとエミュレーターが立ち上がります。

<img width="400" alt="スクリーンショット 2017-10-26 23.18.57.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/4397d1b9-ff93-0c3e-c115-963505df3b06.png">

こんな感じでエミュレーターがたちあがります。

## 起動コマンド
CLIで

```
react-native run-ios
```

を実行することでも起動可能です。基本的にはこちらを実行しますがXCodeを触る場面も多々あるので、XCodeからの起動方法をかきました。

# 構文解説

index.jsとApp.jsがあるかと思いますが、あんまりindex.jsを触ることはありません。このチュートリアルで大切なReactの構文を解説するためにApp.jsを解説します。

```js:App.js

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```

App.jsはこのようになっているかと思います。

## import
必要なモジュールを読み込むための構文です。

```js
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
```

割とおきまりのパターンです。

```js
import 名前　from 'インポート元'
```

といった構文になります。途中、`{}`というシンタックスが入りますがこれはオブジェクトの中にあるプロパティを抜き出すもので、

```
import React, { Component } from 'react';
```

という構文は、reactをインポートしてReactとして宣言、React.ComponentをComponentとして宣言ということになります。Reactを使う時はReactという名前であることが必要なので

```
import Hoge, { Component } from 'react';
```

とはしないでください。

```js

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
```
これはreact-nativeから色々読み込んでいます。
なにやら色々と読み込んでいますが、これらに関する説明は後述します。
このようにReact Nativeではreact-nativeから色々と読み込んで使用するというスタイルが主流になります。

詳しくは[こちら](https://facebook.github.io/react-native/docs/components-and-apis.html)をご覧ください。

## Platform

```
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
```

Platformはios, androidといったプラットフォームによって処理などを分ける際に使います。
この場合は、ios, androidでそれぞれ異なる文字列をinstructionsに代入しています。
ちなみに`const`は再代入不可の変数を宣言する時に使います。

実際にアプリを作る時にはプラットフォームごとに対応する必要があることがあります。
そのための方法は、他にも色々ありますので詳しくはこちらをご覧ください。

[【React-Native】iOS, Android両対応する。](https://qiita.com/YutamaKotaro/items/225d91b9944169c2e518)

## React

Reactではコンポーネントと呼ばれる画面部品をつくってそれを組み合わせることで画面を作って行きます。
下記記述がコンンポーネントの定義になります。

```js

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

```

class構文となっています。大切なのは二つあって、一つは

```
export default class App extends Component<{}>
```

です。
`export default`と定義することで外部から読み込めるようにしています。
`extends Component`はコンポーネントをする上では欠かせない記述でこれを行うことによってReactのコンポーネントになります。
`<{}>`はflowの書式です。

flowは今は覚える必要はありませんが、保守的な面でかなり効果を発揮するので本格的な開発の場面では採用の価値ありかもしれません。
詳しくはこちらをご覧ください。

[Reactにflowtypeを導入したまとめ](https://qiita.com/takanorip/items/603365d2471104ac7d51)


次に重要な部分は

```js

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
```
この部分になります。
renderメソッドを定義しています。このrenderメソッドはReactの持っているメソッドで、ここでreturnしたものが表示されるものになります。

この時、`<View>`, `<Text>`という見慣れない記述がありますがこれがReact Nativeにおける書式そのものになります。
通常Reactでは`<div>`, `<span>`といったタグを使いますが、その代わりにReact Nativeのコンポーネントを使用します。

## View
非常によく使います。
divと近い役割だと認識されるとちょうど良いかもしれません。
ただしdivとは異なり、中には文字を書く事をできません。入れ物の役割を果たします。

## Text
非常によく使います。
spanと近い役割だと認識されるとちょうど良いかもしれません。文字を描写するためには必ず`Text`で囲う必要があります。

# StyleSheet
最後に下記記述があります。これはスタイルの定義になります。

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```

cssの基礎知識が必要になります。
またスタイルはCSS in JSで定義して行きます。CSS in JSは基本的にはCSSと同じなんですが、CSSをjsのオブジェクトとして定義します。CSS in　JSのルールをまとめると、

- background-colorのようにハイフンがあるものはbackgroundColorのようにキャメルケースで定義
- 数字以外のプロパティは文字列で定義。cssだと`red`と使えますがCSS in JSでは`'red'`のように文字列で定義します。
- セレクタは存在しない。
- style属性にスタイルを当てる

といった特徴があります。
StyleSheetについては最初のうちはcreateメソッドだけを覚えておけば差し支えありません。

他の便利メソッドやStyleSheetの存在意義については

[【React-Native】StyleSheetについて](https://qiita.com/YutamaKotaro/items/d0cd253c998f9b28dd55)

こちらをご覧ください。

この定義ではcontainer, welcome, instructionsという３つのスタイルをstylesという変数に定義しています。
定義したスタイルは、

```html
<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
```

`style={styles.container}`のように適用します。これがstyle属性にスタイルを当てるということになります。


containerについて解説します。

```js

container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
```

このように定義します。
flex: 1という記述によって画面全体に表示するようになっています。
flexは頻出なので理解しておく事をおすすめします。
flexに関する仕様については

[React Native flexプロパティ、段組配置、固定要素配置方法](https://qiita.com/YutamaKotaro/items/b6e37c0314a258debaf3)

こちらをご覧ください。

```js
    justifyContent: 'center',
    alignItems: 'center',
```

という記述はcssのflexと同じです。これによって中心に揃うレイアウトになっています。

```js
backgroundColor: '#F5FCFF',
```

は見たままの通り背景色を定義しています。

# ファイルの編集
解説もあきあきしてきたことですし、実際にファイルを編集してみましょう！

```
export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Nativeへようこそ!
        </Text>
        <Text style={styles.instructions}>
          React Nativeで広がるアプリの世界
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

```

のようにファイルのテキストを編集してください。
また、スタイルの変更も行います。

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 5,
  },
});

```

のようにスタイルを変更します。
containerの背景色を変更して、welcome, instructionの文字色を変更しました。

ファイルの保存を忘れずにして、エミュレーター上でcmd + Rを押します。するとリロードが走ります。

<img width="403" alt="スクリーンショット 2017-10-29 12.11.04.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/8cc99b0a-9e55-e8c7-b8ca-3672d7e0f63a.png">


この時赤い画面が出たかたはコード上にどこか間違いがありますので間違いを修正して、もう一度リロードしてください。

## ホットリローディング
とても便利な機能としてホットリローディングという機能があります。
この機能を使う事で画面レイアウトの修正は非常に楽になります。

エミュレーター上でcmd + Dを押すとメニューが出ます。
<img width="395" alt="スクリーンショット 2017-10-29 12.12.38.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/a50c60ca-513b-1dc1-34b4-9444c878381c.png">

ここでEnable Hot Reloadingを押してください。

```
<Text style={styles.welcome}>
          React Nativeへとうこそ!
        </Text>
```

とようこそをとうこそに変えてみました。
とうこそについては[こちら](https://www43.atwiki.jp/edf_2p/pages/35.html#id_aff47a4b)をご覧ください。

保存をしてエミュレーターを確認するとリロードなしに

<img width="395" alt="スクリーンショット 2017-10-29 12.16.51.png" src="https://qiita-image-store.s3.amazonaws.com/0/121851/c6fad56b-44bc-f412-b569-040aaf2561d5.png">


のように変わっています。
非常に便利な機能です。時折正常に動かないことがあるのでおかしいと思ったらcmd + Rで普通にリロードしてみると治ります。


以上でこの記事は終わりです。次はTodoアプリに向けて頑張って行きます。

続き
その２[【React Native入門】Java Scriptでアプリ作ろう【Reactやったことない人向け】2](https://qiita.com/YutamaKotaro/items/0521d83049536e451f15)