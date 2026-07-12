"use client";

type Props = {
  companies: {
    company_name: string;
    status: string;
    industry?: string;
  }[];
};

export default function AIActionPlanCard({
  companies,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl bg-red-500 p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold">
        ✅ AIActionPlanCard 表示成功！
      </h2>

      <p className="mt-3 text-lg">
        企業数：{companies.length}
      </p>

      {companies.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">登録企業</p>

          <ul className="mt-2 list-disc pl-6">
            {companies.map((company, index) => (
              <li key={index}>
                {company.company_name}（{company.status}）
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}