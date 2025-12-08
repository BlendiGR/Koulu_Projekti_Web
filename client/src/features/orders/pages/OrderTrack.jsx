import { useLang } from "/src/hooks/useLang.js";
import { useOrder } from "/src/hooks/apiHooks.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import OrderStatus from "./components/OrderStatus";
import OrderProductSummary from "/src/features/orders/pages/components/OrderProductSummary";
import Spinner from "/src/components/common/ui/Spinner";

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

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
            {!order ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="md:text-5xl text-3xl font-bold text-center ">Tracking <span className="text-red-100">Order #{orderId}</span></h1>
                    <div className="flex flex-col items-center justify-center w-[80%] p-4 bg-beige rounded-xl shadow-md mt-6">
                        <OrderStatus status={order.status} />
                        <hr className="mt-6 border-brown-100/50  w-[80%]" />
                        <div className="mt-6 ">
                            <p>Estimated delivery time: N/A</p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-6">
                            {order.orderProducts.map(orderProduct => (
                                <OrderProductSummary key={orderProduct.productId} product={orderProduct.product} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

};

export default OrderTrack;