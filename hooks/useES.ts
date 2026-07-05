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
    } catch (error) {
      console.error(error);
    }
  }

  async function saveES() {
    if (!title.trim() || !content.trim()) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    try {
      if (isEditing && editingId) {
        await updateEntrySheet(editingId, title, content);

        alert("更新しました！");
      } else {
        await saveEntrySheet(companyId, title, content);

        alert("保存しました！");
      }

      cancelEdit();

      await loadEntrySheets();
    } catch (error) {
      console.error(error);
      alert("保存に失敗しました。");
    }
  }

  function startEdit(sheet: EntrySheet) {
    setEditingId(sheet.id);

    setTitle(sheet.title);
    setContent(sheet.content);

    setReviewResult(sheet.review_result ?? "");

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setIsEditing(false);

    setTitle("");
    setContent("");
    setReviewResult("");
  }

  async function removeES(id: string) {
    const ok = confirm("このESを削除しますか？");

    if (!ok) return;

    try {
      await deleteEntrySheet(id);

      await loadEntrySheets();
    } catch (error) {
      console.error(error);
      alert("削除できませんでした。");
    }
  }

  async function handleReview() {
    if (!content.trim()) {
      alert("ES内容を入力してください。");
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
    } catch (error) {
      console.error(error);
      alert("AI添削に失敗しました。");
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
    startEdit,
    cancelEdit,
    removeES,
    handleReview,
    loadEntrySheets,
  };
}