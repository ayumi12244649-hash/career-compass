type Props = {
  message?: string;
};

export default function Loading({
  message = "読み込み中...",
}: Props) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500 animate-pulse">
        {message}
      </p>
    </div>
  );
}