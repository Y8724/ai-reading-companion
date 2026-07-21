import { useEffect, useState } from "react";
import api from "../api";
import BookCard from "../components/BookCard";

export default function PublicCollection() {
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookRatings")) || {};
    setRatings(saved);

    api
      .get("/books/public")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to load public collection", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookRatings", JSON.stringify(ratings));
  }, [ratings]);

  if (books.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
        Public Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {books.map((book, index) => (
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
          />
        ))}
      </div>
    </div>
  );
}
