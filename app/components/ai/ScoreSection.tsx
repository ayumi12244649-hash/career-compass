"use client";

type Props = {
  score: number;
  target?: number;
  diff?: number;
};

export default function ScoreSection({
  score,
  target = 100,
  diff = 0,
}: Props) {
  const progress = Math.min(
    Math.max((score / target) * 100, 0),
    100
  );

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          📊 Career Score
        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
          {score} / {target}
        </span>
      </div>

      <div className="mt-6">
        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
                <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              現在のスコア
            </p>

            <p className="mt-1 text-4xl font-bold text-slate-800">
              {score}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              前回比
            </p>

            <p
              className={`mt-1 text-2xl font-bold ${
                diff >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {diff >= 0 ? "+" : ""}
              {diff}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            次の目標
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-800">
            {target} 点を目指そう！
          </p>
        </div>
      </div>
    </section>
  );
}