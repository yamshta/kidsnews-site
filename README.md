# kidsnews-site

> ⚠️ **このリポジトリは Cloudflare Pages の direct upload 型。`git push` しても本番には反映されない。** マージ後は必ず以下でデプロイする。
>
> ```bash
> npx wrangler pages deploy . --project-name=kidsnews-site --branch=main
> ```
>
> 実行には環境変数 `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` が必要（値そのものはここに書かない）。
>
> デプロイ後は以下3点を確認する:
> - `https://kodomoshimbun.app/.well-known/apple-app-site-association` が 200 かつ `Content-Type: application/json`
> - `https://kodomoshimbun.app/invite/適当なtoken` が 200
> - 今回修正した該当ページ
>
> AASA (`apple-app-site-association`) は Apple 側 CDN が最大6時間キャッシュするため、デプロイ直後は反映が遅れることがある。Universal Links の不具合調査時はまずこのキャッシュ遅延を疑う。

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
