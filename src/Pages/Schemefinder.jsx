import React, { useState } from "react";
import axios from "axios"; // Import Axios
import ReactMarkdown from "react-markdown";

const Schemefinder = () => {
  const [sector, setSector] = useState(""); // State for the selected sector

  // Get token from localStorage or other storage where it is saved
  const token = localStorage.getItem("token"); // Adjust this based on how you're storing the token
  const [scheme, setScheme] = useState();
  const handleSectorChange = (e) => {
    setSector(e.target.value); // Update the selected sector
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/user/genscheme", // Your backend endpoint
        { sector }, // Send sector in the request body
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      console.log("Schemes received from server:", response.data);
      setScheme(response.data.schemes);
      // You can handle the display of schemes here
    } catch (error) {
      console.error(
        "Error fetching schemes:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="container h-screen flex items-center justify-center">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Find Schemes Related To
            <br />
            <span className="text-sm">
              Note : All the schemes generated are based on the parameters
              provided during registeration .{" "}
            </span>
          </h1>
          <div className="flex justify-center mb-6">
            <select
              name="sector"
              id="sector"
              value={sector} // Bind sector value
              onChange={handleSectorChange} // Handle select changes
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
            >
              <option value="">Select Sector</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Employment">Employment</option>
              <option value="Housing">Housing</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="button" // Button type to prevent form submission behavior
              onClick={handleSubmit} // Handle button click
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="laast h-screen p-9 px-20 ">
        <h1 className="text-center font-extrabold text-5xl mb-16  ">
          Generated Schemes
        </h1>
        <div className="container flex items-center align-middle bg-slate-400 p-10">
          <ReactMarkdown className="text-xl">{scheme}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default Schemefinder;
