"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Company = {
  id: string;
  company_name: string;
  industry: string;
  status: string;
  applied_date: string | null;
  user_id?: string;
};

type Props = {
  open: boolean;
  company: Company | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function CompanyModal({
  open,
  company,
  onClose,
  onSaved,
}: Props) {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("応募予定");
  const [appliedDate, setAppliedDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (company) {
      setCompanyName(company.company_name);
      setIndustry(company.industry);
      setStatus(company.status);
      setAppliedDate(company.applied_date ?? "");
    } else {
      setCompanyName("");
      setIndustry("");
      setStatus("応募予定");
      setAppliedDate("");
    }
  }, [open, company]);
    async function saveCompany() {
    if (!companyName.trim()) {
      alert("会社名を入力してください。");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("ログインしてください。");
      setSaving(false);
      return;
    }

    let error: { message: string } | null = null;

    if (company) {
      const result = await supabase
        .from("companies")
        .update({
          company_name: companyName,
          industry,
          status,
          applied_date: appliedDate || null,
        })
        .eq("id", company.id)
        .eq("user_id", user.id);

      error = result.error;
    } else {
      const result = await supabase
        .from("companies")
        .insert({
          user_id: user.id,
          company_name: companyName,
          industry,
          status,
          applied_date: appliedDate || null,
        });

      error = result.error;
    }

    setSaving(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    onSaved();
    onClose();
  }
    if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          {company ? "企業編集" : "企業追加"}
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block font-medium mb-2">
              会社名
            </label>

            <input
              className="w-full border rounded-lg px-3 py-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              業界
            </label>

            <input
              className="w-full border rounded-lg px-3 py-2"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              選考状況
            </label>

            <select
              className="w-full border rounded-lg px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>応募予定</option>
              <option>応募済み</option>
              <option>書類選考</option>
              <option>一次面接</option>
              <option>二次面接</option>
              <option>最終面接</option>
              <option>内定</option>
              <option>不採用</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              応募日
            </label>

            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

        </div>
                <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            キャンセル
          </button>

          <button
            onClick={saveCompany}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>

      </div>
    </div>
  );
}