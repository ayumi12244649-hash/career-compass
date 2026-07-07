"use client";

import { useEffect, useState } from "react";
import type { MentorMessage } from "@/types/mentor";
import {
  fetchMessages,
  saveMessage,
  askMentor,
} from "@/services/mentor.service";

export function useMentor(companyId: string, userId: string) {
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadMessages() {
    const data = await fetchMessages(companyId);
    setMessages(data);
  }

  useEffect(() => {
    if (companyId) {
      loadMessages();
    }
  }, [companyId]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    setLoading(true);

    try {
      // ユーザーのメッセージ保存
  

      // AIへ送信
      const result = await askMentor(companyId, text);

      // AIの返答保存
     

      await loadMessages();
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}