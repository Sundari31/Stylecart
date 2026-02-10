import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

function OrderSuccess() {
  return (

  <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
  <div className="bg-white p-12 border max-w-md w-full text-center">

    {/* SUCCESS ICON */}
    <FiCheckCircle className="mx-auto text-6xl text-green-600 mb-6" />

    {/* TITLE */}
    <h1 className="text-2xl font-light mb-3">
      Order Placed Successfully
    </h1>

    {/* MESSAGE */}
    <p className="text-sm text-gray-500 mb-10 leading-relaxed">
      Thank you for shopping with StyleCart.
      Your order has been confirmed and is being processed.
    </p>

    {/* ACTIONS */}
    <div className="flex flex-col gap-4">
      <Link
        to="/orders"
        className="bg-black text-white py-3 text-sm tracking-wide hover:opacity-90 transition"
      >
        View My Orders
      </Link>

      <Link
        to="/products"
        className="border py-3 text-sm tracking-wide hover:bg-gray-100 transition"
      >
        Continue Shopping
      </Link>
    </div>

  </div>
</section>


  );
}

export default OrderSuccess;
