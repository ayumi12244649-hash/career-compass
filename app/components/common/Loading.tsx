"use client";

type LoadingProps = {
  message?: string;
};

export default function Loading({
  message = "読み込み中..."
}: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

      <p className="mt-4 text-gray-600">
        {message}
      </p>
    </div>
  );
}