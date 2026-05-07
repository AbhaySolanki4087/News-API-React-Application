import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

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
      if (!form.email || !form.password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const data = await loginUser(form);

      if (!data.token) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token and user info
      login(data.token, data.user);

      setSuccess("Login successful! Redirecting...");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/20 w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-semibold">
            Welcome back
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">Login to your account</h2>
          <p className="text-sm text-slate-500 mt-2">
            Secure access with JWT and automatic session expiration.
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

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
          disabled={loading}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white py-3 rounded-2xl hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-5 text-center text-sm text-slate-500">
          <span>Need an account?</span>{" "}
          <Link to="/register" className="text-sky-600 font-semibold hover:underline">
            Register now
          </Link>
        </div>
        
      </form>
    </div>
  );
}