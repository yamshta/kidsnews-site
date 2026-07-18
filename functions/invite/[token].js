/// `/invite/{token}` を招待ページ（`/invite/index.html`）の中身で 200 応答する。
///
/// token はページ側では使わない — iOS は Universal Links (AASA) で URL から直接読み取り、
/// このページはアプリ未インストール時のフォールバックとしてのみ表示される。
///
/// `_redirects` の `/invite/* /invite/ 200` が使えないため Function にしている:
/// rewrite 先の `/invite/` 自身が同じルールに再マッチしてループし、404 になる。
export const onRequest = ({ request, env }) => {
  const url = new URL(request.url);
  url.pathname = "/invite/";
  return env.ASSETS.fetch(new Request(url, request));
};
