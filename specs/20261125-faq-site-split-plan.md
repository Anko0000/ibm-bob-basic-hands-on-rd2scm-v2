# 実装計画書: FAQサイト ファイル構成分割

## 基本情報

* 仕様書: 20261125-faq-site-split-spec.md
* 作成日時: 2026-11-25T15:39:53+09:00
* 更新日時: 2026-11-25T15:39:53+09:00
* 作成者:
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
| --- | --- | --- |
| `faq/index.html` | 新規 | HTMLのみ（`<link>` と `<script src>` で外部ファイル参照） |
| `faq/style.css` | 新規 | 既存 `index.html` の `<style>` ブロックの内容を移動 |
| `faq/script.js` | 新規 | 既存 `index.html` の `<script>` ブロックの内容を移動 |
| `index.html` | 変更なし | ルート直下のファイルはそのまま維持 |

## 実装手順

1. 既存の `index.html` から `<style>` タグ内のCSSを抽出して `faq/style.css` を作成する
2. 既存の `index.html` から `<script>` タグ内のJavaScriptを抽出して `faq/script.js` を作成する
3. `faq/index.html` を作成する:
   - HTMLの骨格（`<!DOCTYPE html>` 〜 `</html>`）はそのままコピー
   - `<style>` ブロックを `<link rel="stylesheet" href="style.css">` に置き換える
   - インラインの `<script>` ブロックを `<script src="script.js"></script>` に置き換える

## GUI実装

対象外（機能・表示の変更なし）

## テストの追加・更新

手動確認のみ:

- `open faq/index.html` でブラウザ表示を確認する
- アコーディオンの開閉が動作することを確認する
- 検索機能が動作することを確認する

## 検証計画

1. `faq/index.html` をブラウザで直接開き、FAQサイトが表示されることを確認する
2. アコーディオンのクリック開閉を確認する
3. 検索ボックスでキーワード入力→絞り込みが動作することを確認する
4. ブラウザの DevTools → Network タブで `style.css` と `script.js` が正しく読み込まれていることを確認する

## 移行・ロールバック

* 新規ファイルのみ作成のため、既存 `index.html` への影響なし
* ロールバックが必要な場合は `faq/` フォルダを削除するだけでよい

## 未解決事項

なし
