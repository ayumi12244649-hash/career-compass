type Props = {
  companyCount: number;
  esCount: number;
  interviewCount: number;
};

export default function CareerScoreCard({
  companyCount,
  esCount,
  interviewCount,
}: Props) {

  const score =
    companyCount * 10 +
    esCount * 15 +
    interviewCount * 20;

  return (
    <div className="rounded-xl bg-white shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Career Score
      </h2>

      <div className="text-5xl font-bold text-blue-600">
        {score}
      </div>

      <div className="mt-6 space-y-2 text-gray-700">

        <p>🏢 応募企業：{companyCount}社</p>

        <p>📝 ES：{esCount}件</p>

        <p>🎤 面接メモ：{interviewCount}件</p>

      </div>

    </div>
  );
}