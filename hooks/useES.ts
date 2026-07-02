"use client";

import { useEffect, useState } from "react";

import type { EntrySheet } from "@/types/es";

import {
  fetchEntrySheets,
  saveEntrySheet,
  updateEntrySheet,
  deleteEntrySheet,
  saveReviewResult,
} from "@/services/es.service";

import { reviewES } from "@/services/ai.service";

export function useES(companyId: string) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [entrySheets, setEntrySheets] = useState<EntrySheet[]>([]);

  const [reviewResult, setReviewResult] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadEntrySheets();
  }, [companyId]);

  async function loadEntrySheets() {
    try {
      const data = await fetchEntrySheets(companyId);
      setEntrySheets(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveES() {
    if (!title || !content) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    try {
      await saveEntrySheet(companyId, title, content);

      setTitle("");
      setContent("");

      await loadEntrySheets();

      alert("保存しました！");
    } catch (err) {
      console.error(err);
      alert("保存に失敗しました");
    }
  }
function cancelEdit() {
  setEditingId(null);
  setIsEditing(false);

  setTitle("");
  setContent("");
  setReviewResult("");
}
  async function updateES() {
    if (!editingId) return;

    try {
      await updateEntrySheet(editingId, title, content);

      setEditingId(null);
      setIsEditing(false);

      setTitle("");
      setContent("");

      await loadEntrySheets();

      alert("更新しました！");
    } catch (err) {
      console.error(err);
      alert("更新に失敗しました");
    }
  }

  function startEdit(sheet: EntrySheet) {
    setEditingId(sheet.id);

    setTitle(sheet.title);
    setContent(sheet.content);

    setReviewResult(sheet.review_result ?? "");

    setIsEditing(true);
  }

  async function removeES(id: string) {
    if (!confirm("削除しますか？")) return;

    try {
      await deleteEntrySheet(id);

      await loadEntrySheets();
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました");
    }
  }

  async function handleReview() {
    if (!content) {
      alert("ESを入力してください");
      return;
    }

    setLoadingReview(true);

    try {
      const result = await reviewES(content);

      setReviewResult(result);

      if (editingId) {
        await saveReviewResult(editingId, result);

        await loadEntrySheets();
      }
    } catch (err) {
      console.error(err);
      alert("AI添削に失敗しました");
    } finally {
      setLoadingReview(false);
    }
  }

  return {
    title,
    setTitle,

    content,
    setContent,

    entrySheets,

    reviewResult,
    loadingReview,

    isEditing,

    saveES,
cancelEdit,
startEdit,
removeES,
handleReview,
  };
}