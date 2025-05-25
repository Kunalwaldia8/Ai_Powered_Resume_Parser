import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

const Process = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`process-page min-h-screen flex flex-col font-sans transition-colors duration-300 ${
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
          Our Process
        </h1>

        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          <div
            className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                1. Resume Parsing
              </h2>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Leveraging compiler design principles like lexical and syntactic
                analysis, the system parses resume files (PDF/DOCX). Tools like{" "}
                <code>pdfminer.six</code> and <code>python-docx</code> extract
                raw text, which is tokenized and structured into fields.
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
            className={`flex flex-col md:flex-row-reverse items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                2. Job Description Analysis
              </h2>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                The system processes job descriptions to extract required skills
                and keywords using NLP tools like spaCy and scikit-learn.
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
            className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                3. Resume Ranking
              </h2>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Resumes and job descriptions are vectorized using TF-IDF. Cosine
                similarity helps assign relevance scores based on semantic and
                keyword matching.
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
                  viewBox="1 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="
          M4 18v8a2 2 0 002 2h2a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2z
          M13 10v16a2 2 0 002 2h2a2 2 0 002-2V10a2 2 0 00-2-2h-2a2 2 0 00-2 2z
          M22 4v22a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col md:flex-row-reverse items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                4. Pipeline Integration
              </h2>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                All modules follow a standardized pipeline with RESTful APIs
                (built using Flask), returning results in JSON, HTML, and CSV
                formats.
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up ${
              theme === "light"
                ? "bg-white"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2
                className={`text-3xl font-semibold mb-5 transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                5. Output Visualization
              </h2>
              <p
                className={`text-xl transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Users view and download rankings via a React-based UI, which
                also allows uploading multiple resumes and entering job
                descriptions easily.
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
        </div>
      </section>
    </div>
  );
};

export default Process;
