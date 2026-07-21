import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function LoginForm({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      onClose?.();
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid email or password"
          : "Login failed"
      );
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
        Admin Login
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
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {submitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
