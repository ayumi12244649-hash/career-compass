"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

export default function AICareerCard({
  companyCount,
  esCount,
  interviewCount,
}: Props) {

  const score = Math.min(
    companyCount * 10 +
    esCount * 15 +
    interviewCount * 20,
    100
  );

  let evaluation = "";
  let strengths: string[] = [];
  let improvements: string[] = [];
  let nextActions: string[] = [];

  // 総合評価
  if (score >= 90) {
    evaluation = "現在の就活は非常に順調です。";
  } else if (score >= 70) {
    evaluation = "順調に進んでいます。あと一歩でさらに良くなります。";
  } else if (score >= 50) {
    evaluation = "基礎はできています。今後の行動が重要です。";
  } else {
    evaluation = "まだ就活データが少ないため、まずは行動量を増やしましょう。";
  }

  // 強み
  if (companyCount >= 5)
    strengths.push("応募企業数が十分です。");

  if (esCount >= 3)
    strengths.push("ES作成が順調です。");

  if (interviewCount >= 1)
    strengths.push("面接経験が積み上がっています。");

  // 改善点
  if (companyCount < 5)
    improvements.push("応募企業数を増やしましょう。");

  if (esCount < companyCount)
    improvements.push("応募企業に対してESが不足しています。");

  if (interviewCount === 0)
    improvements.push("面接練習を始めましょう。");

  // 次にやること
  if (companyCount < 5)
    nextActions.push("応募企業を2〜3社追加する");

  if (esCount < companyCount)
    nextActions.push("ESを作成・添削する");

  if (interviewCount === 0)
    nextActions.push("AI面接練習を行う");

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI就活レポート
      </h2>

      <div className="mb-6">
        <p className="text-lg font-semibold">
          Career Score：{score}点
        </p>
      </div>

      <div className="space-y-6">

        <div>
          <h3 className="font-bold text-lg mb-2">
            📊 総合評価
          </h3>

          <p>{evaluation}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">
            💪 強み
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            {strengths.length === 0 ? (
              <li>これから強みを増やしていきましょう。</li>
            ) : (
              strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">
            📝 改善点
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            {improvements.length === 0 ? (
              <li>特に大きな改善点はありません。</li>
            ) : (
              improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">
            🚀 次にやること
          </h3>

          <ol className="list-decimal ml-6 space-y-1">
            {nextActions.length === 0 ? (
              <li>現在のペースを維持しましょう。</li>
            ) : (
              nextActions.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            )}
          </ol>
        </div>

      </div>

    </div>
  );
}