import ReviewCard from "./ReviewCard";

const HorizontalReviewSlider = ({ reviews = [] }) => {
  const track = [...reviews, ...reviews];

  return (
    <div className="overflow-x-hidden w-full">
      <div className="flex w-max animate-marquee">
        {track.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalReviewSlider;
