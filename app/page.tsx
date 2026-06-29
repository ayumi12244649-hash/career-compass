export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg">
        <h1 className="text-5xl font-bold text-slate-800">
          Career Compass
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          AI Career Coach powered by NOID Core
        </p>

        <div className="mt-8">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl">
            開発を始める
          </button>
        </div>
      </div>
    </main>
  );
}


