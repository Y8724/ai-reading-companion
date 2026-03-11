import { useState, useEffect } from "react";
import Books from "./pages/Books";
import { Moon, Sun } from "lucide-react";

export default function App() {
      const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900">
      
      <header className="text-center py-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto py-6 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            AI Reading Companion
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
                fixed top-6 right-6
                p-3
                rounded-xl
                bg-gray-800
                text-white
                hover:bg-gray-700
                transition
                shadow-lg
            "
            >
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
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