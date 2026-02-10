import { Link } from "react-router-dom";
import { FiTruck, FiHeart, FiRefreshCw, FiHeadphones } from "react-icons/fi";
import { useEffect, useState } from "react";
import API from "../services/api";

const slides = [
    {
        image: "/images/hero1.jpg",
        title: "NEW SEASON",
        subtitle: "FASHION COLLECTION",
    },
    {
        image: "/images/hero2.jpg",
        title: "MONSOON",
        subtitle: "STYLE EDIT",
    },
    {
        image: "/images/hero3.jpg",
        title: "MODERN",
        subtitle: "EVERYDAY WEAR",
    },
];

function Home() {

    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(0);

    // Auto slide every 4s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await API.get("/products");
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative h-[85vh] md:h-screen overflow-hidden">

                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
        ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
      `}
                    >
                        {/* BACKGROUND IMAGE */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center"
                        />

                        {/* DARK OVERLAY */}
                        <div className="absolute inset-0 bg-black/45"></div>

                        {/* CONTENT */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-6 text-white">

                                <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 text-gray-200">
                                    YOU’RE LOOKING GORGEOUS
                                </p>

                                <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl 
                         font-normal tracking-wide leading-tight mb-6">
                                    {slide.title} <br />
                                    {slide.subtitle}
                                </h1>

                                <Link
                                    to="/products"
                                    className="inline-block bg-white text-black 
                       px-8 py-3 text-xs md:text-sm 
                       tracking-wide hover:bg-gray-100 transition"
                                >
                                    SHOP NOW
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}

                {/* DOT INDICATORS */}
                <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 
                  flex gap-3 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2.5 h-2.5 rounded-full transition
          ${i === current ? "bg-white scale-110" : "bg-white/50"}
        `}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

            </section>


            {/* SERVICE HIGHLIGHTS */}
            <section className="pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">

                        {/* Shipping */}
                        <div className="flex flex-col items-center text-center">
                            <FiTruck className="text-3xl text-gray-700 mb-3" />
                            <h4 className="text-sm font-medium text-gray-800">
                                Worldwide Shipping
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                Order above $100
                            </p>
                        </div>

                        {/* Money Back */}
                        <div className="flex flex-col items-center text-center">
                            <FiRefreshCw className="text-3xl text-gray-700 mb-3" />
                            <h4 className="text-sm font-medium text-gray-800">
                                Money Back Guarantee
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                30 Days Guarantee
                            </p>
                        </div>

                        {/* Offers */}
                        <div className="flex flex-col items-center text-center">
                            <FiHeart className="text-3xl text-gray-700 mb-3" />
                            <h4 className="text-sm font-medium text-gray-800">
                                Offers & Discounts
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                Easy returns in 7 days
                            </p>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col items-center text-center">
                            <FiHeadphones className="text-3xl text-gray-700 mb-3" />
                            <h4 className="text-sm font-medium text-gray-800">
                                24/7 Support
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                Anytime assistance
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* CATEGORY PROMOTION GRID */}
            <section className="max-w-7xl mx-auto px-6 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px] md:auto-rows-[260px]">

                    {/* LEFT BIG CARD */}
                    <div className="relative md:col-span-2 md:row-span-2 overflow-hidden group">
                        <img
                            src="/images/card1.jpg"
                            alt="Women Collection"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-xs tracking-widest mb-2 uppercase">
                                You’re looking
                            </p>
                            <h3 className="font-heading text-2xl md:text-3xl tracking-wide mb-4">
                                Brand Hooded <br /> For Female
                            </h3>
                            <Link
                                to="/products?category=clothes"
                                className="inline-block text-sm tracking-wide border-b border-white pb-1 hover:opacity-80 transition"
                            >
                                SHOP NOW
                            </Link>
                        </div>
                    </div>

                    {/* TOP RIGHT */}
                    <div className="relative overflow-hidden group">
                        <img
                            src="/images/card2.jpg"
                            alt="Accessories"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/30"></div>

                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-xs tracking-widest mb-1 uppercase">
                                You’re looking
                            </p>
                            <h3 className="font-heading text-xl tracking-wide mb-2">
                                Accessories
                            </h3>
                            <Link
                                to="/products?category=accessories"
                                className="text-sm border-b border-white pb-1 hover:opacity-80 transition"
                            >
                                SHOP NOW
                            </Link>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT */}
                    <div className="relative overflow-hidden group">
                        <img
                            src="/images/card3.jpg"
                            alt="Dresses"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/30"></div>

                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-xs tracking-widest mb-1 uppercase">
                                You’re looking
                            </p>
                            <h3 className="font-heading text-xl tracking-wide mb-2">
                                Dresses
                            </h3>
                            <Link
                                to="/products?category=clothes"
                                className="text-sm border-b border-white pb-1 hover:opacity-80 transition"
                            >
                                SHOP NOW
                            </Link>
                        </div>
                    </div>

                </div>
            </section>


            {/* FEATURED PRODUCTS */}
            <section className="bg-white pt-16">
                <h2 className="text-center font-heading text-3xl tracking-wide mb-12">
                    FEATURED PRODUCTS
                </h2>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product) => (
                        <div
                            key={product._id}
                            className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="overflow-hidden bg-gray-100">
                                <img
                                    src={`http://localhost:5000/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Info */}
                            <div className="mt-4 text-center">
                                <h4 className="text-sm tracking-wide font-medium text-gray-800">
                                    {product.name}
                                </h4>
                                <p className="text-sm text-gray-400 tracking-wide mt-1">
                                    ₹{product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* BEST SALES */}
            <section className="pt-20 pb-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading tracking-wide">
                            BEST SALES
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Limited time offers on our best products
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {products.slice(4, 8).map((product) => (
                            <div
                                key={product._id}
                                className="group bg-white p-4 relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                            >
                                {/* Sale Badge */}
                                <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 tracking-wide">
                                    SALE
                                </span>

                                {/* Image */}
                                <div className="overflow-hidden bg-gray-100">
                                    <img
                                        src={`http://localhost:5000/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>

                                {/* Info */}
                                <div className="mt-4 text-center">
                                    <h4 className="text-sm font-medium text-gray-800">
                                        {product.name}
                                    </h4>

                                    <div className="mt-2 flex justify-center gap-2 items-center">
                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{product.price + 500}
                                        </span>
                                        <span className="text-sm font-medium text-black">
                                            ₹{product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


        </>
    );
}

export default Home;
