import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

const Features = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`features-page min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <section
        className={`py-20 px-6 md:px-20 text-center transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-b from-white to-gray-50"
            : "bg-gradient-to-b from-gray-900 to-gray-800"
        }`}
      >
        <h1
          className={`text-4xl md:text-7xl font-sans font-bold mb-12 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-100"
          }`}
        >
          Key Features
        </h1>
        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
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
                Automated Resume Parsing
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Uses compiler design principles to tokenize and extract
                structured data (name, contact, education, skills, experience)
                from unstructured PDF/DOCX resumes.
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
                Multi-format Support
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Handles resumes in PDF, DOCX, PNG, and plain text formats using
                format-specific Python libraries.
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
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
                Intelligent Skill Extraction
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Extracts and categorizes skills from resumes and job
                descriptions using spaCy, TF-IDF, and custom regex logic.
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
                    d="M5 13l4 4L19 7"
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
                Advanced Ranking Algorithm
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Employs semantic matching via cosine similarity and
                keyword-based matching for accurate resume-job fit scoring.
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
                Interactive Dashboard
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Ranks candidates visually via a React-based UI with CSV export,
                HTML reports, and JSON output.
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
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
                Customizable Candidate Selection
              </h3>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Users can specify the number of top candidates they want to
                shortlist.
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
        </div>
      </section>
    </div>
  );
};

export default Features;
