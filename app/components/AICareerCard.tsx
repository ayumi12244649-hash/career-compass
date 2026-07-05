"use client";

type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

export default function AICareerCard({
  companyCount,
  esCount,
  interviewCount,
}: Props) {
  let message = "";

  if (companyCount === 0) {
    message =
      "まずは応募企業を登録して就活をスタートしましょう！";
  } else if (esCount < companyCount) {
    message =
      "応募企業に対してESが不足しています。ESを作成すると通過率アップが期待できます。";
  } else if (interviewCount === 0) {
    message =
      "ESは順調です。次は面接対策を始めるタイミングです。";
  } else {
    message =
      "就活は順調です！AI添削と面接練習を繰り返して完成度を高めましょう。";
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
      <h3 className="mb-4 text-2xl font-bold">
        🤖 AIキャリア分析
      </h3>

      <p className="leading-8">
        {message}
      </p>
    </div>
  );
}