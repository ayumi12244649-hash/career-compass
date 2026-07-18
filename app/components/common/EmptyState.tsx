"use client";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <div className="mb-4 text-5xl">📂</div>

      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 text-slate-500 leading-7">
        {description}
      </p>

      {buttonText && onClick && (
        <button
          onClick={onClick}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}