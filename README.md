# kidsnews-site

こども新聞（KidsNews）の公式サイト。Cloudflare Pages で配信（カスタムドメイン `kodomoshimbun.app`）。

主目的:
- App Store のマーケティング / サポート / プライバシーポリシー URL のホスト
- 招待リンク（Universal Links: `https://kodomoshimbun.app/invite/{token}`）の着地ページと AASA 配信

```
.
├── index.html                            # LP（ja）
├── privacy/index.html                    # プライバシーポリシー
├── support/index.html                    # サポート
├── invite/index.html                     # 招待リンクの着地ページ（未インストール時の案内）
├── .well-known/apple-app-site-association # Universal Links 設定（Team ID + Bundle ID。秘匿情報ではない）
├── _headers                              # AASA の Content-Type を application/json に固定
└── _redirects                            # /invite/* を invite/index.html へ 200 rewrite
```

## なぜ Cloudflare Pages か（GitHub Pages で不可だった理由）

Universal Links は `/.well-known/apple-app-site-association` を拡張子なし・`Content-Type: application/json`（または `application/pkcs7-mime`）で返す必要がある。GitHub Pages はこのファイルを `application/octet-stream` で返し、Content-Type を変更する手段がない。Cloudflare Pages は `_headers` でパスごとに Content-Type を指定できるため、これに移行した。

`_redirects` の rewrite は 301/302 ではなく **200** を指定している。301/302 はブラウザ側で URL 自体を書き換えてしまい、`{token}` を含む元の URL（`/invite/{token}`）が失われる。200 rewrite なら URL はそのまま `/invite/{token}` を保ちつつ中身だけ `invite/index.html` を返せる。

> 公開リポジトリのため、メールアドレス・API キー等の秘匿情報はコミットしない。
> お問い合わせ導線は App Store のアプリページ「開発元」セクションに統一する。
