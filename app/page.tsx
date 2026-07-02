"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-xl text-center">

        <h1 className="text-5xl font-bold text-slate-800">
          Career Compass
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          AIがあなたの就活を分析し、
          <br />
          成長をサポートします。
        </p>

        <div className="mt-8 p-4 bg-green-50 rounded-xl">
          <p className="font-semibold text-green-700">
            就活カルテ × 不採用分析 × 成長グラフ
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">

        <button
  onClick={() => router.push("/register")}
  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold transition"
>
  新規登録
</button>

<button
  onClick={() => router.push("/login")}
  className="bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl text-lg font-semibold transition"
>
  ログイン
</button>

<button
  onClick={() => router.push("/dashboard")}
  className="border border-slate-300 hover:bg-slate-100 py-3 rounded-xl text-lg transition"
>
  ゲストで試す
</button>
        </div>

      </div>
    </main>
  );
}