"use client";

type Props = {
  score: number;
};

export default function AIScoreCard({
  score,
}: Props) {
  let rank = "D";
  let stars = "★☆☆☆☆";

  if (score >= 90) {
    rank = "S";
    stars = "★★★★★";
  } else if (score >= 80) {
    rank = "A";
    stars = "★★★★☆";
  } else if (score >= 70) {
    rank = "B";
    stars = "★★★☆☆";
  } else if (score >= 60) {
    rank = "C";
    stars = "★★☆☆☆";
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl p-8">

      <h2 className="text-2xl font-bold">
        🧠 AI SCORE
      </h2>

      <div className="mt-6 flex items-end gap-8">

        <div>
          <p className="text-6xl font-bold">
            {score}
          </p>

          <p className="text-lg">
            /100
          </p>
        </div>

        <div className="flex-1">

          <p className="text-3xl font-bold">
            Rank {rank}
          </p>

          <p className="text-xl mt-2">
            {stars}
          </p>

          <div className="mt-6">

            <div className="flex justify-between text-sm mb-2">
              <span>就活準備度</span>
              <span>{score}%</span>
            </div>

            <div className="w-full h-4 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-yellow-300 transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}