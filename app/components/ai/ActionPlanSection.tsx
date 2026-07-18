"use client";

type ActionPlan = {
  task: string;
  priority: "高" | "中" | "低";
  due_type: "今日" | "今週" | "今月";
};

type Props = {
  plans: ActionPlan[];
};

const priorityStyle = {
  高: {
    icon: "🔴",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  中: {
    icon: "🟡",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  低: {
    icon: "🟢",
    color: "text-green-600",
    bg: "bg-green-50",
  },
};

export default function ActionPlanSection({
  plans,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📋 AI Action Plan
        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
          {plans.length} Tasks
        </span>

      </div>

      <div className="space-y-4">
              {plans.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
            <p className="text-lg font-semibold">
              AIプランはまだありません
            </p>

            <p className="mt-2 text-slate-500">
              AIがプランを作成するとここに表示されます。
            </p>
          </div>
        ) : (
          plans.map((plan, index) => (
            <div
              key={`${plan.task}-${index}`}
              className={`rounded-2xl border p-5 transition hover:shadow-md ${priorityStyle[plan.priority].bg}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-lg font-bold ${priorityStyle[plan.priority].color}`}
                  >
                    {priorityStyle[plan.priority].icon} {plan.task}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    期限：{plan.due_type}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold shadow">
                  {plan.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}