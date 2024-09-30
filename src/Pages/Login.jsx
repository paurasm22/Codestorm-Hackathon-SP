import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/user/login",
        formData
      );

      console.log("Response from server:", response.data);

      if (response.data.sucess) {
        // Store the token if needed
        localStorage.setItem("token", response.data.token);
        // Navigate to the dashboard
        navigate("/dashboard");
      } else {
        console.log("Login failed:", response.data.message);
        // Optionally, display error to the user
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-10 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
