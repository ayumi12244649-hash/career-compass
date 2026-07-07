"use client";

import { useEffect, useState } from "react";

type Mission = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  missions: Mission[];
};

export default function DailyMissionCard({
  missions,
}: Props) {

  const [aiMissions, setAiMissions] = useState<Mission[]>([]);
  
  useEffect(() => {
  async function loadMissions() {
    try {
      const res = await fetch("/api/ai/mission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: "a55bfa65-a15d-412c-b5ef-40b664903a9c",
        }),
      });

      const data = await res.json();

      if (data.missions) {
        const parsed = JSON.parse(data.missions);

        setAiMissions(
          parsed.map((title: string, index: number) => ({
            id: index + 1,
            title,
            done: false,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadMissions();
}, []);

  return (
    <div className="rounded-xl bg-white shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        🎯 今日の就活ミッション
      </h2>
<div className="space-y-4">

  {(aiMissions.length > 0 ? aiMissions : missions).map(
    (mission) => (

      <div
        key={mission.id}
        className="flex items-center gap-3"
      >

        <input
          type="checkbox"
          checked={mission.done}
          readOnly
          className="w-5 h-5"
        />

        <p
          className={
            mission.done
              ? "line-through text-gray-400"
              : ""
          }
        >
          {mission.title}
        </p>

      </div>

    )
  )}

</div>

    </div>
  );
}