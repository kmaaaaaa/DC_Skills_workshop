# Claude Skills 活用ガイド（社内勉強会資料）

Markdown ベースで編集可能な静的 HTML ページ。`content/page.md`（YAML フロントマター + Markdown 本文）を編集し、`npm run build` を実行するだけで `claude-skills-light.html` を再生成できる。

---

## ファイル構成

```
.
├── claude-skills-light.html    # 生成成果物（直接編集禁止）
├── content/
│   └── page.md                 # 編集対象（YAML + Markdown）
├── templates/
│   ├── page.hbs                # メインテンプレート
│   └── partials/               # ブロック種別ごとの Handlebars パーシャル
├── scripts/
│   └── build.js                # ビルドスクリプト
├── package.json
└── docs/plans/                 # 設計ドキュメント
```

---

## クイックスタート

```bash
npm install
npm run build
# → claude-skills-light.html が生成される
# ブラウザで開く:
start claude-skills-light.html   # Windows
```

---

## 編集ワークフロー

1. `content/page.md` を編集する
2. `npm run build` で HTML を再生成する
3. ブラウザをリロードして確認する

> **`claude-skills-light.html` は手動編集禁止。** `npm run build` のたびに上書きされる。

---

## content/page.md の構造

ファイルは **YAML フロントマター**（`---` で囲まれた部分）と **Markdown 本文**（通常は未使用）で構成される。

### 主なトップレベルフィールド

| フィールド | 説明 |
|---|---|
| `page` | タイトル・言語設定 |
| `nav` | ナビゲーションバーのブランド名・リンク一覧 |
| `hero` | トップのキャッチコピー・統計数値 |
| `sections[]` | 本文セクション（各セクションは `blocks[]` を持つ） |
| `footer` | フッターの左右テキスト |

### ブロック種別（`sections[].blocks[].type`）

各ブロックは `type` フィールドで種別を指定する。

| `type` | 用途 | 主な必須フィールド |
|---|---|---|
| `prose` | 通常段落（Markdown） | `md` |
| `h3` | 中見出し | `text` |
| `pull` | 引用ブロック | `body_md`, `cite` |
| `stats` | 統計カード 3 枚 | `items[]` |
| `table` | 汎用表 | `headers[]`, `rows[]` |
| `impact-table` | Before/After 比較表 | `caption`, `headers[]`, `rows[]` |
| `layers` | 3 層構造図 | `items[]` |
| `kitchen` | キッチンアナロジー 2 カード | `items[]` |
| `cats` | カテゴリーカード 3 枚 | `items[]` |
| `matrix` | 2×2 マトリクス | `y_label`, `x_labels`, `cells[]` |
| `steps` | 4 ステップ | `items[]` |
| `dbs` | DBS フレームワーク 3 カード | `items[]` |
| `codeblock` | ダーク背景コードブロック | `lines[]` |
| `usecases` | ユースケース 3 カード | `items[]` |
| `pitfalls` | 落とし穴 4 カード | `items[]` |
| `warn` | 警告ボックス | `title`, `icon`, `body_md` |
| `checklist` | チェックリスト | `title`, `items_md[]` |
| `cta` | コールトゥアクション | `title`, `body`, `button_label`, `button_href` |

---

## 編集の例

### 例 1: ヒーローの数値を変更する

```yaml
hero:
  figure:
    - { key: "日本企業のAI導入率", value: "55.2", unit: "%", caption: "..." }
```

`value: "55.2"` を `value: "60.0"` に変更し、`npm run build` を実行する。

### 例 2: 段落を追加する

既存セクションの `blocks` 配列に `prose` ブロックを追加する。

```yaml
sections:
  - id: s1
    blocks:
      - type: prose
        md: |
          既存の段落テキスト。
      - type: prose
        md: |
          新しく追加する段落。**強調** や `コード` も使える。
```

### 例 3: ナビゲーションリンクを追加する

```yaml
nav:
  links:
    - { href: "#s1", label: "戦略的意義" }
    - { href: "#s2", label: "機能構造" }
    - { href: "#s7", label: "新セクション" }   # 追加
```

---

## トラブルシューティング

### ビルドエラー時

```bash
npm run build
```

エラーメッセージはターミナルに出力される。`Error:` 行を確認する。

### 未知のブロック種別を指定したとき

`build.js` がスキーマ検証を行い、以下のようなメッセージが出る:

```
Unknown block type "foobar" in sections[0].blocks[2]. Known types: prose, h3, ...
```

`type` フィールドの値が上記ブロック種別一覧に含まれるか確認する。

### YAML 構文エラーが出たとき

YAML はインデントに厳密なため、以下を確認する:

- インデントはスペースのみ（タブ禁止）
- 文字列に `:` や `#` を含む場合はクォートで囲む（例: `label: "A: B"`）
- `|` ブロックスカラーの後は 1 行あけてから本文を書く

---

## スコープ外

以下は本パイプラインには含まれない:

- **Watch mode / ライブリロード**: ファイル変更の自動検知・再ビルドはない。編集のたびに `npm run build` を手動実行する
- **ダークテーマ版** (`claude-skills-dark.html`): 別パイプライン
- **新ブロック種別の追加**: `templates/partials/<type>.hbs` の新規作成と `scripts/build.js` の `KNOWN_BLOCK_TYPES` への追記が必要。テキスト編集の範囲外

---

## 設計ドキュメント

詳細なアーキテクチャ・YAML スキーマ設計・実装判断は以下を参照:

- Markdown: `docs/plans/markdown-html-link-system.md`
- HTML 版: `docs/plans/markdown-html-link-system.html`
