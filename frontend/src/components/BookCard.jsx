import { Star } from "lucide-react";

export default function BookCard({ book, rating, onRate, expanded, onToggleExpand, actions }) {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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

          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                onClick={() => onRate(star)}
                className={`cursor-pointer ${
                  star <= (rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>

          <p
            className={`text-sm mt-2 text-gray-600 dark:text-gray-300 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {book.ai_summary || book.notes}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="text-indigo-500 text-xs mt-1 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>

      {actions && <div className="flex gap-2 mt-4 flex-wrap">{actions}</div>}
    </div>
  );
}
