"use client";

import { useEffect, useState } from "react";

import type { Company } from "@/types/company";

import {
  fetchCompany,
  updateCompany,
  deleteCompany,
} from "../services/company.service";

export function useCompany(companyId: string) {
  const [company, setCompany] = useState<Company | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    loadCompany();
  }, [companyId]);

  async function loadCompany() {
    try {
      setLoading(true);

      const data = await fetchCompany(companyId);

      setCompany(data);
    } catch (err) {
      console.error(err);
      alert("企業情報の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  async function saveCompany(values: Partial<Company>) {
    if (!company) return;

    try {
      await updateCompany(company.id, values);

      await loadCompany();

      alert("企業情報を更新しました。");
    } catch (err) {
      console.error(err);
      alert("更新に失敗しました。");
    }
  }

  async function removeCompany() {
    if (!company) return;

    if (!confirm("この企業を削除しますか？")) return;

    try {
      await deleteCompany(company.id);

      alert("削除しました。");
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました。");
    }
  }

  return {
    company,
    loading,

    loadCompany,
    saveCompany,
    removeCompany,
  };
}