import { useState, useEffect } from "react";
import Books from "./pages/Books";
import PublicCollection from "./pages/PublicCollection";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./AuthContext";
import { Moon, Sun } from "lucide-react";

export default function App() {
      const [darkMode, setDarkMode] = useState(false);
      const [showLogin, setShowLogin] = useState(false);
      const { user, loading, logout } = useAuth();

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-fuchsia-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">

      {/* decorative floating gradient blobs */}
      <div className="blob w-96 h-96 -top-20 -left-20 bg-fuchsia-400 dark:bg-fuchsia-700 animate-float" />
      <div className="blob w-96 h-96 top-40 -right-24 bg-amber-300 dark:bg-amber-600 animate-float-delayed" />
      <div className="blob w-80 h-80 bottom-0 left-1/3 bg-cyan-300 dark:bg-cyan-700 animate-float" />

      {/* fixed controls live outside the header so backdrop-blur there can't hijack their containing block */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-20 p-3 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white hover:scale-105 transition shadow-lg shadow-fuchsia-500/30"
        >
        {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
      </button>

      {!loading && (
        <div className="fixed top-6 left-6 z-20">
          {user ? (
            <button
              onClick={logout}
              className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white hover:scale-105 transition shadow-lg shadow-rose-500/30 text-sm"
            >
              Log out ({user.email})
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:scale-105 transition shadow-lg shadow-cyan-500/30 text-sm"
            >
              Log in
            </button>
          )}
        </div>
      )}

      <div className="relative">
        <header className="text-center pt-24 pb-8 sm:py-8 border-b border-white/40 dark:border-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto sm:py-6 text-center">
            <h1 className="gradient-text animate-gradient-x bg-300% text-3xl sm:text-5xl font-extrabold tracking-tight">
              AI Reading Companion
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mt-3">
              Track books, generate AI summaries, and keep reading notes.
            </p>
          </div>
        </header>

        {showLogin && !user && (
          <div className="max-w-6xl mx-auto px-6 mt-6">
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        )}

        <main className="max-w-6xl mx-auto p-6">
          <PublicCollection />
          <Books />
        </main>
      </div>

    </div>
  );
}
