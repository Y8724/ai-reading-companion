import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function LoginForm({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose?.();
    } catch (err) {
      if (mode === "login") {
        setError(
          err.response?.status === 401
            ? "Invalid email or password"
            : "Login failed"
        );
      } else {
        setError(
          err.response?.status === 409
            ? "Email already registered"
            : "Registration failed (password must be at least 8 characters)"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg ring-1 ring-cyan-200 dark:ring-cyan-900 space-y-4 max-w-sm mx-auto"
    >
      <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
        {mode === "login" ? "Log In" : "Sign Up"}
      </h2>

      <input
        type="email"
        className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={mode === "register" ? 8 : undefined}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 transition disabled:opacity-50 disabled:hover:scale-100"
      >
        {submitting
          ? mode === "login" ? "Logging in..." : "Signing up..."
          : mode === "login" ? "Log in" : "Sign up"}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
        }}
        className="text-cyan-600 dark:text-cyan-400 text-sm hover:underline block"
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </form>
  );
}
