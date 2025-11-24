import AddToCartButton from "./AddToCartButton";

const ProductCard = ({
  bgColor,
  picture,
  title,
  description,
  itemId,
  price,
  orderAmount = 0,
  rank = 0,
}) => {
  return (
    <div
      className={`bg-${bgColor}
    relative
    p-6 sm:p-8 md:p-5
    rounded-3xl shadow-md
    flex flex-col justify-between
    items-center
    text-center
    min-w-[260px]
    w-full
    max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[400px]
    min-h-[500px]
    lg:min-h-[600px]
  `}
    >
      {/* Tämä on se punainen oikeassa yläkulmassa */}
      {rank > 0 && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
          #{rank}
        </div>
      )}

      <img
        src={picture}
        className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] object-contain"
      />

      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full gap-2 mt-4">
        <p className="font-bold text-2xl sm:text-3xl md:text-2xl lg:text-4xl">
          {title}
        </p>
        <p className="text-base sm:text-lg md:text-sm lg:text-lg text-gray-700">
          {description}
        </p>
        <p className="text-2xl sm:text-3xl font-semibold">{price} €</p>
      </div>

      <AddToCartButton itemId={itemId} />
    </div>
  );
};

export default ProductCard;
