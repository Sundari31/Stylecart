import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-semibold mb-4">STYLECART</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Modern fashion curated for everyday elegance.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <Link to="/products?category=clothes" className="hover:text-black transition">
                Women
              </Link>
            </li>
            <li>
              <Link to="/products?category=clothes" className="hover:text-black transition">
                Men
              </Link>
            </li>
            <li>
              <Link to="/products?category=accessories" className="hover:text-black transition">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-black transition">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h4 className="font-medium mb-4">Help</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-black cursor-pointer">Shipping</li>
            <li className="hover:text-black cursor-pointer">Returns</li>
            <li className="hover:text-black cursor-pointer">FAQs</li>
            <li>
              <Link to="/contact" className="hover:text-black transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-medium mb-4">Subscribe</h4>
          <p className="text-sm text-gray-600 mb-4">
            Get updates on new arrivals & offers.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-black"
            />
            <button className="bg-black text-white py-2 text-sm hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t text-center text-xs sm:text-sm text-gray-500 py-4 px-4">
        © {new Date().getFullYear()} StyleCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
