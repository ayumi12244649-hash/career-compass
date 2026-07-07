"use client";

import { useEffect, useState } from "react";
import { fetchMemory } from "@/services/memory.service";

export function useMemory(companyId: string) {
  const [memory, setMemory] = useState<any>(null);

  useEffect(() => {
    if (!companyId) return;

    async function load() {
      const data = await fetchMemory(companyId);
      setMemory(data);
    }

    load();
  }, [companyId]);

  return memory;
}