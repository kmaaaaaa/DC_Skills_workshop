---
page:
  title: "Claude Skills 活用ガイド｜非エンジニアのための実践プレイブック"
  lang: ja

nav:
  brand: "Claude Skills 活用ガイド"
  brand_icon: ico-spark
  links:
    - { href: "#s1", label: "戦略" }
    - { href: "#s2", label: "環境" }
    - { href: "#s3", label: "書き方" }
    - { href: "#s4", label: "判断" }
    - { href: "#s5", label: "実践" }
    - { href: "#s6", label: "運用" }
    - { href: "#glossary", label: "用語集" }

hero:
  eyebrow: "NON-ENGINEER PLAYBOOK ／ 2026"
  headline_md: |
    非エンジニアのための

    Claude *「Skills」*実践プレイブック
  lede: "AIを「便利なチャット」から「頼れる自律的なチーム」へ。業務手順をパッケージ化し、組織の知的資産（IP）として蓄積するための実践マニュアル。コーディング不要で、AIに専門業務を教え込む。"
  meta:
    - { icon: ico-clock, label: "READING 約15分" }
    - { icon: ico-book,  label: "SECTIONS 6章 + 用語集" }
    - { icon: ico-team,  label: "FOR Claude.aiを触ったことのある非エンジニア" }
  figure:
    - { key: "日本企業のAI導入率", value: "55.2", unit: "%", caption: "営業資料作成・顧客対応にAIを導入" }
    - { key: "仮想チーム規模",     value: "32",   unit: "人分", caption: "1人で完遂する仮想PRチーム（チューリング社）" }
    - { key: "レポート作成時間",   value: "7",    unit: "分",   caption: "従来3〜5時間 → 約7分（Rimo社）" }
    - { key: "構築期間",           value: "2",    unit: "週間", caption: "8部門の業務を明文化・統制" }

sections:
  - id: s1
    num: "01"
    icon: ico-flag
    title_md: |
      なぜ Skills か：

      AIエージェント時代の戦略的意義
    subtitle: "対話から自律業務遂行へ ── ビジネスリーダーが「使いこなす側」に回るために"
    blocks:
      - type: prose
        md: |
          2026年現在、AI活用は単なる「対話（チャット）」の域を超え、特定の業務を自律的に遂行する「**AIエージェント**」へと劇的なシフトを遂げています。日本企業の55.2%が営業資料作成や顧客対応にAIを導入している今、非エンジニアのビジネスリーダーがこの技術を「使いこなす側」に回ることは、組織の競争力を左右する決定的な戦略課題です。

          Claudeの「Skills（スキル）」とは、頻繁に発生する業務手順をフォルダにパッケージ化し、特定のキーワードで自動呼び出しできる**再利用可能な指示テンプレート**です。従来のプロンプトが「その場限りの使い捨ての命令」であるのに対し、Skillsは「業務手順のデジタルマニュアル」であり、組織の**知的資産（IP）**としての性質を持ちます。

      - type: stats
        items:
          - org: "チューリング社"
            org_icon: ico-team
            before: "8部門"
            after: "1人"
            label_md: "わずか2週間で **8部門・32人分の業務範囲** を 1 人の PR 担当が統括できる仮想チームを構築（人員削減ではなく業務範囲の拡張）。全41ファイルのSkillsを明文化。"
          - org: "Anthropic社"
            org_icon: ico-bolt
            before: "5–10時間"
            after: "30分"
            label_md: "マーケのローンチブリーフ作成を **5〜10時間 → 30分** へ。広告制作は30分 → 30秒に短縮。"
          - org: "Rimo社"
            org_icon: ico-chart
            before: "3–5時間"
            after: "7分"
            label_md: "広告分析レポート作成を **従来3〜5時間 → 約7分** で完了。情報収集から集計まで自動化。"

      - type: impact-table
        caption: "BEFORE / AFTER ─ 主要業務における処理時間の変化（※ 公開事例の参考値。実際の効果は業務特性・データ量・運用熟練度により変動します）"
        headers: ["業務内容", "従来（手動）", "Skills 活用後", "変化量"]
        rows:
          - ["広告分析・KPI レポート", "3〜5 時間", "約 7 分", "最大 −97%"]
          - ["ローンチブリーフ作成", "5〜10 時間", "30 分", "最大 −95%"]
          - ["記事・リリース制作", "約 1〜2 時間", "15 分（高品質維持）", "最大 −87%"]
          - ["広告制作（クリエイティブ）", "30 分", "30 秒", "−98%"]

      - type: prose
        md: |
          ※ 数値はAnthropic／Rimo／チューリング社の公開事例を基にした参考値。実際の効果は業務特性により変動します。

      - type: pull
        body_md: 'Skillsは一度作って終わりではなく、「使いながら育てる資産」である。担当者が離れても、業務の"やり方"が組織に残り続ける。'
        cite: "—— 戦略的ベネフィットの本質"

  - id: s2
    num: "02"
    icon: ico-layers
    title_md: |
      環境と全体像：

      Claude.ai で Skills を使う
    subtitle: "Skills はフォルダを ZIP にしてアップロードするだけ ── コーディング不要"
    blocks:
      - type: prose
        md: |
          Skills は **SKILL.md**（指示ファイル）と参照ファイルを束ねた**フォルダ**です。Claude.ai の設定画面から ZIP ファイルとしてアップロードするだけで、すぐにチャットで活用できます。プログラミングの知識は一切不要です。

      - type: h3
        text: "どこで Skills を使えるか"

      - type: table
        class: envs
        headers: ["利用環境", "Skills 機能", "備考"]
        rows:
          - ["Claude.ai 無料プラン", "利用制限あり", "機能の範囲は公式ヘルプを確認"]
          - ["Claude.ai 有料プラン", "フルアクセス", "ZIP アップロードで即利用開始"]
          - ["Claude Cowork", "有料プラン機能 + 拡張機能", "自律実行・ローカルファイル操作等が追加される（2026年5月時点）"]

      - type: h3
        text: "Skills フォルダの中身"

      - type: prose
        md: |
          1つのスキルは以下のフォルダ構成でまとめます。必須なのは `SKILL.md` のみ。他のフォルダは必要に応じて追加します。

      - type: codeblock
        lines:
          - { kind: c, text: "## スキルフォルダの構成例" }
          - { kind: text, text: "" }
          - { kind: s, text: "my-skill/" }
          - { kind: k, text: "  SKILL.md" }
          - { kind: text, text: "            ← 必須：指示とメタデータを記述" }
          - { kind: k, text: "  references/" }
          - { kind: text, text: "        ← 任意：ブランドガイド等の参照ファイル" }
          - { kind: k, text: "  scripts/" }
          - { kind: text, text: "           ← 任意：計算・変換スクリプト" }
          - { kind: k, text: "  assets/" }
          - { kind: text, text: "            ← 任意：画像・テンプレートファイル" }

      - type: h3
        text: "キッチンのアナロジー：MCP と Skills の関係"

      - type: prose
        md: |
          公式ガイドでは「キッチンのアナロジー」が用いられています。どれだけ優れた道具（MCP）があっても、正しいレシピ（Skills）がなければ、価値ある成果物は生まれません。

      - type: kitchen
        items:
          - icon: ico-kitchen
            title: "MCP（Model Context Protocol）"
            tag: "TOOLS"
            body_md: "プロ仕様の**キッチン**。道具、食材、API連携など、AIが外部世界とつながるための機構。何ができるかを規定するインフラ。"
          - icon: ico-recipe
            title: "Skills"
            tag: "RECIPE"
            body_md: "**レシピ（手順書）**。複数の道具をどの順序で使うべきかを「オーケストレーション（調整）」する。何をするかを規定する知的資産。"

      - type: warn
        icon: ico-alert
        title: "情報の鮮度に関する注意"
        body_md: |
          本ガイドの環境・機能情報は **2026年5月時点**のものです。料金・プラン名・機能の最新情報は **Anthropic 公式ヘルプ（claude.ai 内ドキュメント）** で必ず確認してください。

  - id: s3
    num: "03"
    icon: ico-feather
    title_md: |
      SKILL.md の読み方・書き方：

      文書で AI を教育する
    subtitle: "自分で書くのではなく、Claude との壁打ちの中で裏側で生まれる文書"
    blocks:
      - type: prose
        md: |
          Skills の中核ファイル `SKILL.md` は **Markdown（マークダウン）** 形式の文書ですが、**あなたが自分で書く必要はありません**。Claude.ai のチャットで「こんな業務を自動化したい」と相談すると、Claude が必要な情報をヒアリングしながら、**裏側で SKILL.md を起草**してくれます。あなたの役割は **「自分の業務を言葉で説明すること」**──つまり *壁打ち*です。

      - type: h3
        text: "壁打ちで生まれる：Claude との対話フロー"

      - type: prose
        md: |
          SKILL.md は完成形を見ながらゼロから書くものではなく、Claude との会話の中で少しずつ形になります。あなたが書くのは「業務の言葉」だけ。Markdown も YAML も Claude が裏側で整えます。

      - type: steps
        items:
          - n: "STEP 01"
            icon: ico-spark
            title: "業務の課題を相談する"
            body_md: "「経理の月次レポート作成を自動化したい」など、自然な日本語で目的を伝える。専門用語もコードも不要。"
          - n: "STEP 02"
            icon: ico-team
            title: "Claude の質問に答える"
            body_md: "「入力データはどの形式？」「いつ使う？」「出力は誰向け？」など、Claude が必要な情報をヒアリングしてくる。普段の業務知識を答えるだけ。"
          - n: "STEP 03"
            icon: ico-feather
            title: "Claude が裏側で起草する"
            body_md: "会話の内容を元に、Claude が `SKILL.md` を生成。YAML フロントマター・Workflow・必要なら `references/` の補助ファイルまで一式整える。"
          - n: "STEP 04"
            icon: ico-check
            title: "生成物をレビューして再壁打ち"
            body_md: "提示された SKILL.md を読み、意図とズレがあれば「ここはこう変えて」と追加で対話。納得できたら ZIP 化してアップロード。"

      - type: prose
        md: |
          以下のセクションは、Claude が出力した SKILL.md を **「読み解く」**ための最低限の知識です。自分で書くためではなく、生成物を理解し的確にレビューするために役立ちます。

      - type: h3
        text: "読み解くための Markdown 5 記法"

      - type: layers
        items:
          - num: "M1"
            title: "見出し（# 記号）"
            body: "# で大見出し、## で中見出し、### で小見出し。階層構造を作るときに使う。"
            side: "HEADING\n構造を作る"
          - num: "M2"
            title: "リスト（- または 1. ）"
            body: "- item で箇条書き、1. item で番号付きリスト。手順・ルールの列挙に使う。"
            side: "LIST\n列挙する"
          - num: "M3"
            title: "強調（** または * ）"
            body: "**太字** で強調、*斜体* でやや強調。重要なキーワードや注意事項に使う。"
            side: "EMPHASIS\n目立たせる"
          - num: "M4"
            title: "コード（` バッククォート）"
            body: "`コード` でインラインコード。ファイル名・コマンド・変数名を明示するときに使う。"
            side: "CODE\n正確に示す"
          - num: "M5"
            title: "リンク（[テキスト](URL)）"
            body: "[テキスト](URL) でハイパーリンク。参照先 URL や外部ドキュメントを示すときに使う。"
            side: "LINK\n参照先を示す"

      - type: h3
        text: "YAML フロントマターとは"

      - type: prose
        md: |
          Claude が生成する SKILL.md の冒頭には、必ず `---` で囲まれた **YAML フロントマター**（メタデータ）が記述されます。ここに書かれた `name`（スキル名）と `description`（説明）を Claude 本体が読み取り、「いつこのスキルを使うか」を自動判断します。**レビュー時はこの 2 項目が業務シナリオと合っているかを必ず確認**してください。

      - type: codeblock
        lines:
          - { kind: c, text: "## SKILL.md の最小構成" }
          - { kind: text, text: "" }
          - { kind: k, text: "---" }
          - { kind: k, text: "name:" }
          - { kind: s, text: " weekly-report" }
          - { kind: c, text: "  # kebab-case で命名。スペース・大文字・アンダースコア禁止" }
          - { kind: k, text: "description:" }
          - { kind: s, text: " 週報の内容を受け取り、所定のフォーマットに整形して出力する。" }
          - { kind: c, text: "  # Claude がこの説明を読んでトリガーを判断する" }
          - { kind: k, text: "---" }
          - { kind: text, text: "" }
          - { kind: c, text: "# Workflow（以下に手順を記述）" }
          - { kind: text, text: "1. ユーザーから週報の本文を受け取る" }
          - { kind: text, text: "2. 所定のフォーマット（references/format.md 参照）に整形する" }
          - { kind: text, text: "3. 整形した週報を出力する" }

      - type: h3
        text: "3 層構造（Progressive Disclosure）"

      - type: prose
        md: |
          Skillsは、AIのコンテキスト（記憶領域）を節約しつつ、必要な時に深い知識を引き出す**「段階的な情報開示」**構造を採用しています。

      - type: layers
        items:
          - num: "L1"
            title: "メタデータ（YAMLフロントマター）"
            body: "SKILL.mdの冒頭に記述。名前（kebab-case）と説明。Claudeが「いつ起動すべきか」を判断するトリガー。"
            side: "TRIGGER\n軽量・常時参照"
          - num: "L2"
            title: "指示本文（Workflow）"
            body: "業務の具体的なステップバイステップ。手順、判断分岐、出力フォーマットを記述する中核部分。"
            side: "INSTRUCTION\n呼び出し時のみ"
          - num: "L3"
            title: "参照ファイル（References）"
            body: "ブランドガイドや過去のデータ等の「静的知識」。指示本文から分離して管理することで「プロンプトの肥大化」を防ぐ。"
            side: "KNOWLEDGE\n必要時に展開"

      - type: h3
        text: "Hello Skill：壁打ちから生まれた完成形"

      - type: prose
        md: |
          「週報整形を自動化したい」という相談から、Claude が裏側で起こした SKILL.md の例です。あなたが書いたのは **業務の説明だけ**。Markdown 構造はすべて Claude が整えています。

      - type: codeblock
        lines:
          - { kind: c, text: "## 完全なサンプル：weekly-report/SKILL.md" }
          - { kind: text, text: "" }
          - { kind: k, text: "---" }
          - { kind: k, text: "name:" }
          - { kind: s, text: " weekly-report" }
          - { kind: k, text: "description:" }
          - { kind: s, text: " ユーザーがチャットに貼り付けた週報の本文を受け取り、所定のフォーマット（3セクション構成）に整形して出力する。メンバーから受け取った週報を整理したいときに使う。" }
          - { kind: k, text: "---" }
          - { kind: text, text: "" }
          - { kind: c, text: "# Workflow" }
          - { kind: text, text: "" }
          - { kind: text, text: "## 入力" }
          - { kind: text, text: "- ユーザーが週報本文をチャットに貼り付ける" }
          - { kind: text, text: "" }
          - { kind: text, text: "## 処理手順" }
          - { kind: text, text: "1. 本文を「今週の成果」「来週の予定」「課題・相談事項」の3セクションに分類する" }
          - { kind: text, text: "2. 各セクションを箇条書きに整形する" }
          - { kind: text, text: "3. 文体を敬体（です・ます調）に統一する" }
          - { kind: text, text: "" }
          - { kind: text, text: "## 出力" }
          - { kind: text, text: "- Markdown 形式で出力する" }
          - { kind: text, text: "- 各セクションの先頭に ## 見出しを付ける" }

      - type: prose
        md: |
          **逐行解説:**

          - `name: weekly-report` ── スキルの識別子（kebab-case 必須）。フォルダ名と一致させると管理しやすい。
          - `description:` ── Claude がこのスキルを「いつ使うか」を判断する最重要フィールド。具体的なシナリオ（「メンバーから週報を受け取ったとき」）を含めるのがコツ。
          - `# Workflow` 以下 ── 業務手順を日本語で記述するだけ。プログラミング知識は不要。
          - 入力・処理手順・出力の3セクション構造 ── この形が最も Claude に伝わりやすい基本パターン。

          ※ 実機での挙動は Claude のバージョンや環境により変動することがあります。初回は必ず動作確認を行ってください。

      - type: warn
        icon: ico-alert
        title: "命名規則と YAML の禁則事項"
        body_md: |
          - **スキル名（name）**: `kebab-case` を使用（例: `financial-report`）。スペース・大文字・アンダースコア禁止
          - **名前に「Claude」を含めない**: `claude-report` のような命名は禁止
          - **XMLタグ禁止**: `description` フィールド内に `<tag>` 形式のXMLタグを使用してはいけない
          - **ダブルクォートの扱い**: 文字列内に `"` を含む場合はシングルクォート `'...'` で囲む

  - id: s4
    num: "04"
    icon: ico-filter
    title_md: |
      何をスキル化するか：

      判断基準と職種別ユースケース
    subtitle: "すべての業務をスキル化する必要はない。リソースを集中すべき領域を見極める"
    blocks:
      - type: h3
        text: "向く業務の 3 カテゴリー"

      - type: cats
        items:
          - icon: ico-doc
            title: "定型アセット生成"
            body: "同じ構造のドキュメントを繰り返し作成する業務。フォーマットが安定しているほどスキル化の効果が高い。"
            ex: "EX. 月次レポート ／ 週報 ／ SNS投稿案"
          - icon: ico-route
            title: "マルチステップ・ワークフロー"
            body: "「調査 → 分析 → 執筆 → レビュー」など、複数の工程を跨ぐ連続プロセス。順序と判断分岐を明文化できる業務。"
            ex: "EX. 調査 → 分析 → 執筆 → レビュー"
          - icon: ico-check
            title: "品質チェック・レビュー"
            body: "契約書やコンプライアンスのクロスチェック。観点が長く列挙でき、抜け漏れ防止が成果に直結する業務。"
            ex: "EX. 契約書レビュー ／ 約100項目の規定確認"

      - type: h3
        text: "頻度 × 複雑性マトリクス"

      - type: prose
        md: |
          「**頻度 × 複雑性**」の2軸で評価し、スキル化の優先度を決めます。

      - type: matrix
        y_label: "複雑性 ／ COMPLEXITY"
        x_labels:
          left: "← 頻度：低"
          right: "頻度：高 →"
        cells:
          - level: "優先度：中"
            hi: false
            title: "複雑だが、頻度は低い"
            body: "年次の戦略立案、特殊な契約レビューなど。価値は高いが頻度が少ないため、人間が一度パッケージ化して残しておく対象。"
          - level: "優先度：高 ★"
            hi: true
            title: "頻度が高く、複雑性も高い"
            body: "毎週の多角的な財務分析、複数部門のKPI集計、顧客提案資料の作成など。Skills化のROIが最も大きい領域。"
          - level: "優先度：低"
            hi: false
            title: "単発で、シンプル"
            body: "単発のアイデア出し、ちょっとした調べもの。通常のチャット利用で十分。スキル化のコストが回収できない。"
          - level: "優先度：中"
            hi: false
            title: "頻度は高いが、シンプル"
            body: "定型フォーマットへのデータ転記。共通ルール化や軽量なテンプレートで十分なケースが多い。"

      - type: h3
        text: "職種別ユースケース 6 選"

      - type: usecases
        items:
          - icon: ico-chart
            title: "経理：月次決算レポート自動生成"
            body: "CSV形式の財務データを読み込み、前月比・前年比の差異分析を伴う経営報告書を自動作成。情報収集から集計まで自動化し、従来3〜5時間の作業を大幅短縮。"
            meta_left: "経理・財務"
            meta_right: "3–5h → 約7min"
          - icon: ico-bolt
            title: "マーケティング：ローンチブリーフ作成"
            body: "商品・サービスの情報を入力するだけで、マーケティングブリーフの草案を自動生成。競合分析・ターゲット定義・メッセージング案を一括で出力する。"
            meta_left: "マーケティング"
            meta_right: "5–10h → 30min"
          - icon: ico-team
            title: "人事：採用要件定義・JD作成"
            body: "部門長へのヒアリング内容を入力すると、採用要件定義書・職務記述書（JD）の草案を生成。複数ポジションのJD作成を並行処理できる。"
            meta_left: "人事・採用"
            meta_right: "OUTPUT: .docx"
          - icon: ico-arrow
            title: "営業：提案資料・議事録作成"
            body: "商談メモや録音テキストから、提案資料のアウトライン・議事録・ネクストアクション一覧を自動生成。CRMへの転記用データも同時出力。"
            meta_left: "営業・BD"
            meta_right: "OUTPUT: Markdown"
          - icon: ico-shield
            title: "法務：契約書レビュー・チェックリスト"
            body: "契約書ドラフトを入力すると、社内規定や法令との整合性を references/ 内のガイドラインに基づき自動点検。70〜100項目のチェックを数分で完遂。"
            meta_left: "法務・コンプライアンス"
            meta_right: "ITEMS: 70–100"
          - icon: ico-tool
            title: "IT・情シス：問い合わせ対応テンプレート"
            body: "社内ヘルプデスクへの問い合わせ内容を分類し、既存 FAQ から回答案を自動生成。対応記録のナレッジ化・FAQ更新提案まで一貫して実行。"
            meta_left: "IT・情シス"
            meta_right: "FAQ自動更新"

      - type: h3
        text: "自分の業務に当てはめる"

      - type: checklist
        title: "業務棚卸し：スキル化候補を探すチェックリスト"
        items_md:
          - "週に2回以上、**同じ手順で**繰り返している業務がある"
          - "「このフォーマットで出して」と毎回 Claude に説明している業務がある"
          - "引き継ぎや教育に時間がかかる、**属人化した**業務がある"
          - "抜け漏れが発生しやすく、**チェックリスト**が必要な業務がある"
          - "複数ツールを行き来する**マルチステップ**の業務がある"
          - "新しいメンバーに**何度も同じ説明**をしている業務がある"

  - id: s5
    num: "05"
    icon: ico-tool
    title_md: |
      作って届ける：

      実践プロセス完全ガイド
    subtitle: "要件定義からアップロード・デバッグまで、Claude.ai 前提の全手順"
    blocks:
      - type: h3
        text: "構築の 4 ステップ"

      - type: steps
        items:
          - n: "STEP 01"
            icon: ico-target
            title: "要件定義"
            body_md: "「何を達成したいか」「入力データは何か」を明確化。出力フォーマットも先に決める。まず Claude.ai のチャットで一度その業務を手動でやってみるのが近道。"
          - n: "STEP 02"
            icon: ico-feather
            title: "草案作成（自動生成）"
            body_md: "Claude.ai で一度作業をさせ、完了後に「**今やった作業を SKILL.md にして**」と頼む。YAML フロントマター付きの草案が自動生成される。"
          - n: "STEP 03"
            icon: ico-search
            title: "テストと評価"
            body_md: "生成した SKILL.md をアップロードし、実際にチャットで呼び出して動作確認する。言い換え表現でもトリガーされるかを確認する。"
          - n: "STEP 04"
            icon: ico-cycle
            title: '"育てる"運用'
            body_md: "実行後に「**改善点はある？**」と問いかけ、フィードバックを反映して SKILL.md を更新し続ける。3回使って改善するサイクルが品質を高める。"

      - type: h3
        text: "DBS フレームワーク"

      - type: prose
        md: |
          高品質なスキルは、以下の **DBS フレームワーク** で設計されます。

      - type: dbs
        items:
          - letter: "D"
            name: "DIRECTION"
            title: "指示"
            body_md: "SKILL.md に書かれた手順とルール。業務フローの骨格となる中核ドキュメント。"
          - letter: "B"
            name: "BLUEPRINTS"
            title: "参照"
            body_md: "`references/` フォルダに置くスタイルガイド等の背景知識。静的な知見を分離して保持。"
          - letter: "S"
            name: "SOLUTIONS"
            title: "スクリプト"
            body_md: "計算やファイル操作用のコード。Claude に「`scripts/` に保存して」と頼めば自動生成・配置される。"

      - type: h3
        text: "アップロードまでの 5 ステップ"

      - type: steps
        items:
          - n: "STEP 01"
            icon: ico-feather
            title: "SKILL.md を作成する"
            body_md: "テキストエディタまたは Claude.ai のチャットを使って `SKILL.md` を作成する。草案を Claude に自動生成させる方法（STEP 02: 草案作成）が最も手軽。"
          - n: "STEP 02"
            icon: ico-folder
            title: "フォルダにまとめる"
            body_md: "`my-skill/` フォルダを作成し、その中に `SKILL.md` を配置する。参照ファイルがあれば `references/` サブフォルダに入れる。"
          - n: "STEP 03"
            icon: ico-grid
            title: "フォルダを ZIP 化する"
            body_md: "**Windows 11**: フォルダを右クリック → **「ZIP ファイルに圧縮する」** ／ **macOS**: フォルダを右クリック → **「フォルダ名 を圧縮」** で ZIP ファイルを作成する。"
          - n: "STEP 04"
            icon: ico-arrow
            title: "Claude.ai 設定でアップロードする"
            body_md: "Claude.ai の設定メニュー（**Settings / Customize 等、表記は変動する可能性あり**）から **「Skills」**（または同等の名称）セクションを開き、作成した ZIP ファイルをアップロードする。最新の入口は Anthropic 公式ヘルプを参照。"
          - n: "STEP 05"
            icon: ico-check
            title: "チャットで動作を検証する"
            body_md: "新しいチャットを開き、description に書いたシナリオでスキルが自動トリガーされるかを確認する。**例：「今週の週報をまとめて：今週は新規顧客 5 社にアプローチし…」と入力すると `weekly-report` スキルが起動するか確認**。トリガーされない場合はデバッグへ。"

      - type: h3
        text: "description の設計：トリガー語を制す"

      - type: prose
        md: |
          スキルが「いつ使われるか」は `description` フィールドで決まります。以下の Before / After でその差を確認してください。

      - type: stats
        items:
          - org: "Bad description"
            org_icon: ico-alert
            before: "曖昧な説明"
            after: "誤発動"
            label_md: '`description: レポートを作成する` ── 汎用的すぎて、あらゆる「レポート」で発動してしまう。'
          - org: "Good description"
            org_icon: ico-check
            before: "具体的な説明"
            after: "正確な発動"
            label_md: '`description: 月次の財務 CSV を読み込み、前月比・前年比の差異分析を伴う経営報告書を生成する。毎月の締め後に使う。` ── シナリオ・入力・タイミングが明確。'
          - org: "Tips"
            org_icon: ico-book
            before: "3要素"
            after: "精度UP"
            label_md: "description に含めるべき3要素: **①何をするか**（動詞+目的語） **②どんな入力か**（CSVなど） **③いつ使うか**（月次締め後など）"

      - type: h3
        text: "公式テンプレートを活用する"

      - type: prose
        md: |
          Anthropic が公式に提供している複数のテンプレートを参考に、自社用にカスタマイズするのが最も手軽な始め方です。ゼロから書くより、既存テンプレートを編集する方が品質が安定します。

      - type: prose
        md: |
          ※ 2026年5月時点で公開されている主な公式 Skills 例：PDF・Word・Excel・PowerPoint 文書生成、ブランドガイド適用、Claude API ヘルパー、MCP builder、Webapp テスティング、Slack GIF、Algorithmic Art、Internal Comms 等。最新一覧は Anthropic 公式リポジトリ・ヘルプを参照してください。

      - type: prose
        md: |
          Claude Cowork では業界別バンドルも順次提供されており、既存 Skills を組み合わせて業務に即した構成を素早く整えられます。

      - type: prose
        md: |
          ※ 2026年5月時点の業界別バンドル例：Legal（法務）、Small Business（中小企業向け）、Marketing Ops（マーケティング運用）等。順次拡張中のため、最新情報は公式ヘルプを参照してください。

      - type: h3
        text: "動かない時の 3 ステップ"

      - type: steps
        items:
          - n: "STEP 01"
            icon: ico-search
            title: "description を見直す"
            body_md: "スキルがトリガーされない最大の原因は description の曖昧さ。「いつ使うか」「どんな入力か」を具体的に書き直す。"
          - n: "STEP 02"
            icon: ico-alert
            title: "YAML 構文を確認する"
            body_md: "インデント（スペース2つ・タブ禁止）、引用符の使い分け（文字列内に `\"` がある場合はシングルクォート）、コロン（`:`）の後ろのスペースを再確認する。"
          - n: "STEP 03"
            icon: ico-book
            title: 'Claude に「なぜ呼ばれなかった？」と聞く'
            body_md: "スキルが動かなかったチャットで「このスキルはなぜ使われなかったか教えて」と Claude に質問する。Claude 自身が原因を分析・提案してくれることが多い。"

  - id: s6
    num: "06"
    icon: ico-shield
    title_md: |
      運用・リスク・育てる文化：

      Skills を組織の資産にする
    subtitle: '"育てる資産"として運用するための落とし穴、セキュリティ、チームへの展開'
    blocks:
      - type: h3
        text: "やりがちな失敗と対策"

      - type: pitfalls
        items:
          - n: "01"
            title: "指示の詰め込みすぎ"
            body_md: "1スキルで全業務をやらせると精度が落ちる。「1スキル1タスク」に分割し、必要なら複数のスキルを連携させる。"
          - n: "02"
            title: "不適切な Description"
            body_md: "曖昧な説明は誤発動の原因。「**いつ使うか**」を具体的に記述し、入力の種類・使用タイミングをトリガー語として含める。"
          - n: "03"
            title: "コンテキスト消費の無頓着"
            body_md: "不要に大きな SKILL.md や大量の references ファイルを常時読み込ませると、Claude の処理精度が低下する。必要な情報のみを含める設計を心がける。"
          - n: "04"
            title: "公開スキルの無検証利用"
            body_md: "公開スキルの**一定数にセキュリティ上の問題**が報告されています。必ず中身（SKILL.md と references）を確認してから利用する。"

      - type: h3
        text: "セキュリティとガバナンス"

      - type: warn
        icon: ico-lock
        title: "機密情報の取り扱い"
        body_md: "機密情報の扱いには細心の注意が必要です。組織が定める**「機密性A」**のデータは入力制限をかけ、適切なガバナンス下で運用してください。スキルが参照する `references/` 配下のデータについても、機密区分・更新責任者・レビュー周期を明示しておくことが望ましいです。"

      - type: h3
        text: "チームで使う：個人から組織へ"

      - type: prose
        md: |
          個人で作った Skills は **ZIP ファイルとして共有**できます。チームメンバーに ZIP を渡して Claude.ai の Settings > Skills からアップロードしてもらうだけで、同じスキルを組織内で利用開始できます。

          組織全体への展開（プラグイン配布、社内マーケットプレイス等）の最新方法は、Anthropic 公式情報を確認してください。2026年5月時点では、個人間の ZIP 共有が最もシンプルな方法です。

      - type: h3
        text: "最終確認チェックリスト"

      - type: checklist
        title: "スキル公開前の最終確認"
        items_md:
          - "「1スキル＝1タスク」の粒度に保たれているか"
          - "Description に *「いつ使うか」* が具体的に記述されているか"
          - "コンテキスト消費が過大にならないよう、読み込みファイルを最小化したか"
          - "外部公開スキルを利用する場合、SKILL.md と参照ファイルを目視確認したか"
          - "機密区分（A/B/C）と入力可否のルールが定められているか"
          - "3回実行 → 改善のサイクルが習慣化されているか"

      - type: cta
        title: "最初の一歩は、たった一つの繰り返しタスクから。"
        body: "Skillsは、AIを「便利なチャット」から「頼れる自律的なチーム」へと変えるための、組織にとっての知的資産です。まずは今日、1つの繰り返しタスクを特定し、Claudeに「今やったことを SKILL.md にして」と伝えてください。そして3回使って改善するサイクルを回し始めること ── それが、AIエージェント時代のリーダーとしての最初の一歩です。"
        button_label: "書き方を読む"
        button_href: "#s3"

  - id: glossary
    num: "—"
    icon: ico-book
    title_md: |
      用語集：

      本ガイドで頻出する用語の定義
    subtitle: "最低限の定義を一覧で確認する"
    blocks:
      - type: h3
        text: "用語集"

      - type: glossary-table
        headers: ["用語", "一行説明", "詳細"]
        rows:
          - id: term-claude-ai
            cells: ["Claude.ai", "Anthropic が提供する Web チャット製品", "ブラウザから利用できる Claude の公式インターフェース。無料プランと有料プランがある。"]
          - id: term-claude-cowork
            cells: ["Claude Cowork", "Claude.ai の有料プラン向け自律実行機能", "ローカルファイル操作・スケジュール実行などの拡張機能を提供。2026年5月時点の情報のため最新は公式を参照。"]
          - id: term-claude-api
            cells: ["Claude API", "開発者向けの Claude 接続インターフェース", "エンジニアがアプリやシステムに Claude を組み込む際に使用。本ガイドの対象外。"]
          - id: term-projects
            cells: ["Projects", "Claude.ai のチャット管理機能", "テーマ別に会話をグループ化し、コンテキスト（記憶）を共有できる機能。"]
          - id: term-artifacts
            cells: ["Artifacts", "Claude が生成した成果物", "Claude がチャット内で生成した文書・コード・表などのファイル。ダウンロードや共有が可能。"]
          - id: term-skills
            cells: ["Skills", "業務手順をパッケージ化した再利用可能な指示テンプレート", "SKILL.md を中核とするフォルダ。ZIP でアップロードして使う。"]
          - id: term-skill-md
            cells: ["SKILL.md", "スキルの中核ファイル", "YAML フロントマター（name / description）と Markdown で書かれた Workflow で構成される。"]
          - id: term-plugin
            cells: ["プラグイン", "Claude に機能を追加する拡張モジュール", "Anthropic や開発者が提供する機能拡張。Skills はプラグインの一形態として位置づけられる場合がある。"]
          - id: term-dispatch
            cells: ["Dispatch", "Skills のトリガー判断メカニズム", "Claude が description を読んで「このスキルを使うべきか」を自動判断するプロセス。"]
          - id: term-mcp
            cells: ["MCP", "Model Context Protocol の略。AIと外部ツールをつなぐ規格", "Anthropic が策定したオープン規格。Skills はMCPの上で動くレシピのような存在。"]
          - id: term-context
            cells: ["コンテキスト", "Claude が一度の会話で保持できる情報の総量", "トークンで計測される。多くの情報を読み込むほどコンテキストを消費し、処理精度に影響する。"]
          - id: term-token
            cells: ["トークン", "AI がテキストを処理する最小単位", "日本語では概ね1〜2文字が1トークン。コンテキストの消費量・APIの料金計算に使われる。"]
          - id: term-yaml
            cells: ["YAML", "設定ファイルの記述形式", "SKILL.md のフロントマターで使用。key: value 形式で読みやすく構造化されたデータを表現できる。"]
          - id: term-markdown
            cells: ["Markdown", "軽量マークアップ言語", "# 見出し、- リスト、**太字** などの記法でテキストを構造化する。SKILL.md の本文部分で使用。"]
          - id: term-kebab-case
            cells: ["kebab-case", "単語をハイフンでつなぐ命名規則", "例: `financial-report`、`weekly-report`。スペースや大文字・アンダースコアは使用しない。"]
          - id: term-progressive-disclosure
            cells: ["プログレッシブ・ディスクロージャー（Progressive Disclosure）", "段階的な情報開示の設計原則", "必要なときに必要な情報だけを展開する設計。コンテキストの節約と精度向上を両立する。本文 s3 の「3 層構造」と同義。"]
          - id: term-dbs-framework
            cells: ["DBS フレームワーク", "高品質スキル設計のための 3 要素", "Direction（指示／SKILL.md 本文）／ Blueprints（参照ファイル）／ Solutions（補助スクリプト）の頭文字。役割を分離して再利用性と保守性を高める設計指針。"]
          - id: term-trigger
            cells: ["トリガー", "スキルを自動起動させるキーワード・シナリオ", "description に書かれた内容をもとに Claude が判断する。具体的なシナリオが含まれるほど精度が上がる。"]
          - id: term-frontmatter
            cells: ["フロントマター", "ファイル冒頭の --- で囲まれたメタデータ領域", "SKILL.md では name と description を記述する。Claude が Dispatch（起動判断）に使用する。"]
          - id: term-workflow
            cells: ["Workflow", "SKILL.md の本文セクション", "フロントマターの後に記述する手順書。Claude が実際に実行する業務フローを記述する。"]
          - id: term-references
            cells: ["references", "Skills フォルダ内の参照ファイル置き場", "ブランドガイド・フォーマット定義・チェックリストなど「静的知識」を格納するサブフォルダ。"]
          - id: term-scripts
            cells: ["scripts", "Skills フォルダ内のスクリプト置き場", "計算・データ変換などのコードを格納するサブフォルダ。Claude に自動生成させることができる。"]
          - id: term-assets
            cells: ["assets", "Skills フォルダ内の素材置き場", "画像・テンプレートファイルなどを格納するサブフォルダ。スキルが参照する静的ファイル全般。"]

footer:
  left: "CLAUDE SKILLS PLAYBOOK / 社内勉強会資料"
  right: "v2.0 · 2026"
---
