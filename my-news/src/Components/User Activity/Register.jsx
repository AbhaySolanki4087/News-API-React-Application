import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validation
      if (!form.name || !form.email || !form.password) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (!data.user) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Register error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-slate-900 to-cyan-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/20 w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-semibold">
            Create your account
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">Register now</h2>
          <p className="text-sm text-slate-500 mt-2">
            Join and enjoy secure access with automatic token logout.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-green-500"
          required
          disabled={loading}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-green-500"
          required
          disabled={loading}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-green-500"
          required
          disabled={loading}
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-green-500"
          required
          disabled={loading}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-2xl hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed transition"
        >
          {loading ? "Registering..." : "Create account"}
        </button>

        <div className="mt-5 text-center text-sm text-slate-500">
          <span>Already registered?</span>{" "}
          <Link to="/login" className="text-sky-600 font-semibold hover:underline">
            Login here
          </Link>
        </div>
        
      </form>
    </div>
  );
}