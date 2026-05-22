'use strict';

const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');
const { marked } = require('marked');

// プロジェクトルートを基準にパス解決
const ROOT = path.resolve(__dirname, '..');

// 既知のブロック種別（R4: スキーマ検証用）
const KNOWN_BLOCK_TYPES = [
  'prose', 'h3', 'h4', 'pull', 'stats', 'table', 'impact-table',
  'layers', 'kitchen', 'cats', 'matrix', 'steps', 'dbs',
  'codeblock', 'usecases', 'pitfalls', 'warn', 'checklist', 'cta'
];

/**
 * スキーマ検証: sections[].blocks[].type が既知か確認
 * 違反があれば console.error して exit 1
 */
function validateSchema(data) {
  const sections = data.sections || [];
  let hasError = false;

  sections.forEach((section) => {
    const blocks = section.blocks || [];
    blocks.forEach((block, idx) => {
      if (!KNOWN_BLOCK_TYPES.includes(block.type)) {
        console.error(
          `[スキーマエラー] ${section.id || '(id未設定)'} の block #${idx + 1}: 未知の type "${block.type}"`
        );
        hasError = true;
      }
    });
  });

  if (hasError) {
    process.exit(1);
  }
}

/**
 * パーシャルを templates/partials/ から全件登録
 */
function registerPartials(partialsDir) {
  const files = fs.readdirSync(partialsDir).filter((f) => f.endsWith('.hbs'));
  for (const f of files) {
    const name = path.basename(f, '.hbs');
    const content = fs.readFileSync(path.join(partialsDir, f), 'utf8');
    Handlebars.registerPartial(name, content);
  }
}

/**
 * Handlebars ヘルパーを登録
 */
function registerHelpers() {
  marked.setOptions({ breaks: false, gfm: true });

  // 前処理: 日本語パンクチュエーション隣接で marked の CommonMark フランキング
  // 規則が誤動作するため、**...** と *...* を先に HTML タグへ regex 置換する
  const preprocessEmphasis = (s) =>
    String(s || '')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // インライン Markdown → HTML（段落タグなし）
  Handlebars.registerHelper('md', (s) => {
    return new Handlebars.SafeString(marked.parseInline(preprocessEmphasis(s)));
  });

  // ブロック Markdown → HTML（<p> タグあり）
  Handlebars.registerHelper('mdBlock', (s) => {
    return new Handlebars.SafeString(marked.parse(preprocessEmphasis(s)));
  });

  // 見出し用 Markdown → HTML（<p> ラップなし、段落区切りは <br/> に変換）
  // <h1>/<h2> 内にネストできるよう、ブロック要素を出さない
  // CommonMark のフランキング規則を回避するため、marked ではなく直接置換する
  // （日本語パンクチュエーション「」が *...* を囲むと marked が <em> 化しないため）
  Handlebars.registerHelper('mdHead', (s) => {
    if (!s) return new Handlebars.SafeString('');
    const result = String(s).trim()
      .replace(/\n\s*\n/g, '<br/>')
      .replace(/\n/g, ' ')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return new Handlebars.SafeString(result);
  });

  // 等値比較ヘルパー（フォールバック用: R6 対応）
  Handlebars.registerHelper('eq', (a, b) => a === b);
}

/**
 * ブロック数を再帰的にカウント
 */
function countBlocks(data) {
  return (data.sections || []).reduce((acc, s) => acc + (s.blocks || []).length, 0);
}

// ---- メイン処理 ----
try {
  // 1. content/page.md を読み込み、gray-matter でフロントマター分離
  const mdPath = path.join(ROOT, 'content', 'page.md');
  const src = fs.readFileSync(mdPath, 'utf8');
  const { data } = matter(src, {
    engines: { yaml: { parse: (s) => yaml.load(s) } }
  });

  // 2. スキーマ検証（R4）
  validateSchema(data);

  // 3. パーシャル登録
  const partialsDir = path.join(ROOT, 'templates', 'partials');
  registerPartials(partialsDir);

  // 4. ヘルパー登録
  registerHelpers();

  // 5. メインテンプレートをコンパイル → レンダリング
  const tplPath = path.join(ROOT, 'templates', 'page.hbs');
  const tplSrc = fs.readFileSync(tplPath, 'utf8');
  const tpl = Handlebars.compile(tplSrc, { noEscape: false });
  const html = tpl(data);

  // 6. 出力: プロジェクトルートの claude-skills-light.html
  const outPath = path.join(ROOT, 'claude-skills-light.html');
  fs.writeFileSync(outPath, html, 'utf8');

  // 7. 成功メッセージ
  const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(2);
  const sectionCount = (data.sections || []).length;
  const blockCount = countBlocks(data);
  console.log(`✓ Built claude-skills-light.html (${sizeKB} KB, ${sectionCount} sections, ${blockCount} blocks)`);

} catch (err) {
  // ファイル不在・YAML構文エラー・テンプレート構文エラーを分かりやすく表示
  if (err.code === 'ENOENT') {
    console.error(`[ファイルエラー] ファイルが見つかりません: ${err.path}`);
  } else if (err.name === 'YAMLException') {
    console.error(`[YAMLエラー] YAML構文が不正です: ${err.message}`);
  } else if (err.message && err.message.startsWith('Parse error')) {
    console.error(`[テンプレートエラー] Handlebarsテンプレートの構文エラー: ${err.message}`);
  } else {
    console.error(`[ビルドエラー] ${err.message}`);
  }
  process.exit(1);
}
