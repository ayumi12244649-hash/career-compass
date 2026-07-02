"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [companyCount, setCompanyCount] = useState(0);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    fetchCompanyCount();
  }

  async function fetchCompanyCount() {
    const { count, error } = await supabase
      .from("companies")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
      return;
    }

    setCompanyCount(count ?? 0);
  }

  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* サイドバー */}
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-10">
          Career Compass
        </h1>

        <nav className="space-y-4">

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            🏠 ダッシュボード
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            📄 ES添削
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            🎤 AI面接
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            📊 就活分析
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            🏢 応募企業
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            ⭐ お気に入り
          </button>

          <button className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            ⚙️ 設定
          </button>

        </nav>
      </aside>

      {/* メイン */}
      <section className="flex-1 p-10">

        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            おかえりなさい！👋
          </h2>

          <p className="text-slate-500 mt-2">
            今日も就職活動を頑張りましょう！
          </p>
        </div>

        {/* KPIカード */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">
              応募企業
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {companyCount}
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">
              ES添削
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">
              AI面接
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">
              面接予定
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>
          </div>

        </div>

        {/* 下段 */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-2xl font-bold mb-4">
              🤖 今日のAIアドバイス
            </h3>

            <p className="text-slate-600 leading-8">
              今日は応募予定企業のESを見直してみましょう。
              <br /><br />
              「自己PR」を具体的なエピソードで補強すると、
              より説得力が増します。
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-2xl font-bold mb-4">
              📅 最近の活動
            </h3>

            <ul className="space-y-4">

              <li>✅ ES添削を実施</li>

              <li>🎤 AI面接を練習</li>

              <li>🏢 新しい企業を追加</li>

              <li>⭐ お気に入り企業を保存</li>

            </ul>

          </div>

        </div>

      </section>

    </main>
  );
}