import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../components/ThemeContext";

const ResumeUpload = () => {
  const { theme } = useContext(ThemeContext);
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
    <div
      id="hero"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative pt-[150px] pb-60 py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden transition-colors duration-300 ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        {/* Glowing Circles */}
        <div
          className={`absolute sm:top-[390px] md:top-[90px] sm:left-[30px] md:left-[450px] lg:left-[750px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] rounded-full opacity-20 filter blur-2xl z-0 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-r from-cyan-500 to-indigo-400"
              : "bg-gradient-to-r from-cyan-700 to-indigo-600"
          }`}
        ></div>
        <div
          className={`absolute sm:top-[390px] md:top-[90px] sm:left-[100px] md:left-[600px] lg:left-[900px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] rounded-full opacity-30 filter blur-3xl z-0 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-r from-indigo-600 to-purple-500"
              : "bg-gradient-to-r from-indigo-800 to-purple-700"
          }`}
        ></div>
        <div
          className={`absolute sm:top-[390px] md:top-[90px] sm:left-[150px] md:left-[650px] lg:left-[1000px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] rounded-full opacity-20 filter blur-2xl z-0 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-r from-purple-500 to-pink-400"
              : "bg-gradient-to-r from-purple-700 to-pink-600"
          }`}
        ></div>

        <div className="md:w-3/4 text-center md:text-left z-10">
          <h1
            className={`text-5xl md:text-7xl font-eina font-bold leading-tight mb-6 transition-colors duration-300 ${
              theme === "light" ? "text-indigo-800" : "text-indigo-100"
            }`}
          >
            <span
              className={`bg-clip-text text-transparent transition-colors duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600"
                  : "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
              }`}
            >
              AI Powered
            </span>{" "}
            Resume Parser.
          </h1>
          <p
            className={`text-lg md:text-xl opacity-90 mb-8 max-w-lg mx-auto md:mx-0 transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            Revolutionize your hiring process with automated resume parsing and
            ranking.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 z-10">
          <div
            className={`p-8 rounded-xl shadow-lg w-full max-w-md mx-auto border transition-colors duration-300 ${
              theme === "light"
                ? "bg-white border-gray-100"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Upload Your Files
            </h2>
            <div className="mb-5">
              <label
                className={`block font-medium mb-2 transition-colors duration-300 ${
                  theme === "light" ? "text-gray-700" : "text-gray-200"
                }`}
              >
                Upload Resumes (.pdf/.docx)
              </label>
              <input
                type="file"
                accept=".pdf,.docx"
                multiple
                onChange={(e) => setResumes(Array.from(e.target.files))}
                className={`w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  theme === "light"
                    ? "border-gray-300 text-gray-700 bg-white"
                    : "border-gray-600 text-gray-200 bg-gray-700"
                }`}
              />
            </div>
            <div className="mb-6">
              <label
                className={`block font-medium mb-2 transition-colors duration-300 ${
                  theme === "light" ? "text-gray-700" : "text-gray-200"
                }`}
              >
                Upload Job Description (.pdf/.docx/.txt)
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setJobDescription(e.target.files[0])}
                className={`w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  theme === "light"
                    ? "border-gray-300 text-gray-700 bg-white"
                    : "border-gray-600 text-gray-200 bg-gray-700"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full text-white font-semibold py-3 rounded-md transition shadow-md ${
                theme === "light"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900"
              }`}
            >
              {loading ? "Processing..." : "Upload"}
            </button>
            {resultURL && (
              <p
                className={`mt-4 text-center font-semibold text-sm transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-700" : "text-indigo-400"
                }`}
              >
                <a
                  href={`http://localhost:5000${resultURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline transition-colors duration-300 ${
                    theme === "light"
                      ? "hover:text-indigo-900"
                      : "hover:text-indigo-300"
                  }`}
                >
                  View Results
                </a>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className={`pb-20 px-6 md:px-20 text-center transition-colors duration-300 ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <h2
          className={`text-4xl md:text-7xl font-eina font-bold mb-10 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-100"
          }`}
        >
          Transform Your Hiring Process
        </h2>
        <p
          className={`text-2xl max-w-5xl mx-auto mb-12 transition-colors duration-300 ${
            theme === "light" ? "text-gray-600" : "text-gray-200"
          }`}
        >
          Automate resume evaluation, reduce bias, and scale your hiring with
          AI-driven precision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:mt-[70px] md:mb-[40px]">
          <div
            className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <svg
              className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
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
            <h3
              className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
            >
              Automation
            </h3>
            <p
              className={`text-xl transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              Processes multiple resumes simultaneously, extracting structured
              data like skills, experience, and education with precision.
            </p>
          </div>
          <div
            className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <svg
              className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
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
            <h3
              className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
            >
              Fairness
            </h3>
            <p
              className={`text-xl transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              Uses NLP techniques like TF-IDF and cosine similarity to ensure
              unbiased, objective, and consistent candidate ranking.
            </p>
          </div>
          <div
            className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <svg
              className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
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
            <h3
              className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
            >
              Scalability
            </h3>
            <p
              className={`text-xl transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              Designed to handle resumes in PDF and DOCX formats, delivering
              structured JSON data and relevance scores for each applicant.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-6 md:px-20 text-center transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-b from-white to-gray-50"
            : "bg-gradient-to-b from-gray-900 to-gray-800"
        }`}
      >
        <h2
          className={`text-4xl md:text-7xl font-eina font-bold mb-12 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-100"
          }`}
        >
          Why Choose Our Resume Parser?
        </h2>
        <div className="grid grid-cols-1 gap-12 md:mt-[70px] md:mb-[40px]">
          <div
            className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h3
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Resume Parsing
              </h3>
              <p
                className={`text-lg transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <ul
                  className={`text-xl space-y-4 list-disc list-inside transition-colors duration-300 ${
                    theme === "light" ? "text-gray-600" : "text-gray-200"
                  }`}
                >
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
              <div
                className={`p-12 rounded-full shadow-md transition-colors duration-300 ${
                  theme === "light" ? "bg-indigo-50" : "bg-gray-700"
                }`}
              >
                <svg
                  className={`w-20 h-20 transition-colors duration-300 ${
                    theme === "light" ? "text-indigo-600" : "text-indigo-400"
                  }`}
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

          <div
            className={`flex flex-col md:flex-row-reverse items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h3
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Candidate Matching
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <ul
                  className={`text-lg space-y-4 list-disc list-inside transition-colors duration-300 ${
                    theme === "light" ? "text-gray-600" : "text-gray-200"
                  }`}
                >
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
              <div
                className={`p-12 rounded-full shadow-md transition-colors duration-300 ${
                  theme === "light" ? "bg-indigo-50" : "bg-gray-700"
                }`}
              >
                <svg
                  className={`w-20 h-20 transition-colors duration-300 ${
                    theme === "light" ? "text-indigo-600" : "text-indigo-400"
                  }`}
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

          <div
            className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h3
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Detailed Reports
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <ul
                  className={`text-lg space-y-4 list-disc list-inside transition-colors duration-300 ${
                    theme === "light" ? "text-gray-600" : "text-gray-200"
                  }`}
                >
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
              <div
                className={`p-12 rounded-full shadow-md transition-colors duration-300 ${
                  theme === "light" ? "bg-indigo-50" : "bg-gray-700"
                }`}
              >
                <svg
                  className={`w-20 h-20 transition-colors duration-300 ${
                    theme === "light" ? "text-indigo-600" : "text-indigo-400"
                  }`}
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
      <section
        className={`pb-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between transition-colors duration-300 ${
          theme === "light" ? "bg-gray-50" : "bg-gray-900"
        }`}
      >
        <div className="md:w-3/5 text-center md:text-left">
          <h2
            className={`text-3xl md:text-6xl font-eina font-bold mb-8 transition-colors duration-300 ${
              theme === "light" ? "text-indigo-800" : "text-indigo-100"
            }`}
          >
            Seamless Integration with Your Workflow
          </h2>
          <p
            className={`text-xl mb-8 max-w-3/4 transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            Supports multiple input formats (PDF, DOCX) and delivers outputs in
            JSON, CSV, and interactive HTML reports for easy integration with
            your HR systems.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {["PDF", "DOCX", "JSON", "CSV", "HTML"].map((format) => (
              <div
                key={format}
                className={`p-3 rounded-md shadow-sm transition-colors duration-300 ${
                  theme === "light"
                    ? "bg-indigo-50 hover:bg-indigo-100"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <span
                  className={`text-md font-medium transition-colors duration-300 ${
                    theme === "light" ? "text-indigo-700" : "text-indigo-400"
                  }`}
                >
                  {format}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-2/5 mt-10 md:pb-[100px] md:mt-[100px]">
          <div
            className={`p-8 rounded-xl shadow-lg border md:py-[50px] transition-colors duration-300 ${
              theme === "light"
                ? "bg-white border-gray-100"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <h3
              className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Sample Output
            </h3>
            <p
              className={`text-xl md:pb-3 transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              Interactive HTML Dashboard
            </p>
            <p
              className={`mt-2 text-lg transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              View ranked candidates with detailed scores and insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-6 md:px-12 text-center text-white transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
            : "bg-gradient-to-r from-indigo-800 to-purple-800"
        }`}
      >
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
          className={`font-semibold px-8 py-3 rounded-md shadow-lg transition-colors duration-300 ${
            theme === "light"
              ? "bg-white text-indigo-600 hover:bg-gray-100"
              : "bg-gray-900 text-indigo-200 hover:bg-gray-700"
          }`}
        >
          Get Started
        </button>
      </section>

      {/* Footer Section */}
      <footer
        className={`py-8 px-6 md:px-12 text-center text-white transition-colors duration-300 ${
          theme === "light" ? "bg-gray-800" : "bg-gray-950"
        }`}
      >
        <p className="text-sm font-semibold">
          © 2025 AI Powered Resume Parser. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ResumeUpload;
