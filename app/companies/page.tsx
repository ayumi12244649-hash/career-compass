"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import CompanyModal from "@/app/components/CompanyModal";
import StatusBadge from "./StatusBadge";

type Company = {
  id: string;
  company_name: string;
  industry: string;
  status: string;
  applied_date: string | null;
  user_id: string;
};

export default function CompaniesPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editingCompany, setEditingCompany] =
    useState<Company | null>(null);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserId(user.id);

    await fetchCompanies(user.id);

    setLoading(false);
  }

  async function fetchCompanies(uid: string) {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setCompanies(data ?? []);
  }

  async function handleSaved() {
    setOpenModal(false);
    setEditingCompany(null);

    await fetchCompanies(userId);
  }

  async function deleteCompany(id: string) {
    const ok = confirm("この企業を削除しますか？");

    if (!ok) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      alert("削除できませんでした。");
      console.error(error);
      return;
    }

    await fetchCompanies(user.id);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        読み込み中...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              応募企業一覧
            </h1>

            <p className="text-slate-500 mt-2">
              登録企業数：{companies.length}社
            </p>

          </div>

          <button
            onClick={() => {
              setEditingCompany(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            ＋企業追加
          </button>

        </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {companies.length === 0 ? (

            <div className="col-span-full bg-white rounded-2xl p-10 text-center shadow">

              <p className="text-slate-500 text-lg">
                まだ企業が登録されていません。
              </p>

            </div>

          ) : (

            companies.map((company) => (

              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      🏢 {company.company_name}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {company.industry}
                    </p>

                  </div>

                  <StatusBadge status={company.status} />

                </div>

                <div className="mt-6">

                  <p className="text-sm text-slate-500">
                    応募日
                  </p>

                  <p className="font-semibold">
                    {company.applied_date ?? "-"}
                  </p>

                </div>

                <div className="flex gap-2 mt-8">

                  <Link
                    href={`/companies/${company.id}`}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-center py-2 rounded-lg"
                  >
                    詳細
                  </Link>

                  <button
                    onClick={() => {
                      setEditingCompany(company);
                      setOpenModal(true);
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg"
                  >
                    編集
                  </button>

                  <button
                    onClick={() => deleteCompany(company.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    削除
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      <CompanyModal
        open={openModal}
        company={editingCompany}
        onClose={() => {
          setOpenModal(false);
          setEditingCompany(null);
        }}
        onSaved={handleSaved}
      />

    </main>

  );
}