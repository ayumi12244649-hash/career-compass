"use client";

import { useMission } from "@/hooks/useMission";

type Props = {
  companyId: string;
};

export default function DailyMissionCard({
  companyId,
}: Props) {
  const {
    missions,
    completeMission,
  } = useMission(companyId);

  return (
    <div
  id="today-mission"
  className="bg-white rounded-xl shadow p-6 scroll-mt-8"
>
      <h2 className="text-2xl font-bold mb-6">
        🎯 今日の就活ミッション
      </h2>

      {missions.length === 0 ? (
        <p className="text-gray-500">
          AIメンターに相談すると今日のMissionが作成されます。
        </p>
      ) : (
        <div className="space-y-4">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={mission.completed}
                onChange={(e) =>
                  completeMission(
                    mission.id,
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              <p
                className={
                  mission.completed
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {mission.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}