import { Star } from "lucide-react";

const ACCENTS = [
  { ring: "ring-fuchsia-300 dark:ring-fuchsia-700", glow: "hover:shadow-fuchsia-500/20", bar: "from-fuchsia-500 to-pink-500" },
  { ring: "ring-amber-300 dark:ring-amber-700", glow: "hover:shadow-amber-500/20", bar: "from-amber-400 to-orange-500" },
  { ring: "ring-cyan-300 dark:ring-cyan-700", glow: "hover:shadow-cyan-500/20", bar: "from-cyan-400 to-blue-500" },
  { ring: "ring-emerald-300 dark:ring-emerald-700", glow: "hover:shadow-emerald-500/20", bar: "from-emerald-400 to-teal-500" },
  { ring: "ring-violet-300 dark:ring-violet-700", glow: "hover:shadow-violet-500/20", bar: "from-violet-500 to-purple-500" },
];

export default function BookCard({ book, rating, onRate, expanded, onToggleExpand, actions, index = 0 }) {
  const accent = ACCENTS[book.id % ACCENTS.length];

  return (
    <div
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`animate-fade-in-up group bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm ring-1 ${accent.ring} rounded-2xl p-5 hover:shadow-xl ${accent.glow} hover:-translate-y-1.5 transition-all duration-300`}
    >
      <div className={`h-1 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-gradient-to-r ${accent.bar}`} />

      <div className="flex gap-4">

        <img
          src={`https://covers.openlibrary.org/b/title/${book.title}-M.jpg`}
          alt="book cover"
          className="w-16 h-24 object-cover rounded-lg shadow-md"
        />

        <div className="flex-1">

          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {book.title}
          </h3>

          <p className="text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent from-fuchsia-600 to-orange-500 dark:from-fuchsia-400 dark:to-orange-300">
            {book.author}
          </p>

          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                onClick={() => onRate(star)}
                className={`cursor-pointer transition-transform hover:scale-125 ${
                  star <= (rating || 0)
                    ? "text-amber-400 fill-amber-400"
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
            className="text-fuchsia-600 dark:text-fuchsia-400 text-xs mt-1 font-medium hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>

      {actions && <div className="flex gap-2 mt-4 flex-wrap">{actions}</div>}
    </div>
  );
}
