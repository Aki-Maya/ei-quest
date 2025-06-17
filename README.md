# ShakaQuest 完全版 - 中学受験社会学習アプリ

**地理・歴史・公民の3分野完全対応の中学受験社会学習アプリ**

## 🌟 機能

### 📚 学習コンテンツ
- **🗾 地理分野** (11問)
  - 47都道府県・県庁所在地
  - 日本の6つの気候区分
  - 農業・水産業・工業
  - 伝統工業・公害問題
  - 各地方の特色

- **📜 歴史分野** (15問)  
  - 17時代区分（旧石器時代～昭和時代）
  - 重要人物・事件・年号
  - 政治制度の変化
  - 文化史

- **🏛️ 公民分野** (20問)
  - 日本国憲法三大原則
  - 三権分立（国会・内閣・裁判所）
  - 基本的人権・新しい人権
  - 地方自治・国際関係

### 🎮 ゲーミフィケーション機能
- **レベルシステム**: 11段階（初心者→達人）
- **バッジシステム**: 12種類の実績バッジ
- **XP・コインシステム**: 学習でポイント獲得
- **ストリーク機能**: 連続学習日数記録
- **詳細統計**: 分野別学習進捗追跡

### 🖥️ ユーザー体験
- **完全レスポンシブデザイン**: スマホ・タブレット・PC対応
- **PWA対応**: アプリとしてインストール可能
- **タイマー機能**: 30秒制限の緊張感ある学習
- **詳細解説**: 各問題に分かりやすい解説付き
- **DuoLingoライクUI**: 直感的で楽しい学習体験

## 🚀 セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール
```bash
# プロジェクトをクローン
git clone https://github.com/username/shakaquest-deploy.git
cd shakaquest-deploy

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### PWAアイコン生成
```bash
# アイコン生成ページにアクセス
open http://localhost:3000/icon-generator.html

# 512x512のアイコンをアップロードして各サイズを生成
# 生成されたファイルをpublic/iconsフォルダに保存
```

## 📁 プロジェクト構造

```
shakaquest-deploy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # メインレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   └── quiz/
│   │       └── page.tsx       # クイズページ
│   ├── components/            # UIコンポーネント
│   └── data/                  # 学習データ
│       ├── geography-enhanced.ts
│       ├── history.ts
│       ├── civics.ts
│       └── index.ts           # 統合データ管理
├── public/                    # 静的ファイル
│   ├── icons/                 # PWAアイコン
│   └── icon-generator.html    # アイコン生成ツール
├── package.json
├── next.config.js            # PWA設定
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 使用方法

### 基本的な学習フロー
1. **ホーム画面**で学習分野を選択（地理・歴史・公民）
2. **カテゴリ選択**で学習したい単元を選択
3. **クイズ開始**で問題に挑戦（5問構成）
4. **結果確認**で正答率・獲得XP・学習時間を確認

### 問題形式
- **4択問題**: 基本的な知識確認
- **穴埋め問題**: 重要用語の暗記確認
- **マッチング問題**: 関連性の理解確認
- **地図選択問題**: 地理的位置の確認

## 🛠️ カスタマイズ

### 新しい問題の追加
```typescript
// src/data/geography-enhanced.ts
export const geographyQuestions: GeographyQuestion[] = [
  {
    id: 12,
    question: "新しい問題文",
    options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    correct: 0,
    explanation: "詳細な解説文",
    category: "prefectures",
    difficulty: "medium",
    type: "multiple-choice"
  }
];
```

### 新しいカテゴリの追加
```typescript
// src/data/index.ts
export const subjects: Subject[] = [
  {
    id: 'geography',
    categories: [
      { id: 'new-category', name: '新カテゴリ', description: '説明', questionCount: 5 }
    ]
  }
];
```

## 🌐 デプロイ

### Vercelでのデプロイ
```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ実行
vercel

# 本番環境にデプロイ
vercel --prod
```

### Netlifyでのデプロイ
```bash
# ビルド
npm run build

# 静的ファイルをNetlifyにアップロード
# または GitHub連携で自動デプロイ
```

## 📱 PWA機能

### インストール手順
**iOS Safari**:
1. ブラウザでアプリを開く
2. 共有ボタンをタップ
3. 「ホーム画面に追加」を選択

**Android Chrome**:
1. ブラウザでアプリを開く
2. メニュー → 「アプリをインストール」

### オフライン機能
- Service Workerによるキャッシュ
- オフライン時でも基本機能利用可能
- 接続回復時に自動同期

## 🏆 バッジシステム

| バッジ | 条件 | レアリティ |
|--------|------|-----------|
| 地理入門 | 地理問題5問正解 | Common |
| 地理博士 | 地理問題20問正解 | Rare |
| 歴史入門 | 歴史問題5問正解 | Common |
| 歴史博士 | 歴史問題20問正解 | Rare |
| 公民入門 | 公民問題5問正解 | Common |
| 公民博士 | 公民問題20問正解 | Rare |
| 完璧主義者 | 10問連続正解 | Epic |
| スピードマスター | 5秒以内で10回正解 | Epic |
| オールラウンダー | 全分野10問ずつ正解 | Legendary |
| 学者 | 総問題数80%正解 | Legendary |

## 🎚️ レベルシステム

| レベル | 名称 | 必要XP | 報酬 |
|--------|------|--------|------|
| 1 | 初心者 | 0-99 | 基本バッジ解放 |
| 2 | 見習い | 100-249 | 新問題形式解放 |
| 3 | 学習者 | 250-499 | ヒント機能解放 |
| 4 | 努力家 | 500-999 | カスタムクイズ作成 |
| 5 | 研究生 | 1000-1999 | 詳細統計表示 |
| 11 | 達人 | 64000+ | 全機能完全解放 |

## 🤝 コントリビューション

1. Forkしてブランチを作成
2. 機能追加・バグ修正
3. テストを実行
4. Pull Requestを作成

## 📄 ライセンス

MIT License

## 🙏 謝辞

- スタディアップ様のコンテンツ構成を参考
- DuoLingoのUI/UX設計を参考
- Next.js・Tailwind CSSコミュニティ

---

**ShakaQuest完全版で中学受験の社会科学習を楽しく効率的に！**
