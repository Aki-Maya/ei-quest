# ShakaQuest - 中学受験社会学習アプリ

DuoLingoライクなゲーミフィケーション要素を持つ、中学受験向け社会学習アプリです。47都道府県と県庁所在地を楽しく効率的に学習できます。

## 🚀 機能

### 📚 学習機能
- **47都道府県と県庁所在地の完全データベース**
- **4種類の問題形式**:
  - 4択問題（都道府県名 → 県庁所在地）
  - 4択問題（県庁所在地 → 都道府県名）
  - ランダム出題システム
  - 地域別学習サポート

### 🎮 ゲーミフィケーション
- **経験値(XP)システム**: 正解するごとにXPを獲得
- **レベルアップ**: XPに応じてレベルが上昇
- **コイン獲得**: 正解数に応じたコイン報酬
- **連続学習ストリーク**: 学習継続の動機付け
- **実績バッジ**: 達成度に応じた各種バッジ

### 📱 PWA対応
- **アプリインストール**: ホーム画面に追加可能
- **オフライン学習**: インターネット接続なしでも利用可能
- **レスポンシブデザイン**: スマホ・タブレット・PC対応

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **PWA**: Custom Service Worker
- **状態管理**: React Hooks + localStorage

## 📦 セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール

1. **プロジェクトのクローン**
   ```bash
   git clone <repository-url>
   cd shakaquest
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   # または
   yarn dev
   ```

4. **ブラウザで確認**
   ```
   http://localhost:3000
   ```

### PWAアイコンの生成（オプション）

PWAアイコンを自動生成するには、プロジェクトディレクトリでHTMLファイルを開いてください:

```bash
open public/icon-generator.html
```

## 🏗 プロジェクト構造

```
shakaquest/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/
│   │   │   └── manifest/    # PWA Manifest API
│   │   ├── quiz/            # クイズページ
│   │   ├── results/         # 結果ページ
│   │   ├── layout.tsx       # レイアウト
│   │   ├── page.tsx         # ホームページ
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # Reactコンポーネント
│   │   └── Layout.tsx       # レイアウトコンポーネント
│   └── data/               # データ定義
│       └── geography.ts     # 都道府県データ
├── public/                 # 静的ファイル
│   ├── sw.js              # Service Worker
│   └── icon-*.png         # PWAアイコン
├── package.json
├── next.config.js         # Next.js設定
├── tailwind.config.js     # Tailwind設定
└── tsconfig.json          # TypeScript設定
```

## 🎯 使用方法

### 基本的な学習フロー

1. **ホーム画面**: 学習統計と進捗確認
2. **クイズ開始**: 10問のランダム問題
3. **問題解答**: 4択から正解を選択
4. **即座のフィードバック**: 正解・不正解の表示
5. **結果確認**: スコア・統計・実績確認

### 問題形式

- **都道府県 → 県庁所在地**: 「北海道」の県庁所在地は？
- **県庁所在地 → 都道府県**: 県庁所在地が「札幌市」の都道府県は？

### データの永続化

学習データは**localStorage**に保存され、ブラウザを閉じても保持されます:

- 総経験値・レベル
- 獲得コイン数
- 完了クイズ数
- 正答率統計
- 最新の結果

## 🔧 カスタマイズ

### 問題数の変更

`src/app/quiz/page.tsx`の`generateQuestions`関数で問題数を調整:

```typescript
const selectedPrefectures = getRandomPrefectures(10); // 10問 → 任意の数
```

### 配色の変更

`tailwind.config.js`でカラーパレットを調整:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color', // メインカラー変更
      }
    }
  }
}
```

### 地域フィルターの追加

`src/data/geography.ts`にある`getPrefecturesByRegion`関数を使用して地域別出題が可能:

```typescript
const tokyoAreaPrefectures = getPrefecturesByRegion("関東");
```

## 🚀 デプロイ

### Vercelでのデプロイ

1. **Vercelアカウント作成**: [vercel.com](https://vercel.com)
2. **GitHubリポジトリ接続**: プロジェクトをGitHubにpush
3. **自動デプロイ**: Vercelが自動でビルド・デプロイ

### その他のプラットフォーム

- **Netlify**: 同様の手順で簡単デプロイ
- **GitHub Pages**: 静的サイトとしてホスティング可能

## 📱 PWA機能

### インストール手順

**iOS Safari**:
1. サイトを開く
2. 共有ボタンをタップ
3. "ホーム画面に追加"を選択

**Android Chrome**:
1. サイトを開く
2. メニューから"アプリをインストール"
3. "インストール"をタップ

### オフライン機能

Service Workerにより以下が可能:
- オフライン時のアプリ起動
- 基本機能の継続利用
- ローカルデータでの学習継続

## 🤝 貢献

プロジェクトへの貢献を歓迎します：

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🎓 中学受験対応

### 重要ポイント
- **県名と県庁所在地が異なる18都道府県**を重点的に学習
- **地域別学習**で効率的な記憶定着
- **反復学習**によるしっかりとした基礎固め

### 学習効果
- 地理の基礎知識習得
- 暗記効率の向上
- 継続学習習慣の形成
- ゲーミフィケーションによる学習動機の維持

---

**開発チーム**: ShakaQuest Team  
**対象**: 中学受験生・地理学習者  
**更新**: 2024年最新版
