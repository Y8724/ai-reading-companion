import { useEffect, useState } from "react";
import axios from "axios";
import { IS_ADMIN, ADMIN_TOKEN } from "../config/admin";
import { BookOpen, Pencil, Trash2, Sparkles, Star } from "lucide-react";

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

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books
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

  // Start editing
  const startEdit = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title || "",
      author: book.author || "",
      notes: book.notes || "",
    });
  };

  // Create or update
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

  // Delete book
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

  // Search filter
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
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700
                text-gray-800 dark:text-white
                border-gray-300 dark:border-gray-600"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <input
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700
                text-gray-800 dark:text-white
                border-gray-300 dark:border-gray-600"
              placeholder="Author"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              required
            />

            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700
                text-gray-800 dark:text-white
                border-gray-300 dark:border-gray-600"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            <button
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
              type="submit"
            >
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">My Books</h2>

        <input
          type="text"
          placeholder="Search books..."
          className="border rounded-xl px-4 py-2
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-white
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BOOK GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start">

        {filteredBooks.map((book) => (
            <div
            key={book.id}
            onClick={() =>
                setExpandedBook(expandedBook === book.id ? null : book.id)
            }
            className="group bg-white dark:bg-gray-900 
            border border-gray-100 dark:border-gray-800
            rounded-2xl p-6
            hover:shadow-xl hover:-translate-y-1
            transition-all duration-300 cursor-pointer"
            >
            <div className="flex gap-4">

              <img
                src={`https://covers.openlibrary.org/b/title/${book.title}-M.jpg`}
                alt="book cover"
                className="w-16 h-24 object-cover rounded-lg shadow-sm group-hover:scale-105 transition"
                />

              <div>
                <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {book.title}
                </h3>
                </div>

                <p className="text-indigo-500 text-sm">
                  Author: {book.author}
                </p>

                <div className="flex gap-1 mt-3">
                    {[1,2,3,4,5].map((star) => (
                        <Star
                        key={star}
                        size={18}
                        onClick={() => {
                            setRatings((prev) => ({
                            ...prev,
                            [book.id]: prev[book.id] === star ? 0 : star
                            }));
                        }}
                        className={`cursor-pointer ${
                            star <= (ratings[book.id] || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        />
                    ))}
                </div>

                <p
                    className={`text-gray-600 dark:text-gray-300 mt-2 text-sm ${
                        expandedBook === book.id ? "" : "line-clamp-3"
                    }`}
                    >
                    {book.ai_summary ? book.ai_summary : book.notes}
                </p>

                <button onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                className="text-indigo-600 text-sm mt-1 hover:underline"
                >
                {expandedBook === book.id ? "Show less" : "Read more"}
                </button>
              </div>

            </div>

            {IS_ADMIN && (
          <div className="flex gap-3 mt-4">

            <button
                onClick={() => startEdit(book)}
                className="flex items-center gap-1 px-3 py-1 
                bg-gray-100 dark:bg-gray-700
                text-gray-800 dark:text-white
                rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
                <Pencil size={14} />
                Edit
            </button>

            <button
                onClick={() => handleDelete(book.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                <Trash2 size={14} />
                Delete
            </button>

            <button
                onClick={() => {
                    console.log("AI button clicked", book.id);
                    generateSummary(book.id);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                <Sparkles size={14} />
                AI Summary
            </button>

            </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
