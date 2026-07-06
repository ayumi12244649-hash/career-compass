"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AICareerProfileCard from "../components/AICareerProfileCard";
import { supabase } from "@/lib/supabase";
import { saveCareerScore } from "@/services/score.service";
import ScoreTrendCard from "../components/ScoreTrendCard";
import Card from "@/app/components/ui/Card";
import StatusChart from "../components/StatusChart";
import CareerScoreCard from "../components/CareerScoreCard";
import AICareerCard from "../components/AICareerCard";
import AIReportHistory from "../components/AIReportHistory";
import ScoreHistoryChart from "../components/ScoreHistoryChart";
import AIReportCard from "../components/AIReportCard";
export default function Dashboard() {
  const router = useRouter();

  const [companyCount, setCompanyCount] =
    useState(0);

  const [esCount, setEsCount] =
    useState(0);

  const [interviewCount, setInterviewCount] =
    useState(0);

  const [offerCount, setOfferCount] =
    useState(0);

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

  await fetchCompanyCount();
  await fetchESCount();
  await fetchInterviewCount();
  await fetchOfferCount();

  const score = Math.min(
    companyCount * 10 +
      esCount * 15 +
      interviewCount * 20,
    100
  );

  await saveCareerScore(score);
}

  async function fetchCompanyCount() {
    const { count, error } = await supabase
      .from("companies")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setCompanyCount(count ?? 0);
  }

  async function fetchESCount() {
    const { count, error } = await supabase
      .from("entry_sheets")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setEsCount(count ?? 0);
  }
    async function fetchInterviewCount() {
    const { count, error } = await supabase
      .from("interviews")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setInterviewCount(count ?? 0);
  }

  async function fetchOfferCount() {
    const { count, error } = await supabase
      .from("companies")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "内定");

    if (error) {
      console.error(error);
      return;
    }

    setOfferCount(count ?? 0);
  }

  return (
    <main className="min-h-screen bg-slate-100 flex">

      {/* サイドバー */}
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl">

        <h1 className="text-2xl font-bold mb-10">
          Career Compass
        </h1>

        <nav className="space-y-4">

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            🏠 ダッシュボード
          </button>

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            📄 ES添削
          </button>

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            🎤 AI面接
          </button>

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            📊 就活分析
          </button>

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            🏢 応募企業
          </button>

          <button className="w-full rounded-xl p-3 text-left hover:bg-slate-800">
            ⚙️ 設定
          </button>

        </nav>

      </aside>

      <section className="flex-1 p-10">

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            おかえりなさい！👋
          </h2>

          <p className="mt-2 text-slate-500">
            今日も就職活動を頑張りましょう！
          </p>

        </div>
                {/* KPIカード */}
        <div className="mb-10 grid grid-cols-4 gap-6">

          <Card>

  <p className="text-slate-500">
    🏢 応募企業
  </p>

  <h3 className="mt-2 text-4xl font-bold text-blue-600">
    {companyCount}
  </h3>

</Card>

        <Card>
            <p className="text-slate-500">
              📄 ES
            </p>

            <h3 className="mt-2 text-4xl font-bold text-emerald-600">
              {esCount}
            </h3>
          </Card>

          <Card>
            <p className="text-slate-500">
              🎤 面接
            </p>

            <h3 className="mt-2 text-4xl font-bold text-amber-500">
              {interviewCount}
            </h3>
          </Card>

          <Card>
            <p className="text-slate-500">
              🎉 内定
            </p>

            <h3 className="mt-2 text-4xl font-bold text-pink-600">
              {offerCount}
            </h3>
         </Card>

        </div>
<StatusChart />

<div className="my-8">

  <CareerScoreCard
    companyCount={companyCount}
    esCount={esCount}
    interviewCount={interviewCount}
  />

</div>

<div className="my-8">

  <ScoreTrendCard
    companyCount={companyCount}
    esCount={esCount}
    interviewCount={interviewCount}
  />

</div>

<div className="my-8">
  <AICareerProfileCard
    companyCount={companyCount}
    esCount={esCount}
    interviewCount={interviewCount}
  />
</div>

<div className="my-8">
  <ScoreHistoryChart />
</div>
<div className="my-8">

  <AIReportCard
    companyCount={companyCount}
    esCount={esCount}
    interviewCount={interviewCount}
    offerCount={offerCount}
  />

</div>

        {/* 下段 */}
        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <h3 className="mb-4 text-2xl font-bold">
              🤖 今日のAIアドバイス
            </h3>

            <p className="leading-8 text-slate-600">
              今日のおすすめは、直近で作成したESをAI添削し、
              自己PRや志望動機をさらに具体的なエピソードで補強することです。
              <br /><br />
              面接予定がある場合は、想定質問を3つほど準備して練習すると、
              本番で落ち着いて回答しやすくなります。
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <h3 className="mb-4 text-2xl font-bold">
              📅 最近の活動
            </h3>

            <ul className="space-y-4">

              <li>✅ ESを保存・更新</li>

              <li>🤖 AI添削を実施</li>

              <li>🏢 応募企業を追加</li>

              <li>🎤 面接メモを登録</li>

            </ul>

          </div>

        </div>
      </section>

</main>
);
}