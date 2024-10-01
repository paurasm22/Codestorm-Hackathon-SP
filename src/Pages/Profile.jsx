import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const Profile = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
  };
  const navigte = useNavigate();
  const [userData, setUserData] = useState({
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

  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/user/profile",
          {
            headers: {
              "Content-Type": "Application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        setUserData(response.data.user[0]);
        console.log(response.data); // Assume API returns user data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchUserData();
  }, [token]); // Added token to dependency array to refetch if it changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:1000/api/user/profile",
        userData,
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      console.log("Profile updated successfully:", response.data);
      navigte("/dashboard");
      // Optionally handle success notification
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-10 bg-white">
      <form onSubmit={handleUpdate} className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Edit Profile
        </h1>

        {/* Display and Edit Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={userData.age || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Income Range:
          </label>
          <select
            name="income"
            value={userData.income || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
          >
            <option value="">Select Income Range</option>
            <option value="0-2.5L">Less than ₹2.5 Lakh</option>
            <option value="2.5L-5L">₹2.5 Lakh - ₹5 Lakh</option>
            <option value="5L-10L">₹5 Lakh - ₹10 Lakh</option>
            <option value="10L-20L">₹10 Lakh - ₹20 Lakh</option>
            <option value="20L+">Above ₹20 Lakh</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caste:
          </label>
          <select
            name="caste"
            value={userData.caste || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
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
            value={userData.gender || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
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
            value={userData.states || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-3"
          >
            <option value="">Select State</option>
            {statesArray.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Add other fields similar to above: highestEducation, occupation, employmentStatus, disability, marriage */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          type=""
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Profile;
