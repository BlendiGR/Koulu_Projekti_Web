import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { X } from "lucide-react";

const OrderSummary = ({
  totalItems,
  totalTax,
  totalPrice,
  actionButton,
}) => {
  const { t } = useLang();
  const { discount, appliedCoupon, removeCoupon } = useCart();
  
  const withoutTax = totalPrice - totalTax;
    
  return (
    <div className="bg-white p-6 rounded-3xl border border-brown-100 shadow-sm sticky top-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {t("orderSummary.title")}
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 font-medium">
          <span>
            {t("orderSummary.totalNoTax")} ({totalItems}{" "}
            {totalItems === 1
              ? t("orderSummary.item")
              : t("orderSummary.items")}
            )
          </span>
          <span>{withoutTax.toFixed(2)} €</span>
        </div>
        
        {appliedCoupon && discount > 0 && (
          <div className="flex justify-between items-center text-green-600 font-semibold">
            <div className="flex items-center gap-2">
              <span>{appliedCoupon.code}</span>
              <button
                onClick={removeCoupon}
                className="p-0.5 hover:bg-green-100 rounded-full transition-colors"
                title="Remove coupon"
              >
                <X size={14} />
              </button>
            </div>
            <span>-{discount.toFixed(2)} %</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600 font-medium">
          <span>{t("orderSummary.totalTax")}</span>
          <span>{totalTax.toFixed(2)} €</span>
        </div>
        <hr className="border-brown-100 my-2" />
        <div className="flex justify-between font-bold text-xl text-gray-800">
          <span>{t("orderSummary.total")}</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
      </div>

      {actionButton}
    </div>
  );
};

export default OrderSummary;
