type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const colors: Record<string, string> = {
    応募済み: "bg-blue-500",
    書類選考: "bg-yellow-500",
    一次面接: "bg-purple-500",
    二次面接: "bg-orange-500",
    最終面接: "bg-red-500",
    内定: "bg-green-600",
    お祈り: "bg-gray-500",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${
        colors[status] ?? "bg-gray-400"
      }`}
    >
      {status}
    </span>
  );
}