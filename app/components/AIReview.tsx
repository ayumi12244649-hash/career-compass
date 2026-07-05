"use client";

type Props = {
  reviewResult: string;
  loadingReview: boolean;
  handleReview: () => void;
};

export default function AIReview({
  reviewResult,
  loadingReview,
  handleReview,
}: Props) {
  return (
    <div className="space-y-4">

      <button
        onClick={handleReview}
        disabled={loadingReview}
        className="rounded-lg bg-emerald-600 px-5 py-2 text-white font-semibold transition hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {loadingReview ? "🤖 AI添削中..." : "🤖 AI添削する"}
      </button>

      <div className="min-h-[140px] rounded-xl border border-slate-200 bg-slate-50 p-4">

        <h3 className="mb-3 text-lg font-bold text-slate-700">
          AI添削結果
        </h3>

        {reviewResult ? (
          <p className="whitespace-pre-wrap leading-7 text-slate-700">
            {reviewResult}
          </p>
        ) : (
          <p className="text-slate-400">
            AI添削結果はここに表示されます。
          </p>
        )}

      </div>

    </div>
  );
}