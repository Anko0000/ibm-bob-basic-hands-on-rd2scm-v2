# 実装計画書: FAQサイト機能追加（Bob画像・グラデーション・ダークテーマ）

## 基本情報

* 仕様書: 20261125-faq-site-enhance-spec.md
* 作成日時: 2026-11-25T15:45:28+09:00
* 更新日時: 2026-11-25T16:30:00+09:00
* 作成者:
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
| --- | --- | --- |
| `index.html` | 修正 | HTML・CSS・JSを変更して4機能を追加 |

## 実装手順

### サブタスク 1: Bob画像の挿入とリンクの付与

**Intent**: ヘッダー左上にBob画像を表示し、外部リンクを付与する。

**Expected Outcomes**:
- ヘッダー左上に `bob.svg` が表示される（高さ約48px）
- 画像クリックで `https://www.ibm.com/products/bob` が新しいタブで開く
- 既存のヘッダーテキスト「IBM Bob」ラベルを削除する（画像で代替）

**Todo List**:
1. `.site-header__inner` にロゴエリアを追加（左：ロゴ+テキスト、右：ダークテーマボタン用のflexレイアウト準備）
2. `<a href="https://www.ibm.com/products/bob" target="_blank" rel="noopener noreferrer">` で囲んだ `<img src="bob.svg" alt="IBM Bob" class="site-header__logo">` を追加
3. `.site-header__label`（"IBM Bob"テキスト）を削除
4. `.site-header__logo` のCSSを追加（`height: 48px`、`display: block`）

**Relevant Context**:
- 対象HTML: `index.html` 352〜358行目（ヘッダーブロック）
- 現在のクラス: `.site-header__label`, `.site-header__inner`
- `bob.svg` は `index.html` と同一ディレクトリ

**Status**: [x] done

---

### サブタスク 2: グラデーションテーマカラーの適用

**Intent**: ヘッダーと検索エリアの背景をBob SVGのグラデーション配色に変更する。

**Expected Outcomes**:
- `.site-header` の背景が `linear-gradient(135deg, #0f62fe, #a56eff)` になる
- `.search-area` の背景が `linear-gradient(135deg, #0f62fe, #a56eff)` になる
- テキスト・ボーダーカラーに影響なし

**Todo List**:
1. `.site-header` の `background-color: var(--gray-100)` を `background: linear-gradient(135deg, #0f62fe, #a56eff)` に変更
2. `.search-area` の `background-color: var(--ibm-blue-60)` を `background: linear-gradient(135deg, #0f62fe, #a56eff)` に変更

**Relevant Context**:
- 対象CSS: `index.html` 46〜50行目（`.site-header`）、81〜84行目（`.search-area`）

**Status**: [x] done

---

### サブタスク 3: ダークテーマの追加

**Intent**: ダーク/ライト切り替えボタンをヘッダー右上に追加し、テーマ切り替えをCSS変数とJSで実装する。

**Expected Outcomes**:
- ヘッダー右上に切り替えボタン（🌙 / ☀️）が表示される
- クリックでダーク/ライトテーマが即時切り替わる
- ダークテーマ時: 本文背景 `#161616`、テキスト `#f4f4f4`、カード背景 `#262626`、ボーダー `#393939`
- テーマ設定がlocalStorageに保存され、リロード後も維持される
- ヘッダー・検索エリアのグラデーションはダーク/ライト共通

**Todo List**:
1. CSSに `body[data-theme="dark"]` セレクターでダークテーマCSS変数を定義する
   - `--white: #161616`（本文背景）
   - `--gray-100: #f4f4f4`（テキスト）
   - `--gray-10: #262626`（セクション背景）
   - `--gray-20: #393939`（ボーダー）
   - `--gray-30: #6f6f6f`
   - `--gray-80: #c6c6c6`
   - 検索ボックス背景・テキストカラーの上書き
2. ヘッダーHTML内の右側に切り替えボタン `<button class="theme-toggle" id="theme-toggle" aria-label="ダークテーマに切り替え">🌙</button>` を追加
3. `.theme-toggle` のCSSを追加（背景なし、テキスト白、ボーダーなし、カーソルポインター、フォントサイズ 1.25rem）
4. JavaScriptに以下のロジックを追加:
   - ページ読み込み時にlocalStorageからテーマを復元する
   - ボタンクリックで `body` の `data-theme` 属性をトグルし、localStorageに保存する
   - ボタンのアイコンと `aria-label` を切り替える（ライト時: 🌙「ダークテーマに切り替え」/ ダーク時: ☀️「ライトテーマに切り替え」）

**Relevant Context**:
- 対象CSS: `index.html` 7〜347行目（`<style>` ブロック全体）
- 対象JS: `index.html` 644〜720行目（`<script>` ブロック）
- 対象HTML: ヘッダーの `.site-header__inner`

**Status**: [x] done

---

## GUI実装

* **対象コンポーネント**: `index.html` のヘッダー、CSSスタイル、JavaScriptロジック
* **スタイル**: CSS変数（`:root`）とダークテーマ上書き（`body[data-theme="dark"]`）で管理。グラデーションは `linear-gradient(135deg, #0f62fe, #a56eff)`
* **状態管理**: `body` の `data-theme` 属性でテーマ管理。localStorageで永続化
* **画面遷移**: ページ内のテーマ切り替えのみ。外部リンクは新しいタブで開く
* **レスポンシブ対応**: Bob画像は `height: 48px; width: auto` でアスペクト比を維持。スマートフォン（768px以下）でも適切に表示

## テストの追加・更新

自動テストなし。手動検証のみ。

## 検証計画

1. `index.html` をブラウザ（`file://`）で開き、Bob画像がヘッダー左上に表示されることを確認する
2. Bob画像をクリックして `https://www.ibm.com/products/bob` が新しいタブで開くことを確認する
3. ヘッダーと検索エリアにグラデーションが表示されていることを確認する
4. 切り替えボタンをクリックしてダーク/ライトテーマが切り替わることを確認する
5. ページをリロードしてテーマ設定が保持されていることを確認する
6. Chrome DevToolsのデバイスエミュレーターでスマートフォン表示を確認する

## 移行・ロールバック

- 変更前の `index.html` をgitで復元可能
- localStorageのキーは `faq-theme`（他の用途と競合しない）

## 未解決事項

なし
