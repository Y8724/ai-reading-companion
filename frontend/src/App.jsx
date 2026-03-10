import Books from "./pages/Books";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto py-6 text-center">
          <h1 className="text-4xl font-bold text-indigo-600">
            AI Reading Companion
          </h1>

          <p className="text-gray-500 mt-2">
            Track books, generate AI summaries, and keep reading notes.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Books />
      </main>

    </div>
  );
}