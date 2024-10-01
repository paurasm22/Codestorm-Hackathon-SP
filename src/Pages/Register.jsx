import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Array of states
const statesArray = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    caste: "",
    income: "",
    gender: "",
    states: "",
    highestEducation: "",
    occupation: "",
    employmentStatus: "",
    disability: "",
    marriage: "",
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
    console.log("Form Data Submitted:", formData);
    // Handle form submission, e.g., sending data to an API

    const payload = {
      email: formData.email,
      password: formData.password,
      age: formData.age,
      caste: formData.caste,
      income: formData.income,
      gender: formData.gender,
      states: formData.states,
      highedu: formData.highestEducation, // key for education
      occupation: formData.occupation,
      empstatus: formData.employmentStatus,
    };

    try {
      const response = await axios.post(
        "http://localhost:1000/api/user/register",
        payload
      );
      console.log("Registration successful:", response.data);
      navigate("/login");

      // Optionally handle redirection or display success message
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-10 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Register
        </h1>

        {[
          {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
          },
          {
            label: "Age",
            type: "number",
            name: "age",
            placeholder: "Enter your age",
          },

          {
            label: "Income Range",
            type: "select",
            name: "income",
            options: [
              { value: "", label: "Select Income Range" },
              { value: "0-2.5L", label: "Less than ₹2.5 Lakh" },
              { value: "2.5L-5L", label: "₹2.5 Lakh - ₹5 Lakh" },
              { value: "5L-10L", label: "₹5 Lakh - ₹10 Lakh" },
              { value: "10L-20L", label: "₹10 Lakh - ₹20 Lakh" },
              { value: "20L+", label: "Above ₹20 Lakh" },
            ],
          },
        ].map(({ label, type, name, placeholder, options }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}:
            </label>
            {type === "select" ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caste:
          </label>
          <select
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Caste</option>
            <option value="general">General</option>
            <option value="sc">Scheduled Caste (SC)</option>
            <option value="st">Scheduled Tribe (ST)</option>
            <option value="obc">Other Backward Classes (OBC)</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State:
          </label>
          <select
            name="states"
            value={formData.states}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select State</option>
            {statesArray.map((state, index) => (
              <option
                key={index}
                value={state.toLowerCase().replace(/\s+/g, "-")}
              >
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Highest Education:
          </label>
          <select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Education Level</option>
            <option value="no-formal-education">No Formal Education</option>
            <option value="highschool">High School</option>
            <option value="diploma">Diploma</option>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occupation:
          </label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Occupation</option>
            <option value="self-employed">
              Self-Employed / Small Business Owners
            </option>
            <option value="Student">Student</option>
            <option value="government">Government Employees</option>
            <option value="defense-law-enforcement">
              Defense and Law Enforcement
            </option>
            <option value="healthcare">Healthcare Workers</option>
            <option value="artisans-craftsmen">Artisans and Craftsmen</option>
            <option value="unorganized-sector">
              Unorganized Sector Workers
            </option>
            <option value="construction-industrial">
              Construction and Industrial Workers
            </option>
            <option value="it-technology">
              IT and Technology Professionals
            </option>
            <option value="private-sector">Private Sector Employees</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Status:
          </label>
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Employment Status</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Disability:
          </label>
          <select
            name="disability"
            value={formData.disability}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Disability Status</option>
            <option value="no-disability">No Disability</option>
            <option value="hearing-impairment">Hearing Impairment</option>
            <option value="visual-impairment">Visual Impairment</option>
            <option value="mobility-impairment">Mobility Impairment</option>
            <option value="cognitive-impairment">Cognitive Impairment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marital Status:
          </label>
          <select
            name="marriage"
            value={formData.marriage}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
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
          Register
        </button>
        <h2>
          Already have an account ?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login here
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Register;
