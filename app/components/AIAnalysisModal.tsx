"use client";

type Props = {
  open: boolean;
  analysis: string;
  onClose: () => void;
};

export default function AIAnalysisModal({
  open,
  analysis,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold text-slate-800">
            🤖 AI企業分析
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200"
          >
            ✕
          </button>

        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">

          <div className="whitespace-pre-wrap leading-8 text-slate-700">

            {analysis}

          </div>
                  </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            閉じる
          </button>

        </div>

      </div>

    </div>
  );
}