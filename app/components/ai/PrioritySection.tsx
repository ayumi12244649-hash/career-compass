"use client";

type Props = {
  task: string;
  priority: "高" | "中" | "低";
  due: string;
};

const priorityColor = {
  高: {
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-500",
    emoji: "🔴",
  },
  中: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    badge: "bg-yellow-500",
    emoji: "🟡",
  },
  低: {
    bg: "bg-green-50",
    text: "text-green-700",
    badge: "bg-green-500",
    emoji: "🟢",
  },
};

export default function PrioritySection({
  task,
  priority,
  due,
}: Props) {
  const style = priorityColor[priority];

  return (
    <section
      className={`mt-8 rounded-3xl border p-6 shadow-lg ${style.bg}`}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Priority
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            🎯 今日の最重要タスク
          </h2>

          <p
            className={`mt-5 text-xl font-bold ${style.text}`}
          >
            {style.emoji} {task}
          </p>

        </div>

        <div
          className={`rounded-full px-4 py-2 text-white ${style.badge}`}
        >
          {priority}
        </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4">
          <div>
            <p className="text-sm text-slate-500">
              期限
            </p>

            <p className="text-lg font-bold text-slate-800">
              {due}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              優先度
            </p>

            <p className={`text-lg font-bold ${style.text}`}>
              {priority}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}