"use client";

import { useEffect, useState } from "react";

import type { EntrySheet } from "@/types/es";

import {
  fetchEntrySheets,
  saveEntrySheet,
  updateEntrySheet,
  deleteEntrySheet,
} from "@/services/es.service";

export function useEntrySheets(companyId: string) {
  const [entrySheets, setEntrySheets] = useState<EntrySheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [companyId]);

  async function load() {
    try {
      const data = await fetchEntrySheets(companyId);
      setEntrySheets(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(title: string, content: string) {
    await saveEntrySheet(companyId, title, content);
    await load();
  }

  async function update(
    id: string,
    title: string,
    content: string
  ) {
    await updateEntrySheet(id, title, content);
    await load();
  }

  async function remove(id: string) {
    await deleteEntrySheet(id);
    await load();
  }

  return {
    entrySheets,
    loading,

    load,

    save,
    update,
    remove,
  };
}