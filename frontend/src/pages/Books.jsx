import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import BookCard from "../components/BookCard";

export default function Books() {
  const { user } = useAuth();
  const isAdmin = !!user?.is_admin;

  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedBook, setExpandedBook] = useState(null);
  const [ratings, setRatings] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    notes: "",
    is_public: false,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookRatings")) || {};
    setRatings(saved);
    if (user) fetchBooks();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("bookRatings", JSON.stringify(ratings));
  }, [ratings]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books/");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load books", err);
    }
  };

  const generateSummary = async (bookId) => {
    try {
      setLoadingSummary(bookId);
      await api.post(`/books/${bookId}/summarize/`);
      fetchBooks();
    } catch (err) {
      console.error("AI summary failed", err);
      alert("AI summary failed");
    } finally {
      setLoadingSummary(null);
    }
  };

  const startEdit = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title || "",
      author: book.author || "",
      notes: book.notes || "",
      is_public: book.is_public || false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/books/${editingId}/`, form);
      } else {
        await api.post("/books/", form);
      }

      setForm({ title: "", author: "", notes: "", is_public: false });
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error("Save failed", err);
      alert("Action failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}/`);
      fetchBooks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
          My Books
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Log in to see and manage your personal reading list.
        </p>
      </div>
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    (book.author || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">

      {/* ADD/EDIT FORM */}
      <div className="mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg ring-1 ring-fuchsia-200 dark:ring-fuchsia-900 space-y-4"
        >
          <h2 className="text-xl font-semibold bg-gradient-to-r from-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
            {editingId ? "Edit Book" : "Add New Book"}
          </h2>

          <input
            className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            placeholder="Author"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
            required
          />

          <textarea
            className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />

          {isAdmin && (
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.is_public}
                onChange={(e) =>
                  setForm({ ...form, is_public: e.target.checked })
                }
              />
              Share to public collection
            </label>
          )}

          <button className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:scale-[1.02] hover:shadow-lg hover:shadow-fuchsia-500/30 transition">
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
          My Books
        </h2>

        <input
          type="text"
          placeholder="Search books..."
          className="border rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

        {filteredBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            rating={ratings[book.id]}
            onRate={(star) =>
              setRatings((prev) => ({
                ...prev,
                [book.id]: prev[book.id] === star ? 0 : star,
              }))
            }
            expanded={expandedBook === book.id}
            onToggleExpand={() =>
              setExpandedBook(expandedBook === book.id ? null : book.id)
            }
            actions={
              <>
                <button
                  onClick={() => startEdit(book)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-md hover:scale-105 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-3 py-1 rounded-md hover:scale-105 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => generateSummary(book.id)}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-3 py-1 rounded-md hover:scale-105 transition"
                >
                  {loadingSummary === book.id ? "..." : "AI Summary"}
                </button>

                {book.is_public && (
                  <span className="text-xs px-2 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-teal-500 text-white self-center">
                    Public
                  </span>
                )}
              </>
            }
          />
        ))}

      </div>
    </div>
  );
}
