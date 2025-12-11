import { Star, Quote } from "lucide-react";

const ReviewCard = ({ review }) => {
  const rating = review.rating || 5;
  
  return (
    <div className="group relative bg-white px-8 py-8 rounded-2xl max-w-[420px] min-w-[380px] mx-4  transition-all duration-300 border border-gray-300 hover:border-red-100">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 p-3 rounded-full">
            <Quote size={24} className="text-red-100" />
          </div>
        </div>
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={`transition-colors duration-200 ${
                i < rating 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-200 fill-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed text-base mb-6 line-clamp-4">
          "{review.text}"
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-100 to-transparent mx-auto mb-5" />
        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-lg">{review.author}</p>
          <p className="text-sm text-gray-500 font-medium">{review.timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
