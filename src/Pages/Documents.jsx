import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios

// Sample data for scheme types and schemes
const schemeTypes = [
  "Housing",
  "Education",
  "Healthcare",
  "Employment",
  "Agriculture",
];

const allSchemes = [
  "Affordable Housing in Partnership",
  "Affordable Rental Housing Complexes (ARHC) for Urban Migrants/ Poor",
  "Ambedkar Awas Yojana",
  "Atal Mission for Rejuvenation and Urban Transformation (AMRUT)",
  "Atal Tinkering Lab",
  "Ayushman Bharat - Digital Mission",
  "Ayushman Bharat - Health and Wellness Centres",
  "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
  "Beti Bachao Beti Padhao",
  "Bharatmala Pariyojana",
  "Biju Pucca Ghar Yojana (Odisha)",
  "Central Board of Secondary Education (CBSE) Scholarships",
  "Central Sector Scheme of Scholarships for College and University Students",
  "Chhattisgarh Rural Housing Scheme",
  "CM Jan Awas Yojana (Rajasthan)",
  "Community Health Centre Scheme",
  "Credit Linked Subsidy Scheme (CLSS)",
  "DDA Housing Scheme (Delhi)",
  "Dairy Development Schemes",
  "Dairy Entrepreneurship Development Scheme (DEDS)",
  "Deendayal Upadhyaya Housing Scheme (Gujarat)",
  "Deen Dayal Antyodaya Yojana - National Urban Livelihoods Mission (DAY-NULM)",
  "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
  "Digital Agriculture",
  "Digital India Programme",
  "EWS Housing Scheme (Punjab)",
  "Elderly Care Scheme",
  "Farmer Producer Organizations (FPO) Scheme",
  "Farmer Welfare Fund",
  "Fertility Management Scheme",
  "Fisheries and Aquaculture Infrastructure Development Fund (FAIDF)",
  "Free Generic Medicines Scheme",
  "Griha Laxmi Yojana (Tripura)",
  "Gramin Basti Yojana (Maharashtra)",
  "Green Affordable Housing for All",
  "Higher Education Financing Agency (HEFA)",
  "Higher Education Scholarship for Students from Minority Communities",
  "Horticulture Mission for North East and Himalayan States (HMNEH)",
  "Housing for All",
  "Housing for All (Urban)",
  "Integrated Agricultural Development Programme (IADP)",
  "Integrated Crop Management (ICM)",
  "Integrated Disease Surveillance Programme (IDSP)",
  "Integrated Farming System (IFS)",
  "Integrated Pest Management (IPM)",
  "Integrated Rural Development Programme (IRDP)",
  "Integrated Watershed Management Programme (IWMP)",
  "Janani Suraksha Yojana (JSY)",
  "Jawahar Navodaya Vidyalayas (JNVs)",
  "Jawahar Rozgar Yojana (JRY)",
  "Karnataka Health System Development Project",
  "Kisan Credit Card Scheme (KCC)",
  "Kisan Pathshala",
  "Kisan Vikas Patra (KVP)",
  "Kerala Life Mission",
  "Learning Enhancement Program (LEP)",
  "Livelihood Support Scheme",
  "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
  "Mahatma Gandhi Sarbat Sehat Bima Yojana",
  "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) - Skill Training",
  "Mission for Integrated Development of Horticulture (MIDH)",
  "Mini Mission II of National Mission on Agriculture Extension and Technology",
  "Mid-Day Meal Scheme",
  "National Agricultural Cooperative Marketing Federation of India (NAFED)",
  "National Agricultural Innovation Project (NAIP)",
  "National Agriculture Market (e-NAM)",
  "National Agricultural Research System",
  "National Agricultural Statistics",
  "National Cooperative Development Corporation (NCDC) Schemes",
  "National Digital Library of India (NDLI)",
  "National Food Security Mission (NFSM)",
  "National Health Mission (NHM)",
  "National Initiative for School Heads and Teachers Holistic Advancement (NISHTHA)",
  "National Livestock Mission (NLM)",
  "National Mission for Sustainable Agriculture (NMSA)",
  "National Mission on Agricultural Extension and Technology (NMAET)",
  "National Mission on Bamboo Application (NMBA)",
  "National Mission on Oilseeds and Oil Palm (NMOOP)",
  "National Programme for Health Care of the Elderly (NPHCE)",
  "National Programme for Organic Production (NPOP)",
  "National Scholarship Portal (NSP)",
  "National Skill Development Mission",
  "National Urban Livelihoods Mission (NULM)",
  "Paramparagat Krishi Vikas Yojana (PKVY)",
  "PM Employment Generation Programme (PMEGP)",
  "PM Kisan Samman Nidhi (PM-KISAN)",
  "Pradhan Mantri Awas Yojana (Urban)",
  "Pradhan Mantri Awas Yojana – Gramin (PMAY-G)",
  "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
  "Pradhan Mantri Gram Sinchai Yojana",
  "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
  "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
  "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
  "Promotion of Organic Farming Scheme",
  "Rajiv Awas Yojana",
  "Rashtriya Krishi Vikas Yojana (RKVY)",
  "Rashtriya Bal Swasthya Karyakram (RBSK)",
  "Rural Employment Generation Programme (REGP)",
  "Rural Infrastructure Development Fund (RIDF)",
  "Rural Infrastructure Development Scheme",
  "Rural Livelihoods Mission",
  "Rural Self Employment Training Institutes (RSETIs)",
  "Sardar Patel Awas Yojana (Gujarat)",
  "Self Employment Scheme for Youth (SESY)",
  "Self-Employment in Agriculture Scheme",
  "Skill Development in Agriculture",
  "Skill India Mission",
  "Sukanya Samriddhi Yojana",
  "Swarna Jayanti Shahari Rozgar Yojana (SJSRY)",
  "Support to Training and Employment Programme for Women (STEP)",
  "Tata Trusts - Educational Initiatives",
  "Telemedicine Services",
  "Ujjwala Yojana",
  "Women in Agriculture Programme",
];

const Documents = () => {
  const [schemeInput, setSchemeInput] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    // Filter schemes based on input
    const filtered = allSchemes.filter((scheme) =>
      scheme.toLowerCase().includes(schemeInput.toLowerCase())
    );
    setFilteredSchemes(filtered);
  }, [schemeInput]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredSchemes.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        setSchemeInput(filteredSchemes[highlightedIndex]);
        setFilteredSchemes([]);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSuggestionClick = (scheme) => {
    setSchemeInput(scheme);
    setFilteredSchemes([]);
    setHighlightedIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post(
        "http://localhost:1000/api/user/gendocs",
        {
          scheme: schemeInput,
        }
      );
      console.log("Response:", response.data); // Log the response data
      setSchemeInput(""); // Clear input after submission
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 className="text-center font-extrabold text-5xl mb-7">
        Document Search
      </h2>

      {/* Scheme Name Input with Autocomplete */}
      <label
        htmlFor="schemeName"
        className="text-center font-extrabold text-2xl "
      >
        Enter Scheme Name:
      </label>
      <div style={{ position: "relative" }}>
        <input
          id="schemeName"
          type="text"
          value={schemeInput}
          onChange={(e) => setSchemeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing to see suggestions..."
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />

        {/* Suggestions dropdown */}
        {filteredSchemes.length > 0 && (
          <ul
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              zIndex: 1,
              maxHeight: "200px",
              overflowY: "auto",
              padding: "0",
              margin: "0",
            }}
          >
            {filteredSchemes.map((scheme, index) => (
              <li
                key={scheme}
                onClick={() => handleSuggestionClick(scheme)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    highlightedIndex === index ? "#f0f0f0" : "white",
                }}
              >
                {scheme}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        className="mt-60 m-auto "
      >
        Generate Required Document
      </button>
    </div>
  );
};

export default Documents;
