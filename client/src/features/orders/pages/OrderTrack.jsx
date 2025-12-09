import { useLang } from "/src/hooks/useLang.js";
import { useOrder } from "/src/hooks/apiHooks.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import OrderStatus from "./components/OrderStatus";
import OrderProductSummary from "/src/features/orders/pages/components/OrderProductSummary";
import ResponsiveTable from "/src/components/common/ui/ResponsiveTable";
import Spinner from "/src/components/common/ui/Spinner";
import Dropdown from "/src/components/common/ui/Dropdown";

const OrderTrack = () => {
  const [order, setOrder] = useState(null);
  const { t } = useLang();
  const { getOrderById } = useOrder();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(orderId);
      setOrder(res.data || res);
    };
    fetchOrder();
  }, []);


  console.log(order);

  const orderDetailsColumns = [
    {
      key: "id",
      translationKey: "orderTrack.orderId",
    },
    {
      key: "destinationAddress",
      translationKey: "orderTrack.destinationAddress",
      alignRight: true,
    },
    {
      key: "createdAt",
      translationKey: "orderTrack.orderDate",
      formatter: (value) => new Date(value).toLocaleDateString("fi-FI"),
    },
    {
      key: "status",
      translationKey: "orderTrack.orderStatus",
    },
    {
      key: "cost",
      translationKey: "orderTrack.orderTotal",
      formatter: (value) => `${value}€`,
      highlight: true,
    },
  ];

  return (
    <>
      {!order ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <h1 className="md:text-5xl text-3xl font-bold text-center ">
            {t("orderTrack.tracking")} <span className="text-red-100">{t("orderTrack.order")} #{orderId}</span>
          </h1>
          <div className="flex flex-col items-center justify-center w-[80%] p-4 bg-beige rounded-xl shadow-md mt-6">
            <OrderStatus status={order.status} />
            <hr className="mt-6 border-brown-100/50  w-[80%]" />
            <div className="mt-6 p-6 border-1 border-brown-100 text-brown-200 rounded-2xl bg-[#FEFCE8]">
              <p>{t("orderTrack.estimatedDelivery")}: <strong>{t("orderTrack.notAvailable")}</strong></p>
            </div>
          </div>
          <div className="flex flex-col md:items-center md:justify-between mt-6 w-[80%]">
            <Dropdown
            title={t("orderTrack.orderProducts")}
            rightLabel={order.orderProducts?.length + ". " + t("orderTrack.product")}
            className="mt-6 w-full"
            children={
              <div className="flex flex-row flex-wrap gap-6 mt-6">
                {order.orderProducts?.map((orderProduct) => (
                  <OrderProductSummary
                    key={orderProduct.productId}
                    product={orderProduct.product}
                    quantity={orderProduct.quantity}
                  />
                ))}
              </div>
            }
          />

          <Dropdown
            title={t("orderTrack.orderDetails")}
            className="mt-6 w-full"
            children={<ResponsiveTable columns={orderDetailsColumns} data={order} />}
          />

          </div>
        </div>
      )}
    </>
  );
};

export default OrderTrack;
