"use client";

import { useEffect, useState } from "react";

import ESForm from "./ESForm";
import AIReview from "./AIReview";
import ESList from "./ESList";

import type { EntrySheet } from "@/types/es";

import {
  fetchEntrySheets,
  saveEntrySheet,
  updateEntrySheet,
  deleteEntrySheet,
  saveReviewResult,
} from "@/services/es.service";

type Props = {
  companyId: string;
};

export default function ESCard({ companyId }: Props) {
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
    if (!title || !content) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    try {
      await saveEntrySheet(companyId, title, content);

      alert("保存しました");

      setTitle("");
      setContent("");
      setReviewResult("");

      await loadEntrySheets();
    } catch (error) {
      console.error(error);
      alert("保存に失敗しました。");
    }
  }

  async function updateES() {
    if (!editingId) return;

    try {
      await updateEntrySheet(editingId, title, content);

      alert("更新しました");

      setEditingId(null);
      setIsEditing(false);

      setTitle("");
      setContent("");
      setReviewResult("");

      await loadEntrySheets();
    } catch (error) {
      console.error(error);
      alert("更新に失敗しました。");
    }
  }

  function startEdit(sheet: EntrySheet) {
    setEditingId(sheet.id);
    setIsEditing(true);

    setTitle(sheet.title);
    setContent(sheet.content);

    setReviewResult(sheet.review_result ?? "");
  }

  async function deleteES(id: string) {
    try {
      await deleteEntrySheet(id);
      await loadEntrySheets();
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    }
  }

  async function handleReview() {
    if (!content) {
      alert("ESを入力してください。");
      return;
    }

    setLoadingReview(true);

    try {
      const res = await fetch("/api/ai/es", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          es: content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setReviewResult(data.result);

      if (editingId) {
        await saveReviewResult(editingId, data.result);
        await loadEntrySheets();
      }
    } catch (error) {
      console.error(error);
      alert("AI添削に失敗しました。");
    } finally {
      setLoadingReview(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-8">
      <h2 className="text-2xl font-bold">📝 ES</h2>

      <ESForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        saveES={saveES}
        updateES={updateES}
        isEditing={isEditing}
      />

      <AIReview
        reviewResult={reviewResult}
        loadingReview={loadingReview}
        handleReview={handleReview}
      />

      <div>
        <h3 className="text-xl font-bold mb-4">📄 保存済みES</h3>

        <ESList
          entrySheets={entrySheets}
          onEdit={startEdit}
          onDelete={deleteES}
        />
      </div>
    </div>
  );
}