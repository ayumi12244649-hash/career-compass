"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

export default function CareerScoreCard({
  companyCount,
  esCount,
  interviewCount,
}: Props) {

  const score =
    Math.min(
      companyCount * 10 +
      esCount * 15 +
      interviewCount * 20,
      100
    );

  function Gauge({
    title,
    value,
  }: {
    title: string;
    value: number;
  }) {
    return (
      <div className="space-y-2">

        <div className="flex justify-between">

          <span>{title}</span>

          <span className="font-bold">
            {value}%
          </span>

        </div>

        <div className="h-3 rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-indigo-600 transition-all"
            style={{
              width: `${value}%`,
            }}
          />

        </div>

      </div>
    );
  }
    const esScore =
    Math.min(esCount * 20, 100);

  const interviewScore =
    Math.min(interviewCount * 20, 100);

  const researchScore =
    Math.min(companyCount * 20, 100);

  const continuityScore =
    Math.min(
      (companyCount + esCount + interviewCount) * 10,
      100
    );

  return (

    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 p-8 text-white shadow-xl">

      <h2 className="text-3xl font-bold">
        🚀 Career Score
      </h2>

      <p className="mt-2 text-blue-100">
        あなたの現在の就活スコア
      </p>

      <div className="my-8 text-center">

        <p className="text-7xl font-extrabold">
          {score}
        </p>

        <p className="mt-2 text-xl">
          /100
        </p>

      </div>

      <div className="space-y-6">

        <Gauge
          title="ES力"
          value={esScore}
        />

        <Gauge
          title="面接力"
          value={interviewScore}
        />
                <Gauge
          title="企業研究"
          value={researchScore}
        />

        <Gauge
          title="継続力"
          value={continuityScore}
        />

      </div>

    </div>

  );
}