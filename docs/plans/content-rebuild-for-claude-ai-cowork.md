# コンテンツ全面書き換え実装計画 v2：Claude.ai / Cowork 前提・案C採用

**作成日**: 2026-05-21（v2 改訂版）
**対象ファイル**: `content/page.md`（**本計画のスコープはこれ1ファイルのみ**）
**前提**: Claude Code → Claude.ai および Claude Cowork
**採用アプローチ**: 案 C（章構成再編・学習導線最優先）
**ステータス**: 実装計画 v2（Codex セカンドオピニオン反映済み、ユーザー承認待ち）

> **v1 からの主な変更点**:
> - Cowork 関連の数値・固有名詞を脚注化、「2026年5月時点」と明記（H1）
> - 「個人 ZIP アップロード」を主導線に絞り、組織配布は参考情報に格下げ（H2）
> - ZIP 化・アップロード・検証の具体手順を s5 に明示（M1）
> - README / CHANGELOG / editor-guide の連鎖更新を**本計画スコープから除外**（M2）
> - Hero 数値の固定数依存を回避（L1）

---

## 1. 前提条件（情報の確かさレベル付き）

### 1.1 確実な前提
- Skills は **SKILL.md（YAML フロントマター + Markdown）** を中核とするフォルダ
- Claude.ai は Anthropic 提供の Web チャット製品
- Skills は **Claude.ai 設定からアップロードして利用可能**

### 1.2 2026年5月時点の参考情報（教材内では脚注扱い）

| 項目 | 内容 | 確度 |
|---|---|---|
| Claude Cowork | Claude.ai の有料プラン向け自律実行機能。ローカルファイル操作・スケジュール実行などが可能 | △ 公式ドキュメント参照を案内 |
| アップロード方法 | Customize > Skills から ZIP として追加 | ○ 複数の解説記事で一致 |
| 公式 Skills テンプレート | PDF / Word / Excel / PowerPoint / ブランドガイド / MCP builder など複数提供 | △ 数値は明記せず「複数」と表現、**脚注で例示として記載** |
| Cowork の業界別バンドル | Legal / Small Business / Marketing Ops 等が提供されている | △ 「業界向けバンドルが順次拡大中」と一般化、**脚注で例示として記載** |

**教材内での扱い方針**:
- すべての数値・固有名詞は **「2026年5月時点。最新は Anthropic 公式ヘルプを参照」** と明記
- 出典セクションを footer の上に追加（公式 URL は具体的に書かない。「Anthropic 公式ヘルプ／Claude.ai 内ドキュメント」と案内）

### 1.3 削除する Claude Code 固有要素

| 要素 | 削除/置換方針 |
|---|---|
| `~/.claude/skills/` のパス | 削除 |
| `.claude/skills/フォルダ名/SKILL.md` のプロジェクトスキル | 削除 |
| `skill-creator` プラグイン、`/plugin`、`/context` | 削除 |
| CLAUDE.md（プロジェクトルート） | 削除 |
| ターミナル前提 | 削除、すべて Web UI 操作 |

---

## 2. 新章構成（案 C 採用、v2）

| # | 章タイトル | 主旨 |
|---|---|---|
| s1 | **なぜ Skills か** | 戦略的価値・ROI 事例（圧縮版） |
| s2 | **環境と全体像** | Claude.ai での Skills 利用、Cowork で広がる選択肢、フォルダ構造 |
| s3 | **SKILL.md の読み方・書き方** | YAML/Markdown 入門、3層構造、Hello Skill |
| s4 | **何をスキル化するか** | 頻度×複雑性マトリクス + 職種別 6 ユースケース |
| s5 | **作って届ける：実践プロセス** | 4 ステップ + ZIP化・アップロード・検証手順 + デバッグ |
| s6 | **運用・リスク・育てる文化** | 落とし穴・セキュリティ・チェックリスト・育てる運用 |
| 付録 | **用語集** | コンテキスト/トークン/MCP/Projects/Skills 等 |

ナビゲーション: `戦略 / 環境 / 書き方 / 判断 / 実践 / 運用 / 用語集`

---

## 3. 各章のブロック設計

### s1. なぜ Skills か（旧 s1 圧縮 + 旧 s5 impact-table 移動）

| ブロック | 内容 |
|---|---|
| prose | AI エージェント時代の文脈（旧 s1 冒頭を流用） |
| stats（3カード） | チューリング / Anthropic / Rimo 社事例（旧 stats 流用） |
| impact-table | Before/After 表（旧 s5 から移動） |
| pull | 「Skills は使いながら育てる資産」 |

### s2. 環境と全体像（新規）

| ブロック | 内容 |
|---|---|
| prose | 「Skills は SKILL.md と参照ファイルを束ねた**フォルダ**。Claude.ai で**ZIP アップロード**するだけで使える」 |
| h3 | 「どこで Skills を使えるか」 |
| table | 利用環境の比較（無料プラン / 有料プラン / Cowork で広がる機能）※具体料金は明記せず「有料プランで利用可能」と表現 |
| h3 | 「Skills フォルダの中身」 |
| codeblock | ツリー図（my-skill/SKILL.md, scripts/, references/, assets/） |
| h3 | 「キッチンのアナロジー：MCP と Skills の関係」 |
| kitchen | 旧 kitchen 流用 |
| warn | 「2026年5月時点の情報。料金・機能の最新は **Anthropic 公式ヘルプ**で確認してください」 |

### s3. SKILL.md の読み方・書き方（新規 + 旧 s2 一部）

| ブロック | 内容 |
|---|---|
| prose | 「Skills はプログラムではなく文書」 |
| h3 | 「Markdown の最低限 5 記法」 |
| layers（5） | 見出し / リスト / 強調 / コード / リンク |
| h3 | 「YAML フロントマターとは」 |
| codeblock | `---\nname: ...\ndescription: ...\n---` の最小例 + 注釈 |
| h3 | 「3 層構造（Progressive Disclosure）」 |
| layers（3） | 旧 layers 流用 |
| h3 | 「Hello Skill：週報整形を 10 行で」 |
| codeblock | 週報フォーマット整形スキルの全文 |
| prose | 逐行解説（YAML 部の意味、Workflow の意味） |
| warn | 命名規則（kebab-case、Claude を含まない、XML タグ禁止） |

### s4. 何をスキル化するか（旧 s3 + 旧 s5 拡張）

| ブロック | 内容 |
|---|---|
| h3 | 「向く業務の 3 カテゴリー」 |
| cats（3） | 旧 cats 流用 |
| h3 | 「頻度 × 複雑性マトリクス」 |
| matrix | 旧 matrix 流用 |
| h3 | 「職種別ユースケース 6 選」 |
| usecases（6） | 経理 / マーケ / 人事 / 営業 / 法務 / IT |
| h3 | 「自分の業務に当てはめる」 |
| checklist | 業務棚卸し用チェックリスト |

### s5. 作って届ける：実践プロセス（旧 s4 改訂 + Codex M1 反映）

| ブロック | 内容 |
|---|---|
| h3 | 「構築の 4 ステップ」 |
| steps（4） | 要件定義 / 草案作成 / テスト / 育てる（旧 steps を Claude.ai 用に修正） |
| h3 | 「DBS フレームワーク」 |
| dbs（3） | 旧 dbs 流用 |
| h3 | **「アップロードまでの 5 ステップ」**（Codex M1 反映） |
| steps（5） | ①SKILL.md を作成 ②フォルダにまとめる ③フォルダを ZIP 化 ④Claude.ai 設定 > Skills でアップロード ⑤チャットで動作検証 |
| h3 | 「description の設計：トリガー語を制す」 |
| stats（3） | Bad description ↔ Good description の対比 |
| h3 | 「公式テンプレートを活用する」（Codex L1 反映：固定数を出さない） |
| prose | 「Anthropic が公式に提供している複数のテンプレートを参考に、自社用にカスタマイズするのが早道。**例：PDF・Word・Excel・PowerPoint 生成、ブランドガイド適用、MCP ビルダー などが脚注で確認できる**（最新一覧は公式ヘルプ参照）」 |
| prose（脚注スタイル） | 「※ 2026年5月時点で公開されている主な公式 Skills 例：PDF/Word/Excel/PowerPoint 文書生成、ブランドガイド、Claude API ヘルパー、MCP builder、Webapp テスティング、Slack GIF、Algorithmic Art、Internal Comms 等。最新一覧は Anthropic 公式リポジトリ・ヘルプを参照。」 |
| prose | **Claude Cowork では業界別バンドルも順次提供されており**、既存 Skills を組み合わせて業務に即した構成を素早く整えられる |
| prose（脚注スタイル） | 「※ 2026年5月時点の業界別バンドル例：Legal（法務）、Small Business（中小企業向け）、Marketing Ops（マーケティング運用）等。順次拡張中、最新は公式ヘルプを参照。」 |
| h3 | 「動かない時の 3 ステップ」（Codex M1 反映） |
| steps（3） | ①description を見直す ②YAML 構文を確認 ③Claude に「なぜ呼ばれなかった？」と聞く |

### s6. 運用・リスク・育てる文化（旧 s6 軽量化）

| ブロック | 内容 |
|---|---|
| h3 | 「やりがちな失敗と対策」 |
| pitfalls（4） | 旧 pitfalls 流用（`/context` 言及は「コンテキスト消費の意識」一般論に書き換え） |
| h3 | 「セキュリティとガバナンス」 |
| warn | 機密情報の扱い（旧 warn 流用） |
| h3 | 「チームで使う：個人から組織へ」 |
| prose | 「個人で作った Skills は **ZIP ファイルとして共有可能**。組織展開（プラグイン配布、社内マーケットプレイス等）の最新方法は Anthropic 公式情報を参照」※Codex H2 反映で軽量化 |
| h3 | 「最終確認チェックリスト」 |
| checklist | 旧 checklist 流用 |
| cta | 「最初の一歩」 |

### 付録. 用語集（新規）

| ブロック | 内容 |
|---|---|
| h3 | 「用語集」 |
| table | 用語 / 一行説明 / 詳細 の 3 列、20 語前後 |

掲載予定語: Claude.ai / Claude Cowork / Claude API / Projects / Artifacts / Skills / SKILL.md / プラグイン / Dispatch / MCP / コンテキスト / トークン / YAML / Markdown / kebab-case / プログレッシブ・ディスクロージャー / トリガー / フロントマター / Workflow / references / scripts / assets

---

## 4. Hero・ナビゲーションの更新

### Hero 数値（4 枚）

固定数依存を回避（Codex L1）:

- 「日本企業のAI導入率 55.2%」→ 維持
- 「仮想チーム規模 32 人分」→ 維持
- 「レポート作成時間 7 分」→ 維持
- 「構築期間 2 週間」→ 維持

※「公式 Skills 17 個」のような陳腐化リスクのある数値は採用しない

### Hero メタ

- READING 約 15 分
- SECTIONS 6 章 + 用語集
- FOR Claude.ai を触ったことのある非エンジニア

### Nav リンク

`戦略 / 環境 / 書き方 / 判断 / 実践 / 運用 / 用語集`（7 項目）

---

## 5. 影響範囲（v2 で大幅縮小）

| 項目 | 影響 |
|---|---|
| `content/page.md` | **全面書き換え**（407 → 約 700〜800 行） |
| `templates/`、`scripts/build.js`、`package.json` | **変更なし** |
| `claude-skills-light.html` | 再ビルドで自動更新 |
| 旧アンカーリンク `#s5` | s4 内に `id="usecases"` 中間 anchor を追加で対応 |
| **README / CHANGELOG / editor-guide** | **本計画スコープ外**（Codex M2 反映）。page.md 完了後、必要差分があれば**別承認で実施** |

---

## 6. Agent Team

### モデル割り当てテーブル

| # | エージェント名 | subagent_type | モデル | 担当スコープ | 実行順序 |
|---|---|---|---|---|---|
| 1 | スキーマ・章構成確定 | -（メイン直接） | Opus | 本計画書 | Phase 1（完了） |
| 2 | `content/page.md` 全面書き換え | general-purpose | sonnet | content/page.md | Phase 2 |
| 3 | npm run build 実行 | general-purpose | haiku | - | Phase 3 |
| 4 | 視覚的差分・整合性検証 | general-purpose | sonnet | 生成 HTML レビュー | Phase 4 |
| 5 | 実装後 DA レビュー | general-purpose | opus | 全変更 | Phase 4（並列） |

### モデル割り当ての自己チェック

- [x] 新規コンテンツ作成タスクに sonnet を割り当て（#2）
- [x] 純コマンド実行（`npm run build`）に haiku（#3）
- [x] DA に opus（#5）
- [x] 「メイン直接」はスキーマ確定のみ（#1）
- [x] 各エージェントはスコープ外には触らない

### Phase 2 の実装方針

`content/page.md` は同一ファイルへの全面書き換えのため**並列分担不可**。Sonnet 1 体に以下を渡して一括書き換え:

- 既存 `content/page.md`
- 本計画書 §3（新章構成）
- 既存 `editor-guide.md`（YAML 構文ルール）

---

## 7. Devil's Advocate（計画時セルフレビュー + Codex 反映）

| # | リスク | 対応方針 | 由来 |
|---|---|---|---|
| R1 | Cowork 仕様の最新性が不確実 | 数値・固有名詞を脚注化、「2026年5月時点」明記、公式ヘルプ誘導 | Codex H1 |
| R2 | 「組織配布・プロジェクトスキル」の仕様混同 | s6 で「公式情報を確認」レベルに軽量化、個人 ZIP 共有を主導線 | Codex H2 |
| R3 | ZIP 化・アップロード手順が薄い | s5 に「アップロードまでの 5 ステップ」を steps ブロックで追加 | Codex M1 |
| R4 | README/CHANGELOG/editor-guide 連鎖更新がスコープ拡大 | **本計画スコープ外に変更**、page.md 完了後に別承認 | Codex M2 |
| R5 | Hero「公式 Skills 17 個」は陳腐化 | 採用しない、本文では「複数のテンプレートが提供されている」と一般化 | Codex L1 |
| R6 | Hello Skill「週報整形」の実機検証ができていない | 「典型例」として提示、`※実機での挙動は環境により変動`を注記 | 自セルフ |
| R7 | 旧アンカー `#s5` 後方互換 | s4 内に `id="usecases"` 中間アンカー追加 | 自セルフ |
| R8 | 用語集と本文の重複・維持コスト | 用語集は「最低限の定義」、詳細は本文で。Phase 4 検証時に未掲載語を抽出 | 自セルフ |

### Codex セカンドオピニオン

- **計画時 Codex DA**: **実施済み**（v1 に対して 2026/05/21）
  - HIGH 2 件・MEDIUM 2 件・LOW 1 件の指摘 → 本 v2 で全反映
  - 不確かな情報の事実検証は Codex の知識カットオフ（2024-06）の制約で完全実施できないため、教材内で**断定を避ける**方針で対応

---

## 8. 完了条件

- [ ] `content/page.md` が新 6 章 + 用語集で書き換えられている
- [ ] 全ブロックが既存 19 ブロック種別の範囲内
- [ ] `npm run build` が成功
- [ ] 生成 HTML をブラウザで開いて視覚的に崩れがない
- [ ] Claude Code 固有記述（`~/.claude/`、`/plugin`、`/context`、CLAUDE.md 等）が完全に除去されている
- [ ] Cowork 関連の数値・固有名詞に「2026年5月時点」が明記されている
- [ ] s2/s6 で組織配布関連は「公式情報を参照」の誘導に留まっている
- [ ] s5 に「アップロードまでの 5 ステップ」が含まれる
- [ ] Hello Skill のサンプルが 10〜15 行で完結している
- [ ] 用語集に主要 20 語前後が掲載されている

---

## 9. スコープ外（本実装では扱わない）

- 翻訳（英語版）
- ダークテーマ版 (`claude-skills-dark.html`) の同期書き換え
- インタラクティブ要素（クイズ、進捗バー）
- 動画・図解アニメーション
- 印刷向け PDF 化
- Claude Code 利用者向け付録
- 新規ブロック種別の追加
- ビルドパイプライン（templates/, scripts/, package.json）の変更
- **README / CHANGELOG / editor-guide の更新（Codex M2 反映）**
  - page.md 完了後に必要差分があれば**別承認**で実施
