"use client";

type Props = {
  esCount: number;
  interviewCount: number;
  missionCount: number;
  mentorCount: number;
};

export default function GrowthSection({
  esCount,
  interviewCount,
  missionCount,
  mentorCount,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold">
        🌱 今週の成長
      </h2>

      <p className="mt-2 text-slate-500">
        あなたの就活の積み重ねです。
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            📝 ES
          </p>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {esCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            🎤 面接
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {interviewCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            🎯 Mission
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-600">
            {missionCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            🤖 Mentor
          </p>
          <p className="mt-2 text-3xl font-bold text-pink-600">
            {mentorCount}
          </p>
        </div>

      </div>

    </section>
  );
}