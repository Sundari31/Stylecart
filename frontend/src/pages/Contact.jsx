import { useState } from "react";
import API from "../services/api";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await API.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (

    <div className="bg-white min-h-screen">

      {/* HEADER */}
      <div className="bg-gray-50 py-10 text-center px-6">
        <h1 className="text-3xl font-light">Contact Us</h1>
        <p className="text-gray-600 mt-2 text-sm">
          We’d love to hear from you.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* CONTACT INFO */}
        <div>
          <h2 className="text-xl font-medium mb-6">
            Get in Touch
          </h2>

          <div className="space-y-6 text-gray-700 text-sm">
            <div className="flex items-center gap-4">
              <FiMapPin className="text-lg" />
              <span>Chennai, India</span>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone className="text-lg" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-lg" />
              <span>support@stylecart.com</span>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form onSubmit={submitHandler} className="space-y-5">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changeHandler}
            placeholder="Your Name"
            required
            className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={changeHandler}
            placeholder="Your Email"
            required
            className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={changeHandler}
            placeholder="Your Message"
            rows="5"
            required
            className="w-full border px-4 py-3 text-sm focus:outline-none focus:border-black resize-none"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className={`px-8 py-3 text-sm tracking-wide transition
              ${status === "sending"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:opacity-90"
              }`}
          >
            {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
          </button>

          {/* STATUS MESSAGES */}
          {status === "success" && (
            <p className="text-green-600 text-sm">
              Message sent successfully 🙂
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

      </div>
    </div>

  );
}

export default Contact;
