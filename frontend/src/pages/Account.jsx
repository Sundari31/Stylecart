import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (!stored) {
      navigate("/login");
      return;
    }

    const userInfo = JSON.parse(stored);

    // ✅ userInfo already contains name, email, id
    setUser(userInfo);
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    navigate("/login");
  };

  if (!user) return null;

  return (
   <section className="bg-gray-50 min-h-screen">
  <div className="max-w-5xl mx-auto px-6 py-12">

    {/* PAGE TITLE */}
    <h1 className="text-3xl font-light mb-12 text-center sm:text-left">
      My Account
    </h1>

    {/* DASHBOARD GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      {/* ACCOUNT INFO */}
      <div className="bg-white p-6 border rounded-lg hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
            <FiUser className="text-lg text-gray-700" />
          </div>
          <h3 className="text-lg font-medium">
            Account Info
          </h3>
        </div>

        <p className="text-sm text-gray-800 font-medium text-left">
          {user.name}
        </p>
        <p className="text-sm text-gray-500 text-left">
          {user.email}
        </p>
      </div>

      {/* MY ORDERS */}
      <Link
        to="/orders"
        className="bg-white p-6 border rounded-lg hover:shadow-md transition"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
            <FiPackage className="text-lg text-gray-700" />
          </div>
          <h3 className="text-lg font-medium">
            My Orders
          </h3>
        </div>

        <p className="text-sm text-gray-600 text-left">
          View your order history
        </p>
      </Link>

      {/* WISHLIST */}
      <Link
        to="/wishlist"
        className="bg-white p-6 border rounded-lg hover:shadow-md transition"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
            <FiHeart className="text-lg text-gray-700" />
          </div>
          <h3 className="text-lg font-medium">
            Wishlist
          </h3>
        </div>

        <p className="text-sm text-gray-600 text-left">
          Products you love
        </p>
      </Link>

      {/* LOGOUT */}
      <button
        onClick={logoutHandler}
        className="bg-white p-6 border rounded-lg hover:shadow-md transition text-left"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-full">
            <FiLogOut className="text-lg text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-red-500">
            Logout
          </h3>
        </div>

        <p className="text-sm text-gray-600">
          Sign out of your account
        </p>
      </button>

    </div>
  </div>
</section>

  );
}

export default Account;
