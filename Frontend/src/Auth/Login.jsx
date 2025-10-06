import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import Loading from "../assets/Loading circles.json";
import ErrorAnim from "../assets/404 not found.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const [errorAnim, setErrorAnim] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // Save user info to localStorage
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("token", data.token);

      setLoading(false);
      setSuccessAnim(true);

      // Show loading animation for 2 seconds before redirect
      setTimeout(() => {
        setSuccessAnim(false);
        navigate("/"); // redirect after animation
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setErrorAnim(true);

      // Show error animation for 2 seconds, then reset
      setTimeout(() => {
        setErrorAnim(false);
        setError("");
        setEmail("");
        setPassword("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        {/* Success Animation */}
        {successAnim && (
          <div className="flex justify-center my-6">
            <Lottie animationData={Loading} loop={true} className="w-32 h-32" />
          </div>
        )}

        {/* Error Animation */}
        {errorAnim && (
          <div className="flex flex-col items-center my-6">
            <Lottie animationData={ErrorAnim} loop={false} className="w-32 h-32" />
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mt-2 text-center w-full">
              {error}
            </div>
          </div>
        )}

        {/* Login Form */}
        {!successAnim && !errorAnim && (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <p className="mt-2 text-center text-gray-400 text-sm">
          <Link to="/forget-password" className="hover:underline">
            Forgot password?
          </Link>
        </p>

        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 w-40 h-40 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;
