"use client";

import { useEffect, useState } from "react";

import type { InterviewNote } from "@/types/interview";

import {
  fetchInterviewNotes,
  saveInterviewNote,
  updateInterviewNote,
  deleteInterviewNote,
} from "@/services/interview.service";

export function useInterview(companyId: string) {
  const [notes, setNotes] = useState<InterviewNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [companyId]);

  async function load() {
    try {
      const data = await fetchInterviewNotes(companyId);
      setNotes(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(
    question: string,
    answer: string,
    memo: string
  ) {
    await saveInterviewNote(
      companyId,
      question,
      answer,
      memo
    );

    await load();
  }

  async function update(
    id: string,
    question: string,
    answer: string,
    memo: string
  ) {
    await updateInterviewNote(
      id,
      question,
      answer,
      memo
    );

    await load();
  }

  async function remove(id: string) {
    await deleteInterviewNote(id);

    await load();
  }

  return {
    notes,
    loading,

    load,

    save,
    update,
    remove,
  };
}