import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";


function Checkout() {

  console.log(
    "FRONTEND RAZORPAY KEY:",
    import.meta.env.VITE_RAZORPAY_KEY_ID
  );


  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Load cart safely
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) {
      navigate("/cart");
    } else {
      setCart(storedCart);
    }
  }, [navigate]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Price calculations
  const itemsPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 999 ? 0 : 99;
  const totalPrice = itemsPrice + shippingPrice;

  // PLACE ORDER
  const placeOrderHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (!address || !city || !postalCode || !country) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      await API.post(
        "/orders",
        {
          orderItems: cart.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      navigate("/order-success");
    } catch (error) {
      console.error(error);
      alert("Order placement failed");
    }
  };

  console.log(
    "USER INFO:",
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const payWithRazorpay = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const { data: order } = await API.post("/payment/create-order", {
        amount: totalPrice,
      });

      if (!order || !order.id) {
        alert("Order not created. Please try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "StyleCart",
        description: "Order Payment",
        order_id: order.id,

        // ✅ THIS IS WHERE YOU ADD IT
        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          const userInfo = JSON.parse(localStorage.getItem("userInfo"));

          if (!userInfo || !userInfo.token) {
            alert("User not logged in. Please login again.");
            navigate("/login");
            return;
          }

          try {
            await API.post(
              "/orders",
              {
                orderItems: cart.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  image: item.image,
                  price: item.price,
                  product: item._id,
                })),
                shippingAddress: {
                  address,
                  city,
                  postalCode,
                  country,
                },
                totalPrice,
                paymentResult: {
                  id: response.razorpay_payment_id,
                  status: "success",
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`,
                },
              }
            );

            // ✅ CLEAR CART ONLY AFTER SUCCESS
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            clearCart();     // ✅ INSTANT UI UPDATE
            navigate("/order-success");
          } catch (error) {
            console.error("ORDER SAVE FAILED:", error.response?.data || error);
            alert("Payment done, but order saving failed");
          }
        },

        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment init failed:", error);
      alert("Unable to start payment. Please try again.");
    }
  };


  return (

    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-light mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* SHIPPING DETAILS */}
          <div className="md:col-span-2 bg-white p-8 border">
            <h2 className="text-xl font-medium mb-6">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border px-4 py-3 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-8 border h-fit sticky top-24">
            <h2 className="text-xl font-medium mb-6">
              Order Summary
            </h2>

            {/* ITEMS */}
            <div className="space-y-4 text-sm">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between"
                >
                  <span className="text-gray-700">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-6" />

            {/* TOTALS */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span>₹{itemsPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}
                </span>
              </div>

              <div className="flex justify-between font-medium text-base pt-2">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {/* PAY BUTTON */}
            <button
              onClick={payWithRazorpay}
              className="w-full bg-black text-white py-3 mt-8 text-sm tracking-wide hover:opacity-90 transition"
            >
              Pay Securely
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure payment powered by Razorpay
            </p>
          </div>

        </div>
      </div>
    </section>

  );
}

export default Checkout;
