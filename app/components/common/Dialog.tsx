"use client";

import Button from "./Button";

type DialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Dialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-3 text-slate-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            キャンセル
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  );
}