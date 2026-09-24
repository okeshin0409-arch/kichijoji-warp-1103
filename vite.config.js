import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 【I-5】SNSシェア（LINE / X など）のプレビュー画像（og:image）は、
// 「https://〜」から始まる完全なURLで書かないと表示されないサービスがある。
// サイトのURLをここに直書きすると、独自ドメインに変えたときに書き換え
// 忘れが起きるため、Netlify がビルド時に自動で渡してくれる環境変数 URL
// （サイトのメインアドレス。独自ドメイン設定時はそちらになる）を使って、
// index.html の %SITE_URL% を置き換える。
// ローカルでのビルド時は URL が無いので空文字（＝相対パス）になるが、
// 公開サイトには影響しない。
function siteUrlPlugin() {
  const siteUrl = (process.env.URL || "").replace(/\/$/, "");
  return {
    name: "site-url",
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", siteUrl);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
});
