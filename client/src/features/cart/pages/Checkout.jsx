import { useState } from "react";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import Dropdown from "/src/components/common/ui/Dropdown";
import ShippingForm from "/src/features/cart/components/ShippingForm";

const Checkout = () => {
    const { cartItems, deleteCartItem, totalItems, totalPrice, totalTax, withoutTax } = useCart();
    const [isShippingInfoCompleted, setIsShippingInfoCompleted] = useState(true);


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tilaa</h2>
            
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Dropdown
                        title="Cart Summary"
                        badge={`${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
                        rightLabel={`${totalPrice.toFixed(2)} €`}
                        defaultExpanded={false}
                    >
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">
                                Your cart is empty
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item, index) => (
                                    <CartProductSummary
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        deleteCartItem={deleteCartItem}
                                        cartItems={cartItems}
                                    />
                                ))}
                            </div>
                        )}
                    </Dropdown>

                    <Dropdown
                        title="Shipping Details"
                        badge="Required"
                        defaultExpanded={isShippingInfoCompleted}
                    >
                        <ShippingForm
                            onSubmit={() => {}}
                        />
                    </Dropdown>
                </div>

                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8">
                        <OrderSummary
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            totalTax={totalTax}
                            withoutTax={withoutTax}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
