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
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 max-w-sm mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {mode === "login" ? "Log In" : "Sign Up"}
      </h2>

      <input
        type="email"
        className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
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
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
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
        className="text-indigo-500 text-sm hover:underline block"
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </form>
  );
}
