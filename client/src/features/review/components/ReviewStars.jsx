import { Star } from "lucide-react";
import { useState } from "react";

const ReviewStars = ({ value = 0, onChange, size = 40 }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rating) => {
        if (onChange) {
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating) => {
        setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoverRating || value);
                
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        className="transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none rounded-full p-1"
                        aria-label={`Rate ${star} stars`}
                    >
                        <Star
                            size={size}
                            className={`transition-all duration-200 ${
                                isActive
                                    ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                                    : "fill-none text-gray-300 hover:text-gray-400"
                            }`}
                            strokeWidth={2}
                        />
                    </button>
                );
            })}
            {value > 0 && (
                <span className="ml-2 text-lg font-semibold text-gray-700 animate-fade-in">
                    {value} / 5
                </span>
            )}
        </div>
    );
};

export default ReviewStars;