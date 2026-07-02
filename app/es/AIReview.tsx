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
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          🤖 AI添削
        </h2>

        <button
          onClick={handleReview}
          disabled={loadingReview}
          className="rounded-lg bg-emerald-600 px-5 py-2 text-white font-semibold transition hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {loadingReview ? "添削中..." : "AI添削"}
        </button>
      </div>

      {!reviewResult ? (
        <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-500">
            AI添削を実行すると、ここに結果が表示されます。
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
          <h3 className="mb-4 text-lg font-bold text-emerald-700">
            添削結果
          </h3>

          <div className="whitespace-pre-wrap leading-8 text-slate-700">
            {reviewResult}
          </div>
        </div>
      )}

    </div>
  );
}