"use client";

type Props = {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;

  saveES: () => void;
  updateES: () => void;

  isEditing: boolean;

  onReview?: () => void;
  loadingReview?: boolean;
  cancelEdit?: () => void;
};

export default function ESForm({
  title,
  content,
  setTitle,
  setContent,
  saveES,
  updateES,
  isEditing,
  onReview,
  loadingReview = false,
  cancelEdit,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-5">

      <h2 className="text-xl font-bold">
        {isEditing ? "ES編集" : "ES作成"}
      </h2>

      <input
        type="text"
        placeholder="タイトル（例：自己PR・志望動機）"
        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="ESの内容を入力してください"
        className="w-full h-64 rounded-lg border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">

        <button
          onClick={isEditing ? updateES : saveES}
          className={`px-5 py-2 rounded-lg text-white transition ${
            isEditing
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEditing ? "更新する" : "保存する"}
        </button>

        {onReview && (
          <button
            onClick={onReview}
            disabled={loadingReview}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white transition"
          >
            {loadingReview ? "AI添削中..." : "AI添削"}
          </button>
        )}

        {isEditing && cancelEdit && (
          <button
            onClick={cancelEdit}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            キャンセル
          </button>
        )}

      </div>

    </div>
  );
}