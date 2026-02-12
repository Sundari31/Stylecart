import { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (

    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-light mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 border text-center">
            <p className="text-gray-500">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 border flex gap-4 items-center"
                >
                  {/* IMAGE */}
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                    alt={item.name}
                    className="w-24 h-28 object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h4 className="font-medium">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>

                      <span className="text-sm w-6 text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-8 h-8 border flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white p-6 border h-fit sticky top-24">
              <h3 className="text-lg font-medium mb-6">
                Order Summary
              </h3>

              <div className="flex justify-between text-sm mb-3">
                <span>Items</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between text-sm mb-3">
                <span>Shipping</span>
                <span>{totalPrice > 999 ? "Free" : "₹99"}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>
                  ₹{totalPrice > 999 ? totalPrice : totalPrice + 99}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 mt-6 text-sm tracking-wide hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </section>

  );
}

export default Cart;
