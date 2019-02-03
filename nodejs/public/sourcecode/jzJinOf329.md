---
title: WebpackのCommonJSプロジェクトをES Modulesに移行する
tags: babel ESModules webpack 移行応援 JavaScript
author: jkr_2255
slide: false
---
プロジェクトでシステムやコードの書き方などを新しいものに移行する場合、移行中の「つなぎ目」がいちばん厄介になることも少なくありません。今回は、WebpackでまとめていたCommonJSプロジェクトをES Modulesに移行するにあたって、どんなことが起きたかという話です。

# 移行を考えたきっかけ

ES Modulesがブラウザで導入されたのを知って面白そうだなと思っていたのですが、Webpack環境でわざわざCommonJSから移行するインセンティブはあまりありませんでした。ところが、ES Modulesだけに使える[最適化プラグインの存在を知った](https://qiita.com/jkr_2255/items/83de78d8bf621d9fb03e)などの事情もあって、「せっかくだし移行してみるか」と思い始めた次第です。

なお、コード自体はBabelに通すES6で書いていて、通常のJavaScript以外にRiot.jsのタグもある、という状況です。

# Module or CommonJS?

最新のNode.jsでは`.mjs`という拡張子にすることでES Modulesを識別する仕組みになっていますが、Webpack 3ではそうではなく、「Modulesとしての`import`もしくは`export`の行がある」ならES Modulesと判定するようになっています。

なお、ES Modulesと判定されたコードの中に`module.exports`があるとさすがに正常に動作しませんが、`require`のほうは正常に動作します。たとえば「トップレベル以外で`require`しているために、容易に移動できない」ような場合にも、とりあえずはそのまま進めることができます[^1]。

逆に、既存のCommonJSに`import`や`export`が入ると、ES Modulesとみなされます。ES6からの変換に必要なコードを[`babel-plugin-transform-runtime`](https://babeljs.io/docs/plugins/transform-runtime/)で補おうとしたところ、コードが`import`で入ってしまったために、既存のCommonJSコードが壊れる、というトラブルになりました。

# CommonJSとES Modulesのやり取り

まず、既存のnpmモジュールはほぼ全てCommonJSということもあって、それに対応できるように、ES Modulesの`import`でもCommonJSをロードすることは問題なくできるようになっています。

一方で、ES Modulesで`export`したものをCommonJSとして`require`した場合には、状況によって動作が違ってきます。

* 副作用だけ取得する場合（`require('...');`）…特に問題なし
* 名前付きの`export`の場合（`const {foo, bar} = require('...');`）…読み込みは問題ないけど。`export`した側のTree Shakingなどが効かなくなる
* `export default`の場合…`require('...').default`のように明示的に`default`を拾う必要が生じてしまう

ということで、まずはエントリポイント・イベント登録だけ・Riotタグ[^2]のような「`export`がないもの」からES Modulesとして書き直すのがいい、ということになりそうです。


[^1]: `riot-tag-loader`が[`require`固定でコードを生成する](https://github.com/riot/tag-loader/issues/16)ので、これをなんとかしないと混在したままとなってしまいます。
[^2]: `riot.tag2(...)`のように登録してしまうので、`import`で取ってきた値は特に不要です。