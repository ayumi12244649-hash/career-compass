"use client";

type Props = {
  companyName: string;
  score: number;
  message: string;
};

export default function HeroSection({
  companyName,
  score,
  message,
}: Props) {
  const progress = Math.min(Math.max(score, 0), 100);

  return (
    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
            AI TODAY
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            🤖 今日の就活ダッシュボード
          </h1>

          <p className="mt-4 text-lg text-indigo-100">
            {companyName}
          </p>

          <p className="mt-2 text-base leading-7 text-indigo-50">
            {message}
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl bg-white/15 p-6 backdrop-blur">
          <p className="text-sm font-semibold text-indigo-100">
            Career Score
          </p>

          <p className="mt-2 text-5xl font-bold">
            {score}
          </p>

          <p className="text-sm text-indigo-100">
            / 100
          </p>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
            <span>内定までの進捗</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}