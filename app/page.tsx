"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="mb-6 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200">
          🚀 Career Compass Ver.1.0 β
        </span>

        <h1 className="text-6xl font-extrabold tracking-tight text-white md:text-7xl">
          Career Compass
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200">
          AIがあなたの就職活動を伴走する。
          <br />
          ES添削・面接練習・不採用分析・キャリアスコアを
          <br />
          一つのアプリで管理できます。
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">

          <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
            ✨ AI ES添削
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
            🎤 AI面接練習
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
            📊 Career Score
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
            ❌ AI不採用分析
          </div>

        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">

          <button
            onClick={() => router.push("/register")}
            className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            無料ではじめる
          </button>

          <button
            onClick={() => router.push("/login")}
            className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            ログイン
          </button>

        </div>

        <p className="mt-20 text-sm text-slate-400">
          Career Compass β
          <br />
          Powered by OKITA LAB
        </p>

      </section>

    </main>
  );
}