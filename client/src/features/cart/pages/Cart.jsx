import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useLang } from "/src/hooks/useLang";
import { Link } from "react-router";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";

const Cart = () => {
  const { cartItems, totalItems, clearCart, deleteCartItem } = useCart();
  const { t } = useLang();

  const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) || 10) * item.quantity, 0);
  const totalTax = totalPrice * 0.14;
  const withoutTax = totalPrice - totalTax;

  return (
    <div className="container mx-auto px-4 py-8">
       <h2 className="md:text-5xl text-4xl mb-4 text-center">
          {"Shopping"}{" "}
          <span className="text-red-100">{"Cart"}</span>
        </h2>      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-beige p-8 rounded-3xl border border-brown-100 text-center">
              <p className="text-xl text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <div className="bg-beige p-6 rounded-3xl border border-brown-100 space-y-6">
              {cartItems.map((item, index) => (
                <CartProductSummary key={item.id} item={item} index={index} deleteCartItem={deleteCartItem} cartItems={cartItems} />
              ))}
              
              <div className="pt-4 flex justify-end">
                 <button 
                   onClick={clearCart}
                   className="text-sm text-red-500 hover:text-red-700 underline"
                 >
                   Clear Cart
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary 
            totalItems={totalItems}
            withoutTax={withoutTax}
            totalTax={totalTax}
            totalPrice={totalPrice}
            actionButton={
              <Link 
                to="/orders" 
                className="w-full block bg-red-100 hover:bg-red-200 text-white font-semibold py-4 px-6 rounded-xl shadow-lg active:scale-101"
              >
                Proceed to Checkout
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
