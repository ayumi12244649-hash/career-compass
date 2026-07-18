"use client";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({
  message,
  onRetry
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-5">
      <p className="text-red-700 font-semibold">
        エラーが発生しました
      </p>

      <p className="mt-2 text-sm text-red-600">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          再読み込み
        </button>
      )}
    </div>
  );
}