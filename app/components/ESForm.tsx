"use client";

type Props = {
  title: string;
  content: string;

  setTitle: (value: string) => void;
  setContent: (value: string) => void;

  saveES: () => void;

  isEditing: boolean;
};

export default function ESForm({
  title,
  content,
  setTitle,
  setContent,
  saveES,
  isEditing,
}: Props) {
  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-3"
      />

      <textarea
        placeholder="ES内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 rounded border p-3 resize-none"
      />

      <button
        onClick={saveES}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        {isEditing ? "更新する" : "保存する"}
      </button>

    </div>
  );
}