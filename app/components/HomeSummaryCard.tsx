"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
  score: number;
};

export default function HomeSummaryCard({
  companyCount,
  esCount,
  interviewCount,
  score,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="rounded-2xl bg-white shadow-lg p-6">
        <p className="text-slate-500 text-sm">
          🏢 応募企業
        </p>

        <p className="mt-3 text-4xl font-bold text-indigo-600">
          {companyCount}
        </p>

        <p className="mt-1 text-slate-500">
          社
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-lg p-6">
        <p className="text-slate-500 text-sm">
          📝 ES
        </p>

        <p className="mt-3 text-4xl font-bold text-green-600">
          {esCount}
        </p>

        <p className="mt-1 text-slate-500">
          件
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-lg p-6">
        <p className="text-slate-500 text-sm">
          🎤 面接
        </p>

        <p className="mt-3 text-4xl font-bold text-orange-500">
          {interviewCount}
        </p>

        <p className="mt-1 text-slate-500">
          件
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-lg p-6">
        <p className="text-slate-500 text-sm">
          ⭐ AI SCORE
        </p>

        <p className="mt-3 text-4xl font-bold text-yellow-500">
          {score}
        </p>

        <p className="mt-1 text-slate-500">
          /100
        </p>
      </div>

    </div>
  );
}