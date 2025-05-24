import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const ResumeUpload = () => {
  const [resumes, setResumes] = useState([]);
  const [jobDescription, setJobDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultURL, setResultURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription || resumes.length === 0) {
      alert("Please upload both resumes and a job description.");
      return;
    }

    const formData = new FormData();
    resumes.forEach((file) => formData.append("resumes", file));
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultURL(res.data.redirect);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="hero" className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 md:px-20 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            width={100}
            onClick={() => {
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            alt="img"
          />
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 hover:underline text-sm font-medium transition"
          >
            Solutions
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 hover:underline text-sm font-medium transition"
          >
            Platform
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 hover:underline text-sm font-medium transition"
          >
            Customers
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 hover:underline text-sm font-medium transition"
          >
            Resources
          </a>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition">
            Login
          </button>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 text-sm font-medium transition shadow-md">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-[150px] pb-60 py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden bg-white">
        {/* Glowing Circles */}
        <div className="absolute top-[90px] left-[750px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500 to-indigo-400 opacity-20 filter blur-2xl z-0"></div>
        <div className="absolute top-[90px] left-[900px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 opacity-30 filter blur-3xl z-0"></div>
        <div className="absolute top-[90px] left-[1000px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500 to-pink-400 opacity-20 filter blur-2xl z-0"></div>

        <div className="md:w-3/4 text-center md:text-left z-10">
          <h1 className="text-indigo-800 text-5xl md:text-7xl font-eina font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              AI Powered
            </span>{" "}
            Resume Parser.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 opacity-90 mb-8 max-w-lg mx-auto md:mx-0">
            Revolutionize your hiring process with automated resume parsing and
            ranking.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 z-10">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Upload Your Files
            </h2>
            <div className="mb-5">
              <label className="block font-medium mb-2 text-gray-700">
                Upload Resumes (.pdf/.docx)
              </label>
              <input
                type="file"
                accept=".pdf,.docx"
                multiple
                onChange={(e) => setResumes(Array.from(e.target.files))}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2 text-gray-700">
                Upload Job Description (.pdf/.docx/.txt)
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setJobDescription(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-md transition text-sm shadow-md"
            >
              {loading ? "Processing..." : "Upload"}
            </button>
            {resultURL && (
              <p className="mt-4 text-center text-indigo-700 font-semibold text-sm">
                <a
                  href={`http://localhost:5000${resultURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-900 transition"
                >
                  View Results
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-20 px-6 md:px-20 text-center bg-white">
        <h2 className="text-indigo-800 text-4xl md:text-7xl font-eina font-bold mb-10">
          Transform Your Hiring Process
        </h2>
        <p className="text-2xl text-gray-600 max-w-5xl mx-auto mb-12">
          Automate resume evaluation, reduce bias, and scale your hiring with
          AI-driven precision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:mt-[70px] md:mb-[40px]">
          <div className=" p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
              Automation
            </h3>
            <p className="text-gray-600 text-xl">
              Processes multiple resumes simultaneously, extracting structured
              data like skills, experience, and education with precision.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
              Fairness
            </h3>
            <p className="text-gray-600 text-xl">
              Uses NLP techniques like TF-IDF and cosine similarity to ensure
              unbiased, objective, and consistent candidate ranking.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
              Scalability
            </h3>
            <p className="text-gray-600 text-xl">
              Designed to handle resumes in PDF and DOCX formats, delivering
              structured JSON data and relevance scores for each applicant.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 text-center bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-indigo-800 text-4xl md:text-7xl font-eina font-bold mb-12">
          Why Choose Our Resume Parser?
        </h2>
        <div className="grid grid-cols-1 gap-12 md:mt-[70px] md:mb-[40px]">
          {/* Feature 1: Resume Parsing */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
                Resume Parsing
              </h3>
              <p className="text-gray-600 text-lg">
                <ul className="text-gray-600 text-xl space-y-4 list-disc list-inside">
                  <li>
                    Extracts and organizes key details like skills, experience,
                    and education from resumes with high accuracy.
                  </li>
                  <li>
                    Utilizes NLP techniques to accurately identify entities and
                    structure them into a JSON format.
                  </li>
                  <li>
                    Handles different resume formats (PDF, DOCX) and layouts
                    using a robust parsing pipeline.
                  </li>
                </ul>
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="p-12 bg-indigo-50 rounded-full shadow-md">
                <svg
                  className="w-20 h-20 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Feature 2: Candidate Matching */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
                Candidate Matching
              </h3>
              <p className="text-gray-600 text-xl">
                <ul className="text-gray-600 text-lg space-y-4 list-disc list-inside">
                  <li>
                    Matches candidates to job descriptions by comparing skills,
                    experience, and qualifications effectively.
                  </li>
                  <li>
                    Combines both keyword-based skill matching and semantic
                    similarity for deeper analysis.
                  </li>
                  <li>
                    Ensures fair and intelligent ranking even when terminologies
                    between resumes and job descriptions vary.
                  </li>
                </ul>
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="p-12 bg-indigo-50 rounded-full shadow-md">
                <svg
                  className="w-20 h-20 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Feature 3: Detailed Reports */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-indigo-600 mb-5">
                Detailed Reports
              </h3>
              <p className="text-gray-600 text-xl">
                <ul className="text-gray-600 text-lg space-y-4 list-disc list-inside">
                  <li>
                    Generates comprehensive reports with rankings, highlighting
                    top candidates for easier decision-making.
                  </li>
                  <li>
                    Displays candidate scores and key matched qualifications for
                    quick evaluation.
                  </li>
                  <li>
                    Outputs can be exported in multiple formats (JSON/CSV) and
                    integrated into hiring dashboards.
                  </li>
                </ul>
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="p-12 bg-indigo-50 rounded-full shadow-md">
                <svg
                  className="w-20 h-20 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="pb-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between bg-gray-50">
        <div className="md:w-3/5 text-center md:text-left">
          <h2 className="text-indigo-800 text-3xl md:text-6xl font-eina font-bold mb-8">
            Seamless Integration with Your Workflow
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3/4">
            Supports multiple input formats (PDF, DOCX) and delivers outputs in
            JSON, CSV, and interactive HTML reports for easy integration with
            your HR systems.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {["PDF", "DOCX", "JSON", "CSV", "HTML"].map((format) => (
              <div
                key={format}
                className="bg-indigo-50 p-3 rounded-md shadow-sm hover:bg-indigo-100 transition"
              >
                <span className="text-indigo-700 text-md font-medium">
                  {format}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-2/5 mt-10 md:pb-[100px] md:mt-[100px]">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 md:py-[50px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Sample Output
            </h3>
            <p className="text-xl text-gray-600 md:pb-3">
              Interactive HTML Dashboard
            </p>
            <p className="mt-2 text-lg text-gray-600">
              View ranked candidates with detailed scores and insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
          Ready to Revolutionize Your Hiring?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Upload resumes and job descriptions to see the power of AI-driven
          candidate ranking.
        </p>
        <button
          onClick={() => {
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-gray-100 transition text-sm"
        >
          Get Started
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 px-6 md:px-12 text-center">
        <p className="text-sm font-semibold">
          © 2025 AI Powered Resume Parser. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ResumeUpload;
