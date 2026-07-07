"use client";

import { useEffect, useState } from "react";

import type { Mission } from "@/services/mission.service";
import { fetchMissions } from "@/services/mission.service";

export function useDashboard(companyId: string) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    if (!companyId) return;

    setLoading(true);

    try {
      const missionData = await fetchMissions(companyId);
      setMissions(missionData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [companyId]);

  return {
    missions,
    refresh,
    loading,
  };
}