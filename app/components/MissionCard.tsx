"use client";

import { useMemo, useState } from "react";
import { useMission } from "@/hooks/useMission";

type Props = {
  companyId: string;
};

export default function MissionCard({
  companyId,
}: Props) {
  const {
    missions,
    addMission,
    completeMission,
  } = useMission(companyId);

  const [title, setTitle] = useState("");

  const completedCount = useMemo(
    () =>
      missions.filter((m) => m.completed).length,
    [missions]
  );

  const progress =
    missions.length === 0
      ? 0
      : Math.round(
          (completedCount / missions.length) * 100
        );

  return (
   <div
  id="today-mission"
  className="bg-white rounded-xl shadow p-6 scroll-mt-8"
>

      <h2 className="text-2xl font-bold mb-2">
        🎯 Today's Mission
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        今日の達成率 {progress}%
      </p>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="flex gap-2 mb-6">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="今日やることを追加..."
          className="flex-1 border rounded-lg p-2"
        />

        <button
          onClick={async () => {
            if (!title.trim()) return;

            await addMission(title);

            setTitle("");
          }}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          追加
        </button>

      </div>

      <div className="space-y-3">

        {missions.map((mission) => (
          <label
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
            />

            <span
              className={
                mission.completed
                  ? "line-through text-gray-400"
                  : "text-slate-700"
              }
            >
              {mission.title}
            </span>

          </label>
        ))}

      </div>

      <div className="mt-6 border-t pt-4">

        {progress === 100 ? (
          <p className="text-green-600 font-semibold">
            🎉 今日のMission達成！
          </p>
        ) : (
          <p className="text-gray-500">
            ✨ あと{" "}
            {missions.length - completedCount}
            件で今日の目標達成！
          </p>
        )}

      </div>

    </div>
  );
}