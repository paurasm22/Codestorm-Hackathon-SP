import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const DocumentDisplay = () => {
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        setLoading(true);
        const storedScheme = localStorage.getItem("scheme");
        console.log("Stored Scheme:", storedScheme); // Debugging output
        if (storedScheme) {
          setScheme(JSON.parse(storedScheme));
        } else {
          setError("No scheme found in localStorage");
        }
      } catch (error) {
        console.error("Error retrieving the scheme:", error);
        setError("Failed to retrieve the scheme");
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2></h2>
      {scheme ? (
        <div className="laast h-screen p-9 px-20">
          <h1 className="text-center font-extrabold text-5xl mb-16">
            Required Documents
          </h1>
          <div className="container flex items-center align-middle bg-slate-400 p-10">
            <ReactMarkdown className="text-xl">{scheme}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <p>No scheme available. Please select a scheme first.</p>
      )}
    </div>
  );
};

export default DocumentDisplay;
