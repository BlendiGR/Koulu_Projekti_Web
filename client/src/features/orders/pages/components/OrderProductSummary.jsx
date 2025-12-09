import { Trash2 } from "lucide-react";

const OrderProductSummary = ({ product, quantity }) => {

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shadow-sm"
          />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-xl text-gray-800 text-center md:text-left">{product.name}</h3>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
            <span className="text-md text-gray-600 font-medium">Quantity:</span>
            <span className="font-semibold">{quantity}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
            <span className="text-md text-gray-600 font-medium">Total:</span>
            <span className="font-semibold">{product.cost
              ? `${(product.cost * quantity).toFixed(2)} €`
              : "10.00 €"}</span>
          </div>
        </div>
      </div>
      <hr className="mt-4 border-gray-200" />
    </div>
  );
};
export default OrderProductSummary;
