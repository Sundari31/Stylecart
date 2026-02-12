import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
  <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
  <div className="w-full max-w-md bg-white p-8 sm:p-10 border shadow-sm">

    {/* HEADER */}
    <h1 className="text-2xl font-light mb-1 text-center">
      Create Account
    </h1>
    <p className="text-sm text-gray-500 mb-8 text-center">
      Join StyleCart and start shopping
    </p>

    {/* ERROR */}
    {error && (
      <p className="text-red-500 text-sm mb-4 text-center">
        {error}
      </p>
    )}

    {/* FORM */}
    <form onSubmit={submitHandler} className="space-y-4">

      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        required
      />

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        required
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-3 text-sm tracking-wide hover:opacity-90 transition"
      >
        CREATE ACCOUNT
      </button>

    </form>

    {/* FOOTER */}
    <p className="text-sm text-center mt-6 text-gray-600">
      Already have an account?{" "}
      <Link
        to="/login"
        className="underline hover:text-black transition"
      >
        Login
      </Link>
    </p>

  </div>
</section>

  );
}

export default Register;
