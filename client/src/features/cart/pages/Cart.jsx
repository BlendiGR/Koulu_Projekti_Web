import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useLang } from "/src/hooks/useLang";
import { Trash2 } from 'lucide-react';
import { Link } from "react-router";

const Cart = () => {
  const { cartItems, totalItems, clearCart, deleteCartItem } = useCart();
  const { t } = useLang();

  const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) || 10) * item.quantity, 0);
  const totalTax = totalPrice * 0.255;
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
                <div key={item.id}>
                  <div className="flex flex-row items-center gap-4 md:gap-6">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shadow-sm" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => deleteCartItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors p-2 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
                           <span className="text-sm text-gray-600">Qty:</span>
                           <span className="font-semibold">{item.quantity}</span>
                        </div>
                        <p className="font-bold text-lg text-gray-800">
                          {item.price ? `${(item.price * item.quantity).toFixed(2)} €` : '10.00 €'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <hr className="mt-6 border-brown-100/50" />
                  )}
                </div>
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
          <div className="bg-beige p-6 rounded-3xl border border-brown-100 sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <hr className="border-brown-100 my-2" />
              <div className="flex justify-between font-bold text-xl text-gray-800">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <Link to="/orders" className="w-full block bg-red-100 hover:bg-red-200 text-white font-semibold py-4 px-6 rounded-xl shadow-lg active:scale-101">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
