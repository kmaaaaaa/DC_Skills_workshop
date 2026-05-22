# Changelog

Claude Skills 活用ガイド のすべての変更履歴を記録します。

このプロジェクトは [Keep a Changelog 1.1.0](https://keepachangelog.com/ja/1.1.0/) に準拠し、
バージョン管理は [Semantic Versioning](https://semver.org/lang/ja/) に従います。

## [Unreleased]

## [1.0.0] - 2026-05-21

初期リリース: Markdown ⇄ HTML 連動ビルドパイプラインの実装

### Added

- `claude-skills-light.html` の手書き HTML から Markdown ベース管理へ移行した
- `content/page.md`: YAML フロントマター + Markdown 本文によるハイブリッドソース（407 行）を追加した
- `templates/page.hbs` + 20 個のパーシャル: Handlebars テンプレート（CSS/SVG アイコン保持）を追加した
- `scripts/build.js`: Node.js ビルドスクリプトを追加した
  - YAML パース（js-yaml v4 / YAML 1.2 仕様対応）
  - スキーマ検証（`KNOWN_BLOCK_TYPES`、19 種類のブロック）
  - 3 つの Markdown ヘルパー: `md`（インライン）、`mdBlock`（ブロック）、`mdHead`（見出し）
  - 日本語パンクチュエーション対応の regex 前処理（CommonMark フランキング規則を回避）
- `package.json`: 依存 4 件（handlebars, js-yaml, gray-matter, marked）、npm scripts（`build`）を追加した
- `README.md`: クイックスタート・編集ワークフロー・トラブルシューティングを追加した
- `.gitignore`: node_modules / .tmp / mcp-process-info.txt の除外設定を追加した
- `docs/plans/markdown-html-link-system.md`（+ HTML 版）: 設計計画書を追加した

#### 対応ブロック種別（19 種類）

| 種別 | ブロック名 |
|------|-----------|
| 段落系 | prose, h3, h4 |
| 引用系 | pull, warn |
| カード系 | stats, layers, kitchen, cats, steps, dbs, usecases, pitfalls |
| データ系 | table, impact-table, matrix |
| コード系 | codeblock |
| リスト系 | checklist |
| CTA 系 | cta |

#### 設計上の判断（Phase 4 で発覚した問題への対応）

- 日本語隣接の `**bold**` が `<strong>` 化されない CommonMark フランキング問題を、regex 前処理で回避した
- 見出し用 `mdHead` ヘルパーで段落区切り `\n\n` を `<br/>` に変換し、`<p>` ラップを避けるようにした
- 表（`table` / `impact-table`）は YAML を二次元配列で表現し、テンプレートで `{{this}}` 展開する設計とした

#### スコープ外（今バージョンでは対応しない）

- Watch mode（ファイル変更検知での自動再ビルド）
- ライブリロード / 開発サーバー
- HTML バリデーション / Lint
- ダークテーマ版（`claude-skills-dark.html`）の同パイプライン化

[Unreleased]: https://github.com/example/dc-skills-workshop/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/example/dc-skills-workshop/releases/tag/v1.0.0
