import { useEffect, useState } from "react";
import axios from "axios";
import { IS_ADMIN, ADMIN_TOKEN } from "../config/admin";
import { Pencil, Trash2, Sparkles, Star } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/books/`;

const authConfig = ADMIN_TOKEN
  ? {
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  : null;

export default function Books() {
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
  });

  // ✅ Load ratings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookRatings")) || {};
    setRatings(saved);
    fetchBooks();
  }, []);

  // ✅ Save ratings
  useEffect(() => {
    localStorage.setItem("bookRatings", JSON.stringify(ratings));
  }, [ratings]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load books", err);
    }
  };

  const generateSummary = async (bookId) => {
    try {
      setLoadingSummary(bookId);
      await axios.post(`${API_URL}${bookId}/summarize/`, {}, authConfig);
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authConfig) {
      alert("Admin token missing");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}${editingId}/`, form, authConfig);
      } else {
        await axios.post(API_URL, form, authConfig);
      }

      setForm({ title: "", author: "", notes: "" });
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error("Save failed", err);
      alert("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!authConfig) {
      alert("Admin token missing");
      return;
    }

    try {
      await axios.delete(`${API_URL}${id}/`, authConfig);
      fetchBooks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">

      {/* ADMIN FORM */}
      {IS_ADMIN && (
        <div className="mb-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {editingId ? "Edit Book" : "Add New Book"}
            </h2>

            <input
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <input
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              placeholder="Author"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              required
            />

            <textarea
              className="w-full border rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          My Books
        </h2>

        <input
          type="text"
          placeholder="Search books..."
          className="border rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex gap-4">

              <img
                src={`https://covers.openlibrary.org/b/title/${book.title}-M.jpg`}
                alt="book cover"
                className="w-16 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">

                <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                  {book.title}
                </h3>

                <p className="text-sm text-indigo-500">
                  {book.author}
                </p>

                {/* ⭐ RATING */}
                <div className="flex gap-1 mt-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      onClick={() =>
                        setRatings((prev) => ({
                          ...prev,
                          [book.id]:
                            prev[book.id] === star ? 0 : star,
                        }))
                      }
                      className={`cursor-pointer ${
                        star <= (ratings[book.id] || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p
                  className={`text-sm mt-2 text-gray-600 dark:text-gray-300 ${
                    expandedBook === book.id
                      ? ""
                      : "line-clamp-3"
                  }`}
                >
                  {book.ai_summary || book.notes}
                </p>

                {/* READ MORE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevents weird bubbling
                    setExpandedBook(
                      expandedBook === book.id ? null : book.id
                    );
                  }}
                  className="text-indigo-500 text-xs mt-1 hover:underline"
                >
                  {expandedBook === book.id ? "Show less" : "Read more"}
                </button>
              </div>
            </div>

            {/* ADMIN */}
            {IS_ADMIN && (
              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => startEdit(book)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>

                <button
                  onClick={() => generateSummary(book.id)}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-md"
                >
                  {loadingSummary === book.id
                    ? "..."
                    : "AI Summary"}
                </button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
