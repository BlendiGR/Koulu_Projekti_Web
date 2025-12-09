import { Trash2 } from "lucide-react";

const OrderProductSummary = ({ product }) => {
  return (
    <div key={product.id}>
      <div className="flex flex-row items-center gap-4 md:gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shadow-sm"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
              <span className="text-sm text-gray-600">Qty:</span>
              <span className="font-semibold">{product.quantity}</span>
            </div>
            <p className="font-bold text-lg text-gray-800">
              {product.price
                ? `${(product.price * product.quantity).toFixed(2)} €`
                : "10.00 €"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderProductSummary;
