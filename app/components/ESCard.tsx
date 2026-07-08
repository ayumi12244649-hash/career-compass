"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ESForm from "./ESForm";
import AIReview from "./AIReview";
import ESList from "./ESList";
import { checkBadges } from "@/services/badge.service";
import type { EntrySheet } from "@/types/es";
import { afterESSaved }
from "@/services/career-engine.service";
import {
  fetchEntrySheets,
  saveEntrySheet,
  updateEntrySheet,
  deleteEntrySheet,
  saveReviewResult,
} from "@/services/es.service";
import { saveGrowthSnapshot } from "@/services/growth.service";
type Props = {
  companyId: string;
};

export default function ESCard({
  companyId,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [entrySheets, setEntrySheets] =
    useState<EntrySheet[]>([]);

  const [reviewResult, setReviewResult] =
    useState("");

  const [loadingReview, setLoadingReview] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);

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
        await updateEntrySheet(
          editingId,
          title,
          content
        );

        alert("更新しました！");
      } else {
        await saveEntrySheet(
          companyId,
          title,
          content
        );

        toast.success("保存しました。");
      }

      setTitle("");
      setContent("");
      setReviewResult("");

      setEditingId(null);
      setIsEditing(false);

      await afterESSaved(companyId);

      await loadEntrySheets();

       } catch (error) {
  console.error("saveES error:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(String(error));
  }
}
  }
    function startEdit(es: EntrySheet) {
    console.log("startEdit", es);

    setEditingId(es.id);

    setTitle(es.title);
    setContent(es.content);

    setReviewResult(
      es.review_result ?? ""
    );

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeES(id: string) {
    const ok = confirm(
      "このESを削除しますか？"
    );

    if (!ok) return;

    try {
    await deleteEntrySheet(id);

await afterESSaved(companyId);
await loadEntrySheets();
    } catch (error) {
      console.error(error);

      alert("削除できませんでした。");
    }
  }

 async function reviewES() {
  if (!content.trim()) {
    alert("ES内容を入力してください。");
    return;
  }

  setLoadingReview(true);

  try {
    const res = await fetch("/api/ai", {
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
      alert(data.error ?? "添削に失敗しました。");
      return;
    }

    setReviewResult(data.result);

    if (editingId) {
      await saveReviewResult(
        editingId,
        data.result
      );

      await loadEntrySheets();
    }
  } catch (error) {
    console.error(error);
    alert("通信エラー");
  } finally {
    setLoadingReview(false);
  }
}
    return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow">

      <h2 className="text-2xl font-bold text-slate-800">
        📝 エントリーシート
      </h2>

      <ESForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        saveES={saveES}
        isEditing={isEditing}
      />

      <AIReview
        reviewResult={reviewResult}
        loadingReview={loadingReview}
        handleReview={reviewES}
      />

      <ESList
        entrySheets={entrySheets}
        onEdit={startEdit}
        onDelete={removeES}
      />

    </div>
  );
}