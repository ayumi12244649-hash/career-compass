"use client";

import { useEffect, useState } from "react";

import {
  fetchMissions,
  createMission,
  toggleMission,
  type Mission,
} from "@/services/mission.service";

export function useMission(companyId: string) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadMissions() {
    if (!companyId) return;

    const data = await fetchMissions(companyId);
    setMissions(data);
  }

  useEffect(() => {
    loadMissions();
  }, [companyId]);

  async function addMission(title: string) {
    if (!title.trim()) return;

    setLoading(true);

    try {
      await createMission(companyId, title);
      await loadMissions();
    } finally {
      setLoading(false);
    }
  }

  async function completeMission(
    id: string,
    completed: boolean
  ) {
    await toggleMission(id, completed);
    await loadMissions();
  }

  return {
    missions,
    loading,
    addMission,
    completeMission,
  };
}