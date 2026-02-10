import { useEffect, useState } from "react";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // Add to cart from wishlist
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <section className="bg-gray-50 min-h-screen">
  <div className="max-w-7xl mx-auto px-6 py-12">

    {/* PAGE TITLE */}
    <h1 className="text-3xl font-light mb-10">
      Wishlist
    </h1>

    {wishlist.length === 0 ? (
      <div className="bg-white border p-12 text-center">
        <p className="text-gray-500">
          Your wishlist is empty.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white border p-4 group hover:shadow transition"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* INFO */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-800 text-left">
                {product.name}
              </h4>

              <p className="text-sm text-gray-500 mt-1 text-left">
                ₹{product.price}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => addToCart(product)}
                className="border px-3 py-1 text-sm flex items-center gap-1 hover:bg-black hover:text-white transition"
              >
                <FiShoppingBag />
                Add
              </button>

              <button
                onClick={() => removeFromWishlist(product._id)}
                className="text-red-500 hover:scale-110 transition"
              >
                <FiTrash2 />
              </button>
            </div>

          </div>
        ))}

      </div>
    )}

  </div>
</section>

  );
}

export default Wishlist;
