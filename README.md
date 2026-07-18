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
├── 404.html              # 未知パスの受け皿（無いとトップが 200 で返る）
├── functions/invite/[token].js  # /invite/{token} を招待ページで 200 応答
├── _headers                              # AASA の Content-Type を application/json に固定
```

## なぜ Cloudflare Pages か（GitHub Pages で不可だった理由）

Universal Links は `/.well-known/apple-app-site-association` を拡張子なし・`Content-Type: application/json`（または `application/pkcs7-mime`）で返す必要がある。GitHub Pages はこのファイルを `application/octet-stream` で返し、Content-Type を変更する手段がない。Cloudflare Pages は `_headers` でパスごとに Content-Type を指定できるため、これに移行した。


> 公開リポジトリのため、メールアドレス・API キー等の秘匿情報はコミットしない。
> お問い合わせ導線は App Store のアプリページ「開発元」セクションに統一する。
