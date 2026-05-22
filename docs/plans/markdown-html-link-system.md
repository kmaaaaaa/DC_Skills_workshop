# Markdown ⇄ HTML 連動システム実装計画

**作成日**: 2026-05-21
**対象**: `claude-skills-light.html` を生成するビルドパイプラインの新設
**ステータス**: 計画段階（ユーザー承認待ち）

---

## 1. 目的（What & Why）

現状、`claude-skills-light.html`（約780行）は手書きHTML。文言・数値の変更のたびにHTML本体を直接編集する必要があり、以下の課題がある:

- 構造化されたカード/表/数値が多数あり、視覚的に内容を追いにくい
- 編集時にCSSクラスやSVGアイコン参照を壊すリスクがある
- バージョン管理上、差分が「文章変更」なのか「構造変更」なのか区別しづらい

**解決策**: 編集対象（テキスト・数値・キャプション）を **`content/page.md`（YAMLフロントマター + Markdown本文）** に分離。**Handlebarsテンプレート**で構造を保持し、**`npm run build`** でHTMLを再生成する。

---

## 2. ユーザー回答の前提

| 項目 | 選択 |
|---|---|
| ソース構成 | ハイブリッド（YAML + 本文Markdown） |
| ビルド | 手動（`npm run build`） |
| ランタイム | Node.js |
| 編集範囲 | テキスト編集のみ（見出し・本文・数値・キャプション） |

「テキスト編集のみ」前提のため、カード枚数・表の行数の増減はYAML配列の要素を追加すれば動作するが、**新しいブロック種別の追加はテンプレ修正が必要**である点を明示する。

---

## 3. アーキテクチャ

```
DC_Skills_workshop/
├── claude-skills-light.html       # ビルド成果物（編集禁止）
├── package.json                    # 依存とnpm scripts
├── content/
│   └── page.md                     # YAML frontmatter + Markdown本文（編集対象）
├── templates/
│   ├── page.hbs                    # メインテンプレート
│   └── partials/                   # 各ブロック種別のパーシャル
│       ├── stats.hbs
│       ├── layers.hbs
│       ├── kitchen.hbs
│       ├── cats.hbs
│       ├── matrix.hbs
│       ├── steps.hbs
│       ├── dbs.hbs
│       ├── codeblock.hbs
│       ├── usecases.hbs
│       ├── impact-table.hbs
│       ├── pitfalls.hbs
│       ├── warn.hbs
│       ├── checklist.hbs
│       ├── pull.hbs
│       ├── table.hbs
│       └── cta.hbs
├── scripts/
│   └── build.js                    # ビルドスクリプト
└── README.md                       # 使い方ガイド
```

### 依存ライブラリ（npm）

| パッケージ | 用途 |
|---|---|
| `handlebars` | テンプレートエンジン（パーシャル、ヘルパー対応） |
| `js-yaml` | YAMLフロントマターのパース |
| `gray-matter` | Markdownフロントマター分離 |
| `marked` | Markdown本文 → HTML変換 |

合計4パッケージ。すべて成熟・保守されている軽量ライブラリ。

---

## 4. YAMLスキーマ設計

### 基本方針

- **構造化データ** → YAML（数値、カード配列、表データ）
- **長文プロース** → Markdown本文 or YAML内 `_md` サフィックス付きフィールド（例: `label_md`）
- **`<br/>` 改行を含む見出し** → YAML文字列内に `\n` を入れて `nl2br` ヘルパーで変換、もしくは生HTMLを許可
- **`<strong>`/`<em>`/`<code>` の強調** → Markdownの `**bold**` / `*em*` / `` `code` `` を `marked` で変換

### スキーマ全体像

```yaml
---
page:
  title: "Claude Skills 活用ガイド｜非エンジニアのための完全マニュアル"
  lang: ja

nav:
  brand: "Claude Skills 活用ガイド"
  brand_icon: ico-spark
  links:
    - { href: "#s1", label: "戦略的意義" }
    - { href: "#s2", label: "機能構造" }
    # ...

hero:
  eyebrow: "NON-ENGINEER PLAYBOOK ／ 2026"
  headline_md: |
    非エンジニアのための

    Claude *「Skills」*活用完全ガイド
  # ※ Markdown内の改行を <br/> に、*em* を <em class="accent"> に変換
  lede: "AIを「便利なチャット」から「頼れる自律的なチーム」へ。…"
  meta:
    - { icon: ico-clock, label: "READING 約12分" }
    - { icon: ico-book,  label: "SECTIONS 6章" }
    - { icon: ico-team,  label: "FOR 非エンジニア／管理職" }
  figure:
    - { key: "日本企業のAI導入率", value: "55.2", unit: "%", caption: "営業資料作成・顧客対応にAIを導入" }
    - { key: "仮想チーム規模",   value: "32",   unit: "人分", caption: "1人で完遂する仮想PRチーム（チューリング社）" }
    - { key: "レポート作成時間", value: "7",    unit: "分",   caption: "従来3〜5時間 → 約7分（Rimo社）" }
    - { key: "構築期間",         value: "2",    unit: "週間", caption: "8部門の業務を明文化・統制" }

sections:
  - id: s1
    num: "01"
    icon: ico-flag
    title_md: |
      AIエージェント時代における

      「Skills」の戦略的意義
    subtitle: "対話から自律業務遂行へ ── ビジネスリーダーが「使いこなす側」に回るために"
    blocks:
      - type: prose
        md: |
          2026年現在、AI活用は単なる「対話（チャット）」の域を超え、特定の業務を自律的に遂行する**AIエージェント**へと劇的なシフトを遂げています。…

      - { type: h3, text: "概念の定義：プロンプトから「知的資産（IP）」へ" }

      - type: prose
        md: "Claudeの「Skills（スキル）」とは、頻繁に発生する業務手順を…"

      - type: pull
        body_md: "Skillsは一度作って終わりではなく、「使いながら育てる資産」である。…"
        cite: "—— 戦略的ベネフィットの本質"

      - { type: h3, text: "戦略的ベネフィット：32人分の仕事を1人で完遂する" }

      - type: prose
        md: "Skillsの最大の特徴は、**「コーディング不要でAIに専門業務を教え込める」**点にあります。…"

      - type: stats
        items:
          - org: "チューリング社"
            org_icon: ico-team
            before: "8部門"
            after: "1人"
            label_md: "わずか2週間で **8部門・32人分** に相当する仮想PRチームを構築。全41ファイルのSkillsを明文化し、1人で統制。"
          - org: "Anthropic社"
            org_icon: ico-bolt
            before: "5–10時間"
            after: "30分"
            label_md: "…"
          - org: "Rimo社"
            org_icon: ico-chart
            before: "3–5時間"
            after: "7分"
            label_md: "…"

  - id: s2
    # … (他5セクションも同様)

footer:
  left: "CLAUDE SKILLS PLAYBOOK / 社内勉強会資料"
  right: "v1.0 · 2026"
---

<!-- 本文Markdown領域は使用しない（すべてYAML側で完結） -->
```

### ブロック種別一覧

| `type` | 用途 | 必須フィールド |
|---|---|---|
| `prose` | 通常段落（複数段落可、Markdown） | `md` |
| `h3` | 中見出し | `text` |
| `h4` | 小見出し（モノスペース） | `text` |
| `pull` | 引用ブロック | `body_md`, `cite` |
| `stats` | 統計カード3枚 | `items[]` |
| `table` | 汎用表 | `caption?`, `headers[]`, `rows[]` |
| `impact-table` | Before/After比較表（特殊スタイル） | `caption`, `headers[]`, `rows[]` |
| `layers` | 3層構造図 | `items[]` |
| `kitchen` | キッチンアナロジー2カード | `items[]` |
| `cats` | カテゴリーカード3枚 | `items[]` |
| `matrix` | 2×2マトリクス | `y_label`, `x_labels`, `cells[]` |
| `steps` | 4ステップ | `items[]` |
| `dbs` | DBSフレームワーク3カード | `items[]` |
| `codeblock` | ダーク背景コードブロック | `lines[]`（`{kind: c|k|s|text, text}`） |
| `usecases` | ユースケース3カード | `items[]` |
| `pitfalls` | 落とし穴4カード | `items[]` |
| `warn` | 警告ボックス | `title`, `icon`, `body_md` |
| `checklist` | チェックリスト | `title`, `items_md[]` |
| `cta` | コールトゥアクション | `title`, `body`, `button_label`, `button_href` |

各種別は `templates/partials/<type>.hbs` に対応するパーシャルを持ち、`page.hbs` のメインループは `{{> (lookup . 'type') }}` でディスパッチする。

---

## 5. テンプレート設計

### `templates/page.hbs`（骨格）

既存HTMLの構造（doctype、head、SVGシンボル定義、nav、hero、footer）をそのまま保持し、編集対象部分のみ `{{...}}` に置換する。例:

```handlebars
<nav class="nav">
  <div class="nav-inner">
    <div class="brand">
      <span class="brand-mark">{{> icon name=nav.brand_icon size=14}}</span>
      <span>{{nav.brand}}</span>
    </div>
    <div class="nav-links">
      {{#each nav.links}}
        <a href="{{href}}">{{label}}</a>
      {{/each}}
    </div>
  </div>
</nav>
```

### カスタムヘルパー

| ヘルパー | 用途 |
|---|---|
| `{{md text}}` | Markdown文字列をインラインHTMLに変換（段落タグなし） |
| `{{mdBlock text}}` | Markdown文字列をブロックHTMLに変換（`<p>` 含む） |
| `{{> icon name="ico-flag" size=24}}` | SVGアイコン挿入のパーシャル |

### パーシャル例: `templates/partials/stats.hbs`

```handlebars
<div class="stats">
  {{#each items}}
    <div class="stat">
      <div class="org"><span class="pill">{{> icon name=org_icon size=14}}</span>{{org}}</div>
      <div class="row">
        <span class="a">{{before}}</span>
        <span class="arrow">→</span>
        <span class="b">{{after}}</span>
      </div>
      <div class="label">{{{md label_md}}}</div>
    </div>
  {{/each}}
</div>
```

---

## 6. ビルドスクリプト `scripts/build.js`

```javascript
// 概略
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');
const { marked } = require('marked');

// 1. content/page.md を読み込み、フロントマター抽出
const src = fs.readFileSync('content/page.md', 'utf8');
const { data } = matter(src, { engines: { yaml: s => yaml.load(s) } });

// 2. パーシャル登録
const partialsDir = 'templates/partials';
for (const f of fs.readdirSync(partialsDir)) {
  const name = path.basename(f, '.hbs');
  Handlebars.registerPartial(name, fs.readFileSync(path.join(partialsDir, f), 'utf8'));
}

// 3. ヘルパー登録
marked.setOptions({ breaks: false, gfm: true });
Handlebars.registerHelper('md',      s => new Handlebars.SafeString(marked.parseInline(s || '')));
Handlebars.registerHelper('mdBlock', s => new Handlebars.SafeString(marked.parse(s || '')));

// 4. メインテンプレートをコンパイル → レンダリング → 書き出し
const tpl = Handlebars.compile(fs.readFileSync('templates/page.hbs', 'utf8'), { noEscape: false });
const html = tpl(data);
fs.writeFileSync('claude-skills-light.html', html);
console.log('Built claude-skills-light.html');
```

### `package.json`

```json
{
  "name": "claude-skills-workshop",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "node scripts/build.js",
    "build:check": "node scripts/build.js && echo Done"
  },
  "devDependencies": {
    "handlebars": "^4.7.8",
    "js-yaml": "^4.1.0",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  }
}
```

---

## 7. 実装フェーズとAgent Team

### モデル割り当てテーブル

| # | エージェント名 | subagent_type | モデル | 担当スコープ | 実行順序 |
|---|---|---|---|---|---|
| 1 | スキーマ確定・パーシャル一覧設計 | -（メイン直接） | Opus | この計画書 | Phase 1 |
| 2 | content/page.md 抽出 | general-purpose | sonnet | content/page.md | Phase 2 |
| 3 | templates/page.hbs + partials/*.hbs 作成 | general-purpose | sonnet | templates/ 全体 | Phase 2 |
| 4 | scripts/build.js + package.json 作成 | general-purpose | sonnet | scripts/, package.json | Phase 2 |
| 5 | README.md 追記（使い方ガイド） | general-purpose | sonnet | README.md | Phase 2 |
| 6 | npm install 実行 | general-purpose | haiku | - | Phase 3 |
| 7 | npm run build 実行 | general-purpose | haiku | - | Phase 3 |
| 8 | 生成HTMLとオリジナルの差分検証 | general-purpose | sonnet | 差分レビュー | Phase 4 |
| 9 | 実装後 DA レビュー | general-purpose | opus | 全変更 | Phase 4 |

- Phase 2 の #2〜#5 は並行起動（依存なし、インターフェースはこの計画書で固定）
- Phase 3 の #6→#7 は順次
- Phase 4 の #8 と #9 は並行

### インターフェース先行定義（Phase 1 で固定）

以下を本計画書で確定済みとして Phase 2 サブエージェントに渡す:
- ディレクトリ構造（§3）
- YAMLスキーマ全体像とブロック種別表（§4）
- パーシャルファイル名一覧（§3）
- 必要なHandlebarsヘルパー（§5）
- ビルドスクリプトのI/F（§6）

---

## 8. 検証戦略

### 機能テスト

1. `npm install` が成功する
2. `npm run build` が成功する
3. 生成された `claude-skills-light.html` をブラウザで開いて視覚的に確認（オリジナルと同等）

### 差分検証（Phase 4 #8）

オリジナル（`.tmp/design-fetch/skills-workshop/project/claude-skills-light.html`）と生成HTMLを比較:
- **構造の一致**: セクション数、カード枚数、表の行数が一致
- **クラス名の一致**: 主要CSSクラスが欠落していない
- **コンテンツの一致**: 主要見出しと数値が一致
- **許容差分**: 空白・改行・インデントの差は許容（視覚的に同一なら OK）

### 編集テスト（受入確認）

実装完了後、ユーザーが `content/page.md` の例えば「55.2%」を「60%」に変更 → `npm run build` → 再生成HTMLで該当箇所が「60%」になっていることを確認。

---

## 9. Devil's Advocate（計画時セルフレビュー）

> **観点**: 「この計画が失敗するとしたら、どこで失敗するか？」

| # | リスク・指摘 | 対応方針 |
|---|---|---|
| R1 | YAML内で `<br/>` を含む見出しが多数。改行表現がMarkdownライブラリの設定で挙動が変わり、見出しが崩れる可能性 | `marked.setOptions({ breaks: false })` を明示し、改行は **2回連続改行（段落区切り）** で表現。`title_md` フィールドは `mdBlock` ヘルパーでなく `md` + 手動 `<br/>` で扱う方針も検討。Phase 2 で実装時に最終決定 |
| R2 | 既存HTMLにインラインスタイル（`<code style="font-family:var(--mono)...">`）が散在。Markdownで `` `code` `` だけ書くと再現できない | パーシャル側でCSSクラス（例: `.code-inline-accent`）を新設し、`<style>` ブロックに追加してインラインstyleを排除。**この変更は計画スコープに含める** |
| R3 | `gray-matter` はデフォルトで `safeLoad` を使うため、YAML標準仕様の一部が制限される | `js-yaml` を明示的に `engines` で渡し、最新仕様（YAML 1.2）に対応 |
| R4 | 「テキスト編集のみ」前提だが、ユーザーがYAML構造を壊した時のエラーが分かりにくい | `build.js` に最低限のスキーマ検証（例: `sections[].blocks[].type` が既知の値か）を追加し、失敗時に具体的なメッセージを出す |
| R5 | 公開スキルの36.8%にセキュリティ問題がある（本文記載）が、`marked` のHTMLパススルー設定によってMarkdown経由でXSSが入る可能性 | 本ファイルは社内勉強会資料・静的生成のため脅威モデル外。ただし `marked` の `sanitize` オプションは false にしつつ、`<script>` だけは正規表現で除外する防御を入れるか検討 → **入れない**（社内ツールでオーバーエンジニアリング） |
| R6 | Handlebarsの `{{> (lookup . 'type') }}` 動的パーシャル参照は構文がやや特殊。Handlebars 4.x で動作確認が必要 | Phase 2 #3 で最初に検証。動作しない場合は `{{#if (eq type 'stats')}}{{> stats}}{{/if}}` のチェイン形式にフォールバック |
| R7 | 既存HTMLとピクセル完全一致は難しい（空白・改行差） | 「視覚的に同一」を達成すれば十分と Phase 4 #8 で明示 |
| R8 | スコープ拡大の懸念: README全面リライト、Watch mode追加、HTMLバリデーション追加など、ユーザー依頼を超える機能を入れがち | 本計画スコープを「ビルドパイプライン + 使い方の最小限のREADME」に限定。Watch mode やライブリロードは追加しない |
| R9 | `.tmp/design-fetch/` を残すか削除するか | 残す（オリジナルとの差分検証に使う）。`.gitignore` 推奨をREADMEに記載 |

### Codex セカンドオピニオン

- **計画時 Codex DA**: 標準的なSSGビルドパイプライン（YAML + Handlebars + marked → HTML）であり、技術的に新規性は低い。**スキップ**（理由: 確立されたパターン、技術選定リスクが小さい）。
- **実装後 Codex DA**: Phase 4 #9 のOpus DAと並行で実施する。

---

## 10. 完了条件

- [ ] `content/page.md` に既存HTMLの全テキスト・数値が抽出されている
- [ ] `npm run build` で `claude-skills-light.html` が生成される
- [ ] 生成HTMLをブラウザで開くと、オリジナルと視覚的に同等
- [ ] `README.md` に編集→ビルドの手順が記載されている
- [ ] 受入テスト（`content/page.md` を1箇所変更 → 再ビルドで反映）が成功する

---

## 11. スコープ外（今回は実装しない）

- Watch mode（ファイル変更検知での自動再ビルド）
- ライブリロード／開発サーバー
- HTMLバリデーション／Lint
- 多言語化対応
- ダークテーマ版（`claude-skills-dark.html`）の同パイプライン化
- 構造編集UI／GUI

これらは別途要望があれば後続フェーズで検討。
