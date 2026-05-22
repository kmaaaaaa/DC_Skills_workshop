# content/page.md 編集者向け詳細リファレンスガイド

> 対象読者: `content/page.md` を編集してページ内容を更新する方（エンジニア不要）

---

## 1. はじめに

### 編集の基本フロー

```
content/page.md を編集
    ↓
npm run build（ターミナルで実行）
    ↓
ブラウザをリロード（Ctrl+F5 推奨）
    ↓
claude-skills-light.html に反映
```

### 触ってよいファイル / 触ってはいけないファイル

| ファイル / フォルダ | 編集 | 備考 |
|---|---|---|
| `content/page.md` | **OK** | 編集対象。テキスト・数値・構造はここだけ変更する |
| `claude-skills-light.html` | **禁止** | ビルド成果物。手動編集しても次の `npm run build` で上書きされる |
| `templates/partials/*.hbs` | 禁止 | 各ブロックのHTML構造。変更すると全ページに影響する |
| `templates/page.hbs` | 禁止 | メインテンプレート（ナビ・ヒーロー・フッターの骨格） |
| `scripts/build.js` | 禁止 | ビルドロジック本体 |
| `package.json` | 禁止 | npm 依存関係の定義 |

### ビルド成果物の見方

`npm run build` を実行すると、ターミナルに以下のようなメッセージが表示される。

```
✓ Built claude-skills-light.html (82.45 KB, 6 sections, 34 blocks)
```

エラーが発生した場合は `[YAMLエラー]` または `[スキーマエラー]` のプレフィックス付きで原因が表示される。

---

## 2. YAML の基礎（編集者向けに最低限）

### スカラ / 配列 / マップ

```yaml
# スカラ（単一の値）
title: "Claude Skills ガイド"
value: "55.2"

# 配列（- で始まるリスト）
links:
  - { href: "#s1", label: "戦略的意義" }
  - { href: "#s2", label: "機能構造" }

# マップ（オブジェクト。フィールド名: 値 のペア）
figure:
  key: "AI導入率"
  value: "55.2"
  unit: "%"
```

### ブロックスタイル vs フロースタイル

```yaml
# フロースタイル（1行で書く、短い値向き）
- { href: "#s1", label: "戦略的意義" }

# ブロックスタイル（複数行、長い値向き）
- href: "#s1"
  label: "戦略的意義"
```

どちらも結果は同じ。フロースタイルはカード1枚など短い項目に使うと読みやすい。

### 引用符の使い分け（重要）

引用符の選択を誤るとYAML構文エラーになる。

| 引用符 | 書き方例 | 使いどころ |
|---|---|---|
| ダブルクォート | `"通常のテキスト"` | 最も一般的。ただし文字列内に `"` を含む場合は使えない |
| シングルクォート | `'"育てる資産"として'` | 文字列内にダブルクォートを含む場合に使う |
| ブロックスカラ `|` | 複数行テキスト（下記参照） | 改行を含む長文・段落テキスト |
| 引用符なし | `value: 短いテキスト` | 特殊文字（`:`、`#`、`"`等）を含まない短い値のみ |

**シングルクォートとダブルクォートの使い分け例:**

```yaml
# OK: 通常のダブルクォート
title: "AIエージェント時代における Skills"

# NG: 文字列内に " が含まれるためダブルクォートは使えない
subtitle: "「使いこなす側」に"回る"ために"   # 構文エラー

# OK: シングルクォートなら内部の " は問題なし
body_md: '"育てる資産"として活用する'

# OK: ダブルクォートを含む場合の別解（バックスラッシュエスケープ）
subtitle: "「使いこなす側」に\"回る\"ために"
```

**ブロックスカラ `|` の使い方:**

```yaml
# | の後に改行し、同じインデントで続ける
md: |
  1段落目のテキスト。

  空行を入れると段落区切りになる。
  改行のみなら同一段落内の改行。
```

### インデント: スペース2つ、タブ禁止

```yaml
# 正しい（スペース2つ）
sections:
  - id: s1
    blocks:
      - type: prose
        md: "テキスト"

# 誤り（タブ文字使用 → エラー）
sections:
	- id: s1   # ← タブ文字は不可
```

---

## 3. ページ全体のスキーマ概観

```yaml
---
page:           # ページメタデータ（title, lang）
  title: "..."
  lang: ja

nav:            # ナビゲーションバー
  brand: "..."
  brand_icon: ico-spark
  links:        # ナビリンクの配列
    - { href: "#s1", label: "戦略的意義" }

hero:           # ページ冒頭の大見出しエリア
  eyebrow: "..."
  headline_md: |
    ...
  lede: "..."
  meta: [...]
  figure: [...]

sections:       # 各章のコンテンツ（配列）
  - id: s1
    num: "01"
    icon: ico-flag
    title_md: |
      ...
    subtitle: "..."
    blocks:     # ブロックの配列（次章で詳述）
      - type: prose
        md: "..."

footer:         # フッター
  left: "..."
  right: "..."
---
```

### 各セクションの構成

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | 必須 | セクションID。`#s1` 形式のアンカーリンクに使用。変更するとナビリンクが壊れる |
| `num` | 必須 | 章番号表示用（例: `"01"`） |
| `icon` | 必須 | セクションアイコン名（例: `ico-flag`） |
| `title_md` | 必須 | 章タイトル。Markdown（`**bold**`, `*em*`）対応。二重改行で折り返し表示 |
| `subtitle` | 必須 | 章サブタイトル（プレーンテキストのみ） |
| `blocks` | 必須 | ブロックの配列。次章参照 |

---

## 4. ブロック種別リファレンス（19 種類すべて）

ブロックは `type` フィールドで種別を指定する。スペルミスや未定義の type を指定するとビルドエラーになる。

### 4.1 prose（通常段落）

**(a) YAML サンプル**

```yaml
- type: prose
  md: |
    2026年現在、AI活用は**AIエージェント**へとシフトしています。

    改行を1行空けると新しい段落になります。
    ここは同じ段落内です。
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `md` | 必須 | 文字列（ブロックスカラ推奨） | 段落テキスト。複数段落可 | あり（`**bold**`, `*em*`, `` `code` ``, リスト `- item`, リンク） |

**(c) 使いどころ**
本文の説明文。1段落でも複数段落でも使える。Markdown記法が最も自由に使えるブロック。

---

### 4.2 h3（中見出し）

**(a) YAML サンプル**

```yaml
- type: h3
  text: "概念の定義：プロンプトから「知的資産（IP）」へ"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `text` | 必須 | 文字列 | 見出しテキスト | なし（プレーンテキスト） |

**(c) 使いどころ**
セクション内の小タイトル。`prose` や他ブロックの前に置いてグループ化する。

---

### 4.3 h4（小見出し）

**(a) YAML サンプル**

```yaml
- type: h4
  text: "補足: トークン消費の最適化"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `text` | 必須 | 文字列 | 見出しテキスト（モノスペースフォント） | なし（プレーンテキスト） |

**(c) 使いどころ**
`h3` より細かい補足見出し。コード的なラベルや技術的補足に向く。

---

### 4.4 pull（引用ブロック）

**(a) YAML サンプル**

```yaml
- type: pull
  body_md: 'Skillsは一度作って終わりではなく、「使いながら育てる資産」である。担当者が離れても、業務の"やり方"が組織に残り続ける。'
  cite: "—— 戦略的ベネフィットの本質"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `body_md` | 必須 | 文字列 | 引用本文 | あり（インライン: `**bold**`, `*em*`, `` `code` ``） |
| `cite` | 必須 | 文字列 | 出典・署名 | なし（プレーンテキスト） |

**(c) 使いどころ**
重要なメッセージや名言を視覚的に強調する。セクションの締めや中盤のアクセントに。

---

### 4.5 stats（統計カード）

**(a) YAML サンプル**

```yaml
- type: stats
  items:
    - org: "チューリング社"
      org_icon: ico-team
      before: "8部門"
      after: "1人"
      label_md: "わずか2週間で **8部門・32人分** に相当する仮想PRチームを構築。"
    - org: "Anthropic社"
      org_icon: ico-bolt
      before: "5–10時間"
      after: "30分"
      label_md: "マーケのローンチブリーフ作成を **5〜10時間 → 30分** へ短縮。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | カードの配列 | - |
| `items[].org` | 必須 | 文字列 | 組織・会社名 | なし |
| `items[].org_icon` | 必須 | 文字列 | アイコン名（`ico-xxx`） | なし |
| `items[].before` | 必須 | 文字列 | 導入前の値（例: `"5–10時間"`） | なし |
| `items[].after` | 必須 | 文字列 | 導入後の値（例: `"30分"`） | なし |
| `items[].label_md` | 必須 | 文字列 | カード下部の説明文 | あり（インライン） |

**(c) 使いどころ**
Before/After の数値的成果を並べて見せるカード群。実績・ROI の訴求に最適。

---

### 4.6 table（汎用表）

**(a) YAML サンプル**

```yaml
- type: table
  caption: "表のタイトル（省略可）"
  headers: ["機能", "役割", "読み込みタイミング", "主な用途"]
  rows:
    - ["CLAUDE.md", "常時適用される全体ルール", "毎セッション自動", "トーン&マナー"]
    - ["Skills", "特定タスク固有の指示", "呼び出し時のみ", "月次決算、分析"]
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `caption` | 任意 | 文字列 | 表の上部に表示するタイトル | なし |
| `headers` | 必須 | 文字列の配列 | ヘッダー行 | なし |
| `rows` | 必須 | 配列の配列 | データ行（各行は文字列の配列） | 第2列以降：あり（インライン） |

注意: 各行の**第1列**はキー列（`class="key"`）でプレーンテキスト。第2列以降は Markdown 変換される。

**(c) 使いどころ**
機能比較・コマンド一覧など、表形式で整理できるデータ全般。

---

### 4.7 impact-table（Before/After 比較表）

**(a) YAML サンプル**

```yaml
- type: impact-table
  caption: "BEFORE / AFTER ─ 主要業務における処理時間の変化"
  headers: ["業務内容", "従来（手動）", "Skills 活用後", "変化量"]
  rows:
    - ["広告分析・KPI レポート", "3〜5 時間", "約 7 分", "最大 −97%"]
    - ["ローンチブリーフ作成", "5〜10 時間", "30 分", "最大 −95%"]
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `caption` | 任意 | 文字列 | 表タイトル | なし |
| `headers` | 必須 | 文字列の配列 | 4列ヘッダー（業務内容 / 従来 / 活用後 / 変化量） | なし |
| `rows` | 必須 | 配列の配列 | データ行。各行は必ず **4要素** の配列 | なし（全列プレーンテキスト） |

注意: 列数は固定で4列。`table` と異なり特殊スタイル（before列グレー、after列強調、delta列アクセント）が適用される。

**(c) 使いどころ**
時間削減・コスト削減などの導入効果を視覚的に強調する表。ROI訴求のクライマックスに。

---

### 4.8 layers（3層構造図）

**(a) YAML サンプル**

```yaml
- type: layers
  items:
    - num: "L1"
      title: "メタデータ（YAMLフロントマター）"
      body: "SKILL.mdの冒頭に記述。Claudeが「いつ起動すべきか」を判断するトリガー。"
      side: "TRIGGER\n軽量・常時参照"
    - num: "L2"
      title: "指示本文（Workflow）"
      body: "業務の具体的なステップバイステップを記述する中核部分。"
      side: "INSTRUCTION\n呼び出し時のみ"
    - num: "L3"
      title: "参照ファイル（References）"
      body: "スタイルガイド等の「静的知識」。指示本文から分離して管理する。"
      side: "KNOWLEDGE\n必要時に展開"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | 層の配列（通常3要素） | - |
| `items[].num` | 必須 | 文字列 | 層番号ラベル（例: `"L1"`） | なし |
| `items[].title` | 必須 | 文字列 | 層タイトル | なし |
| `items[].body` | 必須 | 文字列 | 層の説明文 | なし |
| `items[].side` | 必須 | 文字列 | 右端のラベル。`\n` で改行可 | なし |

**(c) 使いどころ**
階層構造・レイヤー構造を視覚的に表現する。3層固定ではなく任意の数の層を並べられる。

---

### 4.9 kitchen（キッチンアナロジー）

**(a) YAML サンプル**

```yaml
- type: kitchen
  items:
    - icon: ico-kitchen
      title: "MCP（Model Context Protocol）"
      tag: "TOOLS"
      body_md: "プロ仕様の**キッチン**。道具・API連携など、AIが外部世界とつながるための機構。"
    - icon: ico-recipe
      title: "Skills"
      tag: "RECIPE"
      body_md: "**レシピ（手順書）**。複数の道具をどの順序で使うかを「オーケストレーション」する知的資産。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | カードの配列（通常2要素） | - |
| `items[].icon` | 必須 | 文字列 | アイコン名（`ico-xxx`） | なし |
| `items[].title` | 必須 | 文字列 | カードタイトル | なし |
| `items[].tag` | 必須 | 文字列 | タグラベル（例: `"TOOLS"`, `"RECIPE"`） | なし |
| `items[].body_md` | 必須 | 文字列 | 説明文 | あり（インライン） |

**(c) 使いどころ**
2つの概念を対比・対応付けして見せるカードペア。アナロジーや対比の説明に。

---

### 4.10 cats（カテゴリーカード）

**(a) YAML サンプル**

```yaml
- type: cats
  items:
    - icon: ico-doc
      title: "定型アセット生成"
      body: "同じ構造のドキュメントを繰り返し作成する業務。フォーマットが安定しているほど効果が高い。"
      ex: "EX. 月次レポート ／ 週報 ／ SNS投稿案"
    - icon: ico-route
      title: "マルチステップ・ワークフロー"
      body: "複数のツールを跨ぐ連続プロセス。順序と判断分岐を明文化できる業務。"
      ex: "EX. 調査 → 分析 → 執筆 → レビュー"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | カードの配列 | - |
| `items[].icon` | 必須 | 文字列 | アイコン名 | なし |
| `items[].title` | 必須 | 文字列 | カードタイトル | なし |
| `items[].body` | 必須 | 文字列 | 説明本文 | なし |
| `items[].ex` | 必須 | 文字列 | 具体例（`EX. ...` 形式推奨） | なし |

**(c) 使いどころ**
カテゴリーの列挙・分類の提示。3枚並べて使うことが多い。

---

### 4.11 matrix（2×2 マトリクス）

**(a) YAML サンプル**

```yaml
- type: matrix
  y_label: "複雑性 ／ COMPLEXITY"
  x_labels:
    left: "← 頻度：低"
    right: "頻度：高 →"
  cells:
    - level: "優先度：中"
      hi: false
      title: "複雑だが、頻度は低い"
      body: "年次の戦略立案など。価値は高いが頻度が少ないため、一度パッケージ化して残す対象。"
    - level: "優先度：高 ★"
      hi: true
      title: "頻度が高く、複雑性も高い"
      body: "毎週の財務分析、複数部門のKPI集計。Skills化のROIが最も大きい領域。"
    - level: "優先度：低"
      hi: false
      title: "単発で、シンプル"
      body: "単発のアイデア出し。通常のチャット利用で十分。"
    - level: "優先度：中"
      hi: false
      title: "頻度は高いが、シンプル"
      body: "定型フォーマットへのデータ転記。CLAUDE.mdレベルの共通ルールで十分なケースが多い。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `y_label` | 必須 | 文字列 | Y軸ラベル（縦軸） | なし |
| `x_labels.left` | 必須 | 文字列 | X軸左端ラベル | なし |
| `x_labels.right` | 必須 | 文字列 | X軸右端ラベル | なし |
| `cells` | 必須 | 配列 | セルの配列。**必ず4要素**（左上→右上→左下→右下の順） | - |
| `cells[].level` | 必須 | 文字列 | 優先度ラベル | なし |
| `cells[].hi` | 必須 | 真偽値 | `true` でハイライト（目立つスタイル） | - |
| `cells[].title` | 必須 | 文字列 | セルタイトル | なし |
| `cells[].body` | 必須 | 文字列 | セル説明文 | なし |

注意: `cells` の順序は「左上 → 右上 → 左下 → 右下」の順で配置される。

**(c) 使いどころ**
優先度マップ・評価軸の可視化。2軸で4象限に分類する説明に。

---

### 4.12 steps（ステップ図）

**(a) YAML サンプル**

```yaml
- type: steps
  items:
    - n: "STEP 01"
      icon: ico-target
      title: "要件定義"
      body_md: "「何を達成したいか」「入力データは何か」を明確化。出力フォーマットも先に決める。"
    - n: "STEP 02"
      icon: ico-feather
      title: "実装（自動生成）"
      body_md: "Claudeに一度作業をさせ、完了後に「**今やった作業をスキルにして**」と頼む。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | ステップの配列 | - |
| `items[].n` | 必須 | 文字列 | ステップ番号ラベル（例: `"STEP 01"`） | なし |
| `items[].icon` | 必須 | 文字列 | アイコン名 | なし |
| `items[].title` | 必須 | 文字列 | ステップタイトル | なし |
| `items[].body_md` | 必須 | 文字列 | ステップ説明文 | あり（インライン） |

**(c) 使いどころ**
手順・プロセスを順番に並べる。4ステップで使うことが多いが、任意の数に対応。

---

### 4.13 dbs（DBSフレームワークカード）

**(a) YAML サンプル**

```yaml
- type: dbs
  items:
    - letter: "D"
      name: "DIRECTION"
      title: "指示"
      body_md: "SKILL.md に書かれた手順とルール。業務フローの骨格となる中核ドキュメント。"
    - letter: "B"
      name: "BLUEPRINTS"
      title: "参照"
      body_md: "`references/` フォルダに置くスタイルガイド等の背景知識。"
    - letter: "S"
      name: "SOLUTIONS"
      title: "スクリプト"
      body_md: "計算やファイル操作用のコード。自動生成・配置される。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | カードの配列（通常3要素） | - |
| `items[].letter` | 必須 | 文字列 | 大文字アルファベット1文字（例: `"D"`） | なし |
| `items[].name` | 必須 | 文字列 | 英語名（例: `"DIRECTION"`） | なし |
| `items[].title` | 必須 | 文字列 | 日本語タイトル | なし |
| `items[].body_md` | 必須 | 文字列 | 説明文 | あり（インライン） |

**(c) 使いどころ**
頭文字略語のフレームワーク（DBS, ABC など）を3つのカードで解説する。

---

### 4.14 codeblock（コードブロック）

**(a) YAML サンプル**

```yaml
- type: codeblock
  lines:
    - { kind: c, text: "## ~/.claude/skills/financial-report/SKILL.md" }
    - { kind: k, text: "---" }
    - { kind: k, text: "name:" }
    - { kind: text, text: " financial-report" }
    - { kind: k, text: "description:" }
    - { kind: text, text: " 月次の財務データを読み込み、経営報告書を生成" }
    - { kind: k, text: "---" }
    - { kind: text, text: "" }
    - { kind: c, text: "# Workflow" }
    - { kind: text, text: "1. 指定CSVを読み込み、前月比・前年比を計算する" }
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `lines` | 必須 | 配列 | 行の配列 | - |
| `lines[].kind` | 任意 | 文字列 | 構文ハイライト種別（`c`=コメント, `k`=キーワード, `s`=文字列/パス, `text`=通常 / 省略時はプレーンテキスト） | なし |
| `lines[].text` | 必須 | 文字列 | 行のテキスト。空文字 `""` で空行 | なし |

**kind の種別:**

| kind | 意味 | 表示色のイメージ |
|---|---|---|
| `c` | コメント | グレー |
| `k` | キーワード（YAMLキーなど） | 緑系 |
| `s` | 文字列・パス | 黄色系 |
| `text` | 通常テキスト | 白 |
| （省略） | プレーンテキスト | 白 |

**(c) 使いどころ**
ダーク背景でコードやコマンドを表示する。YAML、シェルコマンド、設定ファイルの例示に。

---

### 4.15 usecases（ユースケースカード）

**(a) YAML サンプル**

```yaml
- type: usecases
  items:
    - icon: ico-chart
      title: "CRM／SFA 分析スキル"
      body: "SalesforceやBigQueryのデータから「受注確度」を4段階で評価。確度向上のための具体的アクションプランを Word 文書で出力する。"
      meta_left: "SALES OPS"
      meta_right: "OUTPUT: .docx"
    - icon: ico-shield
      title: "コンプライアンス・チェック"
      body: "広告物や投資提案書が法令に合致しているかを自動点検。70〜100項目を数分で完遂する。"
      meta_left: "COMPLIANCE"
      meta_right: "ITEMS: 70–100"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | カードの配列 | - |
| `items[].icon` | 必須 | 文字列 | アイコン名 | なし |
| `items[].title` | 必須 | 文字列 | ユースケース名 | なし |
| `items[].body` | 必須 | 文字列 | 説明文 | なし |
| `items[].meta_left` | 必須 | 文字列 | 左下のメタラベル（部署名等） | なし |
| `items[].meta_right` | 必須 | 文字列 | 右下のメタラベル（出力形式・件数等） | なし |

**(c) 使いどころ**
具体的なユースケースをカード形式で並べる。業界別・機能別の活用例の紹介に。

---

### 4.16 pitfalls（落とし穴カード）

**(a) YAML サンプル**

```yaml
- type: pitfalls
  items:
    - n: "01"
      title: "指示の詰め込みすぎ"
      body_md: "1スキルで全業務をやらせると精度が落ちる。「1スキル1タスク」に分割し、必要なら複数のスキルを連携させる。"
    - n: "02"
      title: "不適切な Description"
      body_md: "曖昧な説明は誤発動の原因。「**いつ使うか**」を具体的に記述し、トリガー語を明確にする。"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `items` | 必須 | 配列 | 項目の配列 | - |
| `items[].n` | 必須 | 文字列 | 番号ラベル（例: `"01"`） | なし |
| `items[].title` | 必須 | 文字列 | 失敗パターンのタイトル | なし |
| `items[].body_md` | 必須 | 文字列 | 説明と対策 | あり（インライン） |

**(c) 使いどころ**
番号付きの注意点・失敗パターン・アンチパターンのリスト。まとめ・リスク管理セクションに。

---

### 4.17 warn（警告ボックス）

**(a) YAML サンプル**

```yaml
- type: warn
  icon: ico-alert
  title: "技術的制約の遵守"
  body_md: |
    - ファイルパス：個人用なら `~/.claude/skills/`、プロジェクト用なら `.claude/skills/`
    - 命名規則：`kebab-case` を使用。スペース・大文字・アンダースコアは禁止
    - YAML制限：`description` 内に XMLタグを使用してはいけない
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `icon` | 必須 | 文字列 | アイコン名（`ico-alert`, `ico-lock` 等） | なし |
| `title` | 必須 | 文字列 | 警告タイトル | なし |
| `body_md` | 必須 | 文字列 | 警告内容。リスト形式も使える | あり（ブロック: `mdBlock`。リスト `- item` も使用可） |

**(c) 使いどころ**
注意事項・禁止事項・重要な制約をハイライト表示する。セクション中のどこでも使える。

---

### 4.18 checklist（チェックリスト）

**(a) YAML サンプル**

```yaml
- type: checklist
  title: "最終確認チェックリスト"
  items_md:
    - "「1スキル＝1タスク」の粒度に保たれているか"
    - "Description は *「いつ使うか」* が具体的に記述されているか"
    - "`/context` でトークン消費が許容範囲内か"
    - "外部公開スキルを利用する場合、SKILL.md を目視確認したか"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `title` | 必須 | 文字列 | チェックリストのタイトル | なし |
| `items_md` | 必須 | 文字列の配列 | チェック項目の配列 | あり（インライン: 各項目に `**bold**`, `*em*`, `` `code` `` 使用可） |

**(c) 使いどころ**
確認事項・要件のリスト。チェックアイコン付きで視覚的に整理されて表示される。

---

### 4.19 cta（コールトゥアクション）

**(a) YAML サンプル**

```yaml
- type: cta
  title: "最初の一歩は、たった一つの繰り返しタスクから。"
  body: "Skillsは、AIを「便利なチャット」から「頼れる自律的なチーム」へと変えるための知的資産です。まずは今日、1つの繰り返しタスクを特定し、Claudeに「今やったことをスキルにして」と伝えてください。"
  button_label: "構築プロセスを読む"
  button_href: "#s4"
```

**(b) フィールド一覧**

| フィールド | 必須/任意 | 型 | 説明 | Markdown対応 |
|---|---|---|---|---|
| `title` | 必須 | 文字列 | CTAの大見出し | なし |
| `body` | 必須 | 文字列 | 説明文 | なし |
| `button_label` | 必須 | 文字列 | ボタンのテキスト | なし |
| `button_href` | 必須 | 文字列 | ボタンのリンク先。ページ内アンカー（`#s4`）または外部URL | なし |

**(c) 使いどころ**
ページやセクションの締め。読者に次のアクションを促す大型のボタン付きブロック。

---

## 5. Markdown 記法の対応範囲

### ヘルパー別の対応範囲

| ヘルパー | 使用フィールド | 対応する記法 |
|---|---|---|
| `md`（インライン） | `body_md`, `label_md`, `items_md[]`, `cite` の除く大部分 | `**bold**`, `*em*`, `` `code` ``, `[text](url)` |
| `mdBlock`（ブロック） | `prose.md`, `warn.body_md` | `md` の全記法 + 段落 `<p>`, リスト `- item`, `1. item` |
| `mdHead`（見出し用） | `hero.headline_md`, `section.title_md` | `**bold**`, `*em*`, 二重改行 → `<br/>` |

### 日本語との隣接での注意

`**太字**` や `*斜体*` は日本語との隣接でも正常に変換される（正規表現前処理を実装済み）。

```yaml
# OK: 日本語に隣接してもボールドになる
label_md: "わずか2週間で **8部門・32人分** に相当する仮想PRチームを構築。"

# OK: 日本語に隣接してもイタリックになる
md: "Skillsは「使いながら *育てる資産* 」である。"
```

### Markdown 非対応フィールド一覧

以下のフィールドはプレーンテキストのみ。`**bold**` と書いても変換されず、アスタリスクがそのまま表示される。

| セクション | 非対応フィールド |
|---|---|
| `nav` | `nav.links[].label` |
| `hero` | `hero.eyebrow`, `hero.lede`, `hero.meta[].label`, `hero.figure[].key/value/unit/caption` |
| `section` | `section.subtitle`, `section.num`, `section.icon` |
| `h3` | `h3.text` |
| `h4` | `h4.text` |
| `layers` | `layers.items[].title/body/side` |
| `cats` | `cats.items[].title/body/ex` |
| `usecases` | `usecases.items[].title/body/meta_left/meta_right` |
| `dbs` | `dbs.items[].letter/name/title` |
| `matrix` | `matrix.cells[].title/body`, `matrix.y_label/x_labels` |
| `codeblock` | `codeblock.lines[].text` |
| `pitfalls` | `pitfalls.items[].title` |
| `cta` | `cta.title/body/button_label/button_href` |
| `footer` | `footer.left/right` |

**覚え方**: `_md` サフィックスが付いているフィールドは Markdown 対応。それ以外はプレーンテキスト。

---

## 6. 編集ケーススタディ（実践例 5 件）

### ケース 1: ヒーローの数値を変える

**シナリオ**: 「日本企業のAI導入率」が更新された。`55.2%` → `60.5%` に変更する。

```yaml
# 変更前
figure:
  - { key: "日本企業のAI導入率", value: "55.2", unit: "%", caption: "営業資料作成・顧客対応にAIを導入" }

# 変更後
figure:
  - { key: "日本企業のAI導入率", value: "60.5", unit: "%", caption: "営業資料作成・顧客対応にAIを導入" }
```

`value` フィールドは数値でも文字列（クォートあり）でも問題ない。`unit` や `caption` も同様に変更できる。

---

### ケース 2: ナビにリンクを追加

**シナリオ**: 新しいセクション `#s7` を追加し、ナビにリンクを追加する。

```yaml
# 変更前
nav:
  links:
    - { href: "#s6", label: "リスク管理" }

# 変更後（末尾に追加）
nav:
  links:
    - { href: "#s6", label: "リスク管理" }
    - { href: "#s7", label: "Q&A" }
```

注意: `href` の `#s7` は `sections[].id: s7` と一致させること。

---

### ケース 3: prose 段落を新規追加

**シナリオ**: セクション s1 の既存ブロックの後に、補足段落を追加する。

```yaml
# 変更前（既存のセクション末尾）
    blocks:
      - type: stats
        items:
          - org: "チューリング社"
            ...

# 変更後（prose を末尾に追加）
    blocks:
      - type: stats
        items:
          - org: "チューリング社"
            ...
      - type: prose
        md: |
          ※ 上記数値はAnthropic／Rimo／チューリング社の公開事例を基にした参考値です。実際の効果は業務特性により変動します。
```

インデントに注意: `- type: prose` は `- type: stats` と同じ深さ（スペース6個）にそろえる。

---

### ケース 4: stats カードを追加

**シナリオ**: 既存の stats ブロックに4枚目のカードを追加する。

```yaml
# 変更前
- type: stats
  items:
    - org: "Rimo社"
      org_icon: ico-chart
      before: "3–5時間"
      after: "7分"
      label_md: "広告分析レポート作成を **従来3〜5時間 → 約7分** で完了。"

# 変更後（末尾に追加）
- type: stats
  items:
    - org: "Rimo社"
      org_icon: ico-chart
      before: "3–5時間"
      after: "7分"
      label_md: "広告分析レポート作成を **従来3〜5時間 → 約7分** で完了。"
    - org: "新規事例社"
      org_icon: ico-folder
      before: "2時間"
      after: "10分"
      label_md: "週次レポート作成を **2時間 → 10分** に短縮。"
```

---

### ケース 5: 表に行を追加

**シナリオ**: `impact-table` ブロックの行を1つ追加する。

```yaml
# 変更前
- type: impact-table
  caption: "BEFORE / AFTER ─ 主要業務における処理時間の変化"
  headers: ["業務内容", "従来（手動）", "Skills 活用後", "変化量"]
  rows:
    - ["広告制作（クリエイティブ）", "30 分", "30 秒", "−98%"]

# 変更後（末尾に追加）
- type: impact-table
  caption: "BEFORE / AFTER ─ 主要業務における処理時間の変化"
  headers: ["業務内容", "従来（手動）", "Skills 活用後", "変化量"]
  rows:
    - ["広告制作（クリエイティブ）", "30 分", "30 秒", "−98%"]
    - ["週次レポート作成", "2 時間", "10 分", "最大 −91%"]
```

`impact-table` の各行は必ず **4要素の配列** にすること（headers の列数と一致させる）。

---

## 7. トラブルシューティング

### ビルドエラー一覧

#### [YAMLエラー] bad indentation of a mapping entry (X:Y)

**原因**: インデントがずれている。タブ文字が混入している。

```yaml
# 誤り（items と - のインデントが不一致）
- type: stats
  items:
  - org: "チューリング社"  # ← items より浅い

# 正しい
- type: stats
  items:
    - org: "チューリング社"  # ← items より2スペース深い
```

**対処**: テキストエディタで「タブ → スペース変換」を実行し、インデントをそろえる。

---

#### [YAMLエラー] unexpected character after ... / found character that cannot start any token

**原因**: 文字列内のダブルクォートが引用符と干渉している。

```yaml
# 誤り
subtitle: "「使いこなす側」に"回る"ために"

# 正しい（シングルクォートに変更）
subtitle: '「使いこなす側」に"回る"ために'
```

---

#### [スキーマエラー] 未知の type "..."

**原因**: `type` フィールドのスペルミス。

有効な type 一覧: `prose`, `h3`, `h4`, `pull`, `stats`, `table`, `impact-table`, `layers`, `kitchen`, `cats`, `matrix`, `steps`, `dbs`, `codeblock`, `usecases`, `pitfalls`, `warn`, `checklist`, `cta`

**対処**: 上記リストと照合し、スペルを修正する。ハイフン（`-`）の有無に注意（`impact-table` はハイフンあり）。

---

#### [ビルドエラー] Cannot read properties of undefined

**原因**: 必須フィールドが欠落している。

たとえば `stats` ブロックで `items` がない、`pull` ブロックで `body_md` がない等。各ブロック種別のフィールド一覧（§4）を確認して、必須フィールドをすべて記述する。

---

#### ブラウザで反映されない

1. `npm run build` を実行したか確認する（忘れていることが多い）
2. ハードリロード `Ctrl+F5`（Windows）または `Cmd+Shift+R`（Mac）を試す
3. ターミナルのビルドログにエラーが出ていないか確認する

---

#### アイコンが表示されない

アイコン名が正しくない場合、アイコンが表示されない（空白になる）。

**利用可能なアイコン名一覧:**

```
ico-flag    ico-layers  ico-filter  ico-tool    ico-bank
ico-shield  ico-spark   ico-clock   ico-team    ico-folder
ico-arrow   ico-alert   ico-lock    ico-target  ico-book
ico-check   ico-doc     ico-bolt    ico-chart   ico-grid
ico-search  ico-kitchen ico-recipe  ico-route   ico-cycle
ico-feather
```

`icon: ico-xxx` と書いたとき、上記リストに存在しない名前はアイコンが表示されない。

---

#### Markdown の `**bold**` がそのまま表示される

該当フィールドが Markdown 非対応（§5 の非対応フィールド一覧参照）。`_md` サフィックスなしのフィールドはプレーンテキストとして扱われる。

解決策: 対応しているフィールドの種別に変更するか、Markdown 非対応と割り切ってプレーンテキストで書く。

---

## 8. スコープ外（このガイドが扱わないこと）

以下の変更は `content/page.md` の編集では対応できない。テンプレートやスクリプトの修正が必要になるため、エンジニアに依頼すること。

- **新しいブロック種別の追加**: `templates/partials/` への新規 `.hbs` ファイルの追加と、`scripts/build.js` の `KNOWN_BLOCK_TYPES` 配列への追加が必要
- **CSS の色・フォント変更**: `templates/page.hbs` の `<style>` ブロックを直接編集
- **レイアウト構造の変更**: ナビ・ヒーロー・フッターのHTML構造変更は `templates/page.hbs` を編集
- **アイコンの追加**: `templates/page.hbs` 内の SVG シンボル定義に追加が必要
- **Watch mode / 自動ビルド**: 現在は手動 `npm run build` のみ。自動化が必要な場合はエンジニアに相談
