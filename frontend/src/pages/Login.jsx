import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (

    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-10 border">

        {/* TITLE */}
        <h1 className="text-2xl font-light mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Please login to your account
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-5">

          <div>
            <label className="block text-xs text-gray-500 mb-1 text-left">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-wide hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-8 text-gray-600">
          New to StyleCart?{" "}
          <Link
            to="/register"
            className="underline hover:text-black"
          >
            Create account
          </Link>
        </p>

      </div>
    </section>

  );
}

export default Login;
