---
title: Qiita API v2 を使って投稿一覧を取得する
tags: QiitaAPI Python api
author: test1
---
# 概要

自分のQiita投稿が増えつつあるので、Qiita APIで投稿内容取得していろいろ整理したいなぁと思ってえいって作ったPythonスクリプトメモ

## できるようになること

* Qiita API GET/api/v2/users/:user_id/items のリクエスト
* 結果レスポンスから、指定されたユーザの投稿一覧を取得できる

## 公式ドキュメント

[Qiita API v2ドキュメント](https://qiita.com/api/v2/docs "Qiita API v2ドキュメント")

## およその作業時間

15分

## 必要なもの

* Pythonが実行できる環境

## 注意事項

* 認証していない状態で自分の投稿一覧をさくっととるだけなので、IPアドレスごとに1時間に60回までリクエスト制限があります

## 今回取得できる内容

```
HTTP/1.1 200
Content-Type: application/json

[
  {
    "rendered_body": "<h1>Example</h1>",
    "body": "# Example",
    "coediting": false,
    "comments_count": 100,
    "created_at": "2000-01-01T00:00:00+00:00",
    "group": {
      "created_at": "2000-01-01T00:00:00+00:00",
      "id": 1,
      "name": "Dev",
      "private": false,
      "updated_at": "2000-01-01T00:00:00+00:00",
      "url_name": "dev"
    },
    "id": "4bd431809afb1bb99e4f",
    "likes_count": 100,
    "private": false,
    "reactions_count": 100,
    "tags": [
      {
        "name": "Ruby",
        "versions": [
          "0.0.1"
        ]
      }
    ],
    "title": "Example title",
    "updated_at": "2000-01-01T00:00:00+00:00",
    "url": "https://qiita.com/yaotti/items/4bd431809afb1bb99e4f",
    "user": {
      "description": "Hello, world.",
      "facebook_id": "yaotti",
      "followees_count": 100,
      "followers_count": 200,
      "github_login_name": "yaotti",
      "id": "yaotti",
      "items_count": 300,
      "linkedin_id": "yaotti",
      "location": "Tokyo, Japan",
      "name": "Hiroshige Umino",
      "organization": "Increments Inc",
      "permanent_id": 1,
      "profile_image_url": "https://si0.twimg.com/profile_images/2309761038/1ijg13pfs0dg84sk2y0h_normal.jpeg",
      "twitter_screen_name": "yaotti",
      "website_url": "http://yaotti.hatenablog.com"
    },
    "page_views_count": 100
  }
]
```


投稿記事本文、タイトル、URL、「いいね！」の数とか取れますね。
詳しくは以下を参照。

[Qiita API v2ドキュメント（投稿）](https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF "Qiita API v2ドキュメント（投稿）")

## 取得用Pythonスクリプトサンプル

投稿日時、タイトル、URLを取得して、カンマ区切りで表示する
USER_ID、ITEM_NUM欲しい情報に修正しましょう
必要であれば、ページング（PAGE、PAR_PAGE）を調整します

```python
import http.client
import json

# 表示するユーザ名
USER_ID = "XXXXX"
# ユーザの投稿数
ITEM_NUM = 10
# ページ番号 (1から100まで)
PAGE = "1"
# 1ページあたりに含まれる要素数 (1から100まで)
PAR_PAGE = "100"

conn = http.client.HTTPSConnection("qiita.com", 443)
conn.request("GET", "/api/v2/users/" + USER_ID + "/items?page=" + PAGE + "&per_page=" + PAR_PAGE)
res = conn.getresponse()
print(res.status, res.reason)
data = res.read().decode("utf-8")

# 文字列からJSON オブジェクトへでコード
jsonstr = json.loads(data)

print("==========================================================")
# ヘッダ出力
print("\"no\",\"created_at\",\"tile\",\"url\"")

# 投稿数を指定
for num in range(ITEM_NUM):
    created_at = jsonstr[num]['created_at']
    tile = jsonstr[num]['title']
    url = jsonstr[num]['url']
    
    # ダブルクォートありCSV形式で出力
    print("\"" + str(num) + "\",\"" + created_at + "\",\"" + tile + "\",\"" + url + "\"")

print("==========================================================")
conn.close()
```

## まとめ

とりあえず認証とかせずにリクエスト１本でシンプルに一覧をることができました(^^)
以上！

## 変更履歴

20180707 ページングに対応