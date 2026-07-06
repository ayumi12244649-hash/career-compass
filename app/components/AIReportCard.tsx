"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
  offerCount: number;
};

export default function AIReportCard({
  companyCount,
  esCount,
  interviewCount,
  offerCount,
}: Props) {

  const score = Math.min(
    companyCount * 10 +
    esCount * 15 +
    interviewCount * 20,
    100
  );

  const strengths = [];

  if (companyCount >= 5)
    strengths.push("応募企業数が十分です。");

  if (esCount >= 3)
    strengths.push("ES作成が順調です。");

  if (interviewCount >= 2)
    strengths.push("面接経験が増えています。");

  const weakPoints = [];

  if (companyCount < 5)
    weakPoints.push("応募企業数を増やしましょう。");

  if (esCount < companyCount)
    weakPoints.push("ES作成が不足しています。");

  if (interviewCount === 0)
    weakPoints.push("面接対策を始めましょう。");

  const todo = [];

  if (companyCount < 10)
    todo.push("新規応募2社");

  if (esCount < companyCount)
    todo.push("ES添削");

  if (interviewCount < 3)
    todo.push("面接練習");

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold mb-6">
        🤖 AI就活レポート
      </h2>

      <div className="text-5xl font-bold text-blue-600 mb-6">
        {score}
      </div>

      <div className="space-y-6">

        <div>

          <h3 className="font-bold mb-2">
            💪 強み
          </h3>

          <ul className="list-disc ml-6">

            {strengths.length === 0
              ? <li>まだ分析できません。</li>
              : strengths.map((s,i)=><li key={i}>{s}</li>)}

          </ul>

        </div>

        <div>

          <h3 className="font-bold mb-2">
            ⚠ 改善ポイント
          </h3>

          <ul className="list-disc ml-6">

            {weakPoints.map((s,i)=>
              <li key={i}>{s}</li>
            )}

          </ul>

        </div>

        <div>

          <h3 className="font-bold mb-2">
            🎯 今週やること
          </h3>

          <ol className="list-decimal ml-6">

            {todo.map((s,i)=>
              <li key={i}>{s}</li>
            )}

          </ol>

        </div>

        <div className="rounded-xl bg-blue-50 p-4">

          <h3 className="font-bold mb-2">
            AIコメント
          </h3>

          <p>

            {score>=80
            ? "非常に順調です。このままES添削と面接対策を続けましょう。"
            : score>=60
            ? "順調ですが、応募数をさらに増やすと内定率が上がります。"
            : "まずは応募企業とES作成を増やすことが重要です。"}

          </p>

        </div>

      </div>

    </div>
  );
}