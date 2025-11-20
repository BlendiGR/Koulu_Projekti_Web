import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-beige px-8 py-6 rounded-3xl max-w-[400px] mx-4 text-center">
      <div className="flex justify-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} className="text-green-500 fill-green-500" />
        ))}
      </div>

      <p className="text-gray-700 italic">"{review.text}"</p>

      <p className="font-bold mt-4">{review.author}</p>
      <p className="text-sm text-gray-500">{review.timeAgo}</p>
    </div>
  );
}
