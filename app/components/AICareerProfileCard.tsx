"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

export default function AICareerProfileCard({
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

  let type = "";

  if (score >= 90) {
    type = "🚀 即戦力型";
  } else if (score >= 70) {
    type = "📘 堅実成長型";
  } else if (score >= 50) {
    type = "🌱 成長途中型";
  } else {
    type = "🌟 スタート型";
  }

  const companyStar =
    Math.min(Math.ceil(companyCount / 2), 5);

  const esStar =
    Math.min(Math.ceil(esCount / 2), 5);

  const interviewStar =
    Math.min(Math.ceil(interviewCount), 5);

  function stars(n: number) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        🧠 AI就活カルテ
      </h2>

      <div className="space-y-5">

        <div>

          <p className="text-gray-500">
            就活タイプ
          </p>

          <h3 className="text-3xl font-bold text-blue-600">

            {type}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">
            Career Score
          </p>

          <h3 className="text-4xl font-bold">

            {score} 点

          </h3>

        </div>

        <hr />

        <div className="space-y-3">

          <p>
            🏢 企業分析　
            <span className="font-bold">
              {stars(companyStar)}
            </span>
          </p>

          <p>
            📄 ES完成度　
            <span className="font-bold">
              {stars(esStar)}
            </span>
          </p>

          <p>
            🎤 面接経験　
            <span className="font-bold">
              {stars(interviewStar)}
            </span>
          </p>

        </div>

        <hr />

        <div>

          <h3 className="font-bold mb-2">

            AIコメント

          </h3>

          <p className="leading-8 text-gray-700">

            あなたは現在、
            計画的に就活を進めています。

            ES作成は順調ですが、
            面接経験を増やすことで
            Career Scoreはさらに向上します。

          </p>

        </div>

      </div>

    </div>
  );
}