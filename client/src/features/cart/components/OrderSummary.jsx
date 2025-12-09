import { useLang } from "/src/hooks/useLang.js";

const OrderSummary = ({
  totalItems,
  withoutTax,
  totalTax,
  totalPrice,
  actionButton,
}) => {
  const { t } = useLang();
  return (
    <div className="bg-beige p-6 rounded-3xl border border-brown-100 shadow-sm sticky top-4">
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
