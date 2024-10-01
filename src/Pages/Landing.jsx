import React from "react";
import aipowred from "../assets/aipowred.png";
import documents from "../assets/documents.png";
import easy from "../assets/easy.png";
import eligible from "../assets/eligible.png";
import filter from "../assets/filter.png";
import personal from "../assets/personal.png";
import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">
            Indian Government Schemes Finder
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url("https://source.unsplash.com/1600x900/?india,government")`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            Discover Government Schemes You're Eligible For
          </h1>
          <p className="text-lg text-white mb-8">
            Find the schemes that match your profile in just a few seconds.
          </p>
          <a
            href="#"
            className="bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <main className="container mx-auto px-6 py-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Features of Our Platform
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
          {/* Feature 1: AI-Powered Matching */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={aipowred}
              Replace
              with
              your
              uploaded
              image
              path
              alt="AI Matching"
              className="mx-auto mb-2 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">AI-Powered Matching</h3>
            <p>
              Our AI analyzes your profile and suggests the most suitable
              government schemes for you.
            </p>
          </div>

          {/* Feature 2: Filter by State */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={filter}
              alt="Filter by State"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Filter by State</h3>
            <p>
              Quickly filter schemes based on your state or search for national
              opportunities.
            </p>
          </div>

          {/* Feature 3: Application Portal */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={easy}
              alt="Application Portal"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Easy Application Portal</h3>
            <p>
              Get direct links to official portals and apply easily for the
              schemes you are eligible for.
            </p>
          </div>

          {/* Feature 4: Eligibility Criteria */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={eligible}
              alt="Eligibility Criteria"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Eligibility Information</h3>
            <p>
              View clear eligibility criteria for every scheme to ensure you
              qualify.
            </p>
          </div>

          {/* Feature 5: Document Checklist */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={documents}
              alt="Document Checklist"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Document Checklist</h3>
            <p>
              Access a checklist of required documents for easy and smooth
              application processes.
            </p>
          </div>

          {/* Feature 6: Personalized Suggestions */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img
              src={personal}
              alt="Personalized Suggestions"
              className="mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Personalized Suggestions</h3>
            <p>
              Get tailored scheme suggestions based on your age, gender, state,
              income, and more.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">
            Start Finding Your Eligible Schemes Today
          </h2>
          <p className="text-lg mb-6">
            It's quick, easy, and could open up new opportunities for you!
          </p>
          <Link
            to={"/schemefinder"}
            href="#"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Find Schemes Now
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 Indian Government Schemes Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
