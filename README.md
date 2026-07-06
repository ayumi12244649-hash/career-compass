# 🧭 Career Compass

![Career Compass Logo](./public/logo.png)

> あなたの未来を、AIがナビゲート。

Career Compass は、就職活動を効率的に管理するための AI搭載就活支援アプリです。

応募企業・ES・面接内容を一元管理し、AIによるES添削で就活をサポートします。

---

## ✨ デモ
🌐 https://career-compass-x774.vercel.app

---


## 📸 スクリーンショット

![Career Compass Home](/public/screenshot-home.png)
---

# 🚀 主な機能

✅ ユーザー認証（Supabase Auth）

✅ 企業管理（CRUD）

- 企業登録
- 編集
- 削除
- 応募状況管理

✅ ES（エントリーシート）管理

- 作成
- 編集
- 削除

✅ AI ES添削

- OpenAI APIによるフィードバック
- 添削結果保存

✅ 面接メモ管理

- 面接内容記録
- 振り返り

---

# 🛠 技術スタック

| Category | Technology |
|-----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Database | Supabase |
| Authentication | Supabase Auth |
| AI | OpenAI API |
| Notification | Sonner |
| Deploy | Vercel |

---

# 📂 ディレクトリ構成

```text
app/
 ├─ api/
 ├─ companies/
 ├─ components/
 ├─ dashboard/
 ├─ login/
 ├─ register/

hooks/

services/

types/

lib/

public/
```

---

# 🎯 開発目的

就職活動では

- 応募企業
- ES
- 面接内容

などがバラバラになりがちです。

Career Compass は、それらを一つにまとめ、

「就活の進捗を可視化する」

ことを目的に開発しました。

さらにAIを組み合わせることで、

ES添削や振り返りまで支援します。

---

# 🌱 今後のロードマップ

## Version 1.1

- AI面接フィードバック
- ダッシュボード改善
- 通知機能

## Version 1.2

- 選考スケジュール
- カレンダー連携
- AI企業分析

## Version 2.0

- 就活カルテ
- 成長分析
- AIキャリアアドバイザー

---

# ⚙️ ローカル起動

```bash
git clone https://github.com/あなたのユーザー名/career-compass.git

cd career-compass

npm install

npm run dev
```

---

## 環境変数

`.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

OPENAI_API_KEY=
```

---

# 📄 License

MIT License

---

# 👨‍💻 Developer

**OKITA LAB**

Career Compass Project

AI × 就職活動支援

---

⭐ このプロジェクトが役に立ったら Star をお願いします！
