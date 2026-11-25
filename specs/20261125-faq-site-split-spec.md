# 仕様書: FAQサイト ファイル構成分割

## 基本情報

* 種別: 追加改修
* 作成日時: 2026-11-25T15:39:53+09:00
* 更新日時: 2026-11-25T15:39:53+09:00
* 作成者:
* ステータス: Approved

## 背景・目的

既存の `index.html`（HTML/CSS/JS 一体型）を、`faq/` フォルダにHTML・CSS・JSの3ファイルに分割する。
メンテナンス性を高め、各ファイルの役割を明確にすることを目的とする。

## 現在の挙動

`index.html` にHTMLの構造・CSSスタイル・JavaScriptがすべて `<style>` タグと `<script>` タグに埋め込まれている。

## 期待する挙動

`faq/` フォルダに以下の3ファイルが存在し、`faq/index.html` をブラウザで開くと既存と同じFAQサイトが表示・動作する。

```
faq/
├── index.html   （HTML構造のみ）
├── style.css    （CSSスタイル）
└── script.js    （JavaScript）
```

## 対象範囲・対象外

### 対象範囲

- `faq/` フォルダの新規作成
- `faq/index.html` の新規作成（HTMLのみ、`<link>` と `<script src>` で外部ファイルを参照）
- `faq/style.css` の新規作成（`index.html` から `<style>` ブロックの内容を移動）
- `faq/script.js` の新規作成（`index.html` から `<script>` ブロックの内容を移動）

### 対象外

- リポジトリ直下の `index.html` は変更・削除しない
- FAQコンテンツ・機能・デザインの変更なし
- 既存の仕様書・実装計画書の変更なし

## 利用者・影響システム

- Webブラウザで `faq/index.html` を閲覧するユーザー
- リポジトリ直下の `index.html` には影響なし

## 主な仕様

1. `faq/index.html` のHTMLヘッダー内に `<link rel="stylesheet" href="style.css">` を追加する
2. `faq/index.html` のbody末尾の `<script>` タグを `<script src="script.js"></script>` に置き換える
3. `faq/style.css` には既存 `index.html` の `<style>` タグ内容をそのままコピーする
4. `faq/script.js` には既存 `index.html` の `<script>` タグ内容をそのままコピーする
5. 機能・デザイン・コンテンツの変更は一切行わない

## 制約・非機能要件

- 外部CDN不使用の制約はそのまま維持する
- `faq/index.html` を `file://` プロトコルで直接開いても動作すること（相対パス参照）

## UI・画面仕様

対象外（機能・表示の変更なし）

## 完了条件

1. `faq/index.html`・`faq/style.css`・`faq/script.js` の3ファイルが作成されている
2. `faq/index.html` から CSS・JS が相対パスで正しく参照されている
3. `faq/index.html` をブラウザで開くと既存の `index.html` と同じFAQサイトが表示・動作する

## 確認方法

- `open faq/index.html` でブラウザ表示を確認する
- アコーディオン・検索機能が正常に動作することを確認する

## リスク・懸念点

- `file://` プロトコルでの相対パス参照は一般的に問題ないが、ブラウザのセキュリティ設定によっては外部ファイル読み込みに制限がかかる場合がある（その場合はローカルサーバーを使用する）
