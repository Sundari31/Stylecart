import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { addToCart } = useCart();

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      const url = category
        ? `/products?category=${category}`
        : "/products";

      const { data } = await API.get(url);
      setProducts(data);
    };

    fetchProducts();
  }, [category]);

  // LOAD WISHLIST
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(wishlist);
  }, []);

  // TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      wishlist = wishlist.filter((item) => item._id !== product._id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistItems(wishlist);
  };

  const isInWishlist = (id) =>
    wishlistItems.some((item) => item._id === id);

  // SEARCH FILTER
  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  // SORT
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
   <section className="bg-gray-50 min-h-screen">
  <div className="max-w-7xl mx-auto px-6 py-12">

    {/* PAGE HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
      <h1 className="text-3xl font-light capitalize">
        {category ? category : "All Products"}
      </h1>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-full px-5 py-2 text-sm focus:outline-none focus:border-black w-56"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-full px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </div>

    {/* PRODUCTS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            // className="group bg-white p-4 border hover:shadow-lg transition cursor-pointer"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${product.image}`} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* WISHLIST */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow text-lg transition ${
                  isInWishlist(product._id)
                    ? "text-red-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <FiHeart />
              </button>
            </div>

            {/* INFO */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-1 truncate text-left">
                {product.name}
              </h4>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-1 border px-3 py-1 text-xs hover:bg-black hover:text-white transition"
                >
                  <FiShoppingBag />
                  Add
                </button>
              </div>
            </div>

          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      )}

    </div>
  </div>
</section>

  );
}

export default Products;
