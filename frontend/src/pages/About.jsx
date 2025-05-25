import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`about-page min-h-screen flex flex-col font-sans transition-colors duration-300 ${
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
          className={`text-4xl md:text-7xl font-sans font-bold mb-10 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-100"
          }`}
        >
          About the Project
        </h1>
        <div
          className={`p-8 rounded-xl shadow-lg max-w-5xl mx-auto transition-all duration-300 transform hover:scale-105 animate-slide-up ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <p
            className={`text-start text-xl mb-4 transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            <strong
              className={`transition-colors duration-300 ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
            >
              Project Title:
            </strong>{" "}
            AI-Powered Resume Parser & Ranking System
          </p>
          <p
            className={`text-start text-xl transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            This project aims to automate and optimize the hiring process using
            concepts from compiler design and NLP. By treating resumes as
            "source code," the system extracts meaningful structured data and
            ranks candidates based on their relevance to a job description.
          </p>
        </div>

        <h2
          className={`text-3xl font-sans font-bold mt-12 mb-8 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-300"
          }`}
        >
          Team Members
        </h2>
        <div
          className={`p-8 rounded-xl shadow-lg max-w-5xl mx-auto transition-all duration-300 transform hover:scale-105 animate-slide-up ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <ul
            className={`text-start text-xl space-y-4 list-disc list-inside transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            <li>
              <strong
                className={`transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Akshat Bisht (Team lead)
              </strong>
            </li>
            <li>
              <strong
                className={`transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Kunal Waldia
              </strong>
            </li>
            <li>
              <strong
                className={`transition-colors duration-300 ${
                  theme === "light" ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Divyansh Dhaundiyal
              </strong>
            </li>
          </ul>
        </div>

        <h2
          className={`text-3xl font-sans font-bold mt-12 mb-8 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-300"
          }`}
        >
          Technologies Used
        </h2>
        <div
          className={`p-8 rounded-xl shadow-lg max-w-5xl mx-auto transition-all duration-300 transform hover:scale-105 animate-slide-up ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <ul
            className={`text-start text-xl space-y-4 list-disc list-inside transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            <li>
              Python (Flask, pdfminer.six, python-docx, spaCy, scikit-learn)
            </li>
            <li>React (Frontend UI)</li>
            <li>NLP Techniques (TF-IDF, Cosine Similarity)</li>
            <li>JSON, CSV, HTML Output Formats</li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/Kunalwaldia8/Ai_Powered_Resume_Parser/tree/master"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline transition-colors duration-300 ${
                  theme === "light"
                    ? "text-indigo-700 hover:text-indigo-900"
                    : "text-indigo-400 hover:text-indigo-300"
                }`}
              >
                Project Repository
              </a>
            </li>
          </ul>
        </div>

        <h2
          className={`text-3xl font-sans font-bold mt-12 mb-8 transition-colors duration-300 ${
            theme === "light" ? "text-indigo-800" : "text-indigo-300"
          }`}
        >
          Motivation
        </h2>
        <div
          className={`p-8 rounded-xl shadow-lg max-w-5xl mx-auto transition-all duration-300 transform hover:scale-105 animate-slide-up ${
            theme === "light"
              ? "bg-white"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <ul
            className={`text-start text-xl space-y-4 list-disc list-inside transition-colors duration-300 ${
              theme === "light" ? "text-gray-600" : "text-gray-200"
            }`}
          >
            <li>
              The motivation behind this project is to streamline and enhance
              the recruitment process by leveraging AI to automate resume
              parsing, candidate matching, and ranking.
            </li>
            <li>
              Traditional hiring methods are time-consuming, error-prone, and
              often biased.
            </li>
            <li>
              By using natural language processing and intelligent matching
              techniques, this system aims to reduce manual effort, improve
              accuracy, and help recruiters quickly identify the most suitable
              candidates, ultimately leading to faster and more efficient hiring
              decisions.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
