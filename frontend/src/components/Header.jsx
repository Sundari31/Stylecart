import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiMenu,
    FiX,
} from "react-icons/fi";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            setCartCount(count);
        };

        updateCartCount();
        window.addEventListener("storage", updateCartCount);

        return () =>
            window.removeEventListener("storage", updateCartCount);
    }, []);

    return (
        <>
            <header
                className={`bg-white border-b z-50 transition-all ${isSticky ? "fixed top-0 left-0 w-full shadow-sm" : "relative"
                    }`}
            >
                <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center">

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden text-2xl mr-4"
                        onClick={() => setMenuOpen(true)}
                    >
                        <FiMenu />
                    </button>

                    {/* Logo (Left) */}
                    <Link
                        to="/"
                        className="text-2xl font-semibold tracking-wide text-gray-800"
                    >
                        STYLECART
                    </Link>

                    {/* CENTER NAVIGATION */}
                    <nav
                        className="
              hidden md:flex gap-8 text-sm font-medium text-gray-700
              absolute left-1/2 -translate-x-1/2
            "
                    >
                        <Link to="/" className="hover:text-black">Home</Link>
                        <Link to="/products" className="hover:text-black">Shop</Link>
                        <Link to="/products?category=Clothes" className="hover:text-black">
                            Clothes
                        </Link>
                        <Link to="/products?category=Accessories" className="hover:text-black">
                            Accessories
                        </Link>
                        <Link to="/contact" className="hover:text-black">Contact</Link>
                    </nav>

                    {/* Icons (Right) */}
                    <div className="ml-auto flex items-center gap-6 text-xl text-gray-700">
                        <Link to="/account"><FiUser /></Link>
                        <Link to="/wishlist"><FiHeart /></Link>
                        <Link to="/cart" className="relative">
                            <FiShoppingBag />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* BACKDROP */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* MOBILE MENU */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white z-50 p-6
        transform transition-transform duration-500 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-6 text-lg">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/products?category=Clothes" onClick={() => setMenuOpen(false)}>
                        Clothes
                    </Link>
                    <Link to="/products?category=Accessories" onClick={() => setMenuOpen(false)}>
                        Accessories
                    </Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                </nav>
            </div>
        </>
    );
}

export default Header;
