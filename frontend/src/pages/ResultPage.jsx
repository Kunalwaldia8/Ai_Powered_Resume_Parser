import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

export default function ResultPage({ results }) {
  const { theme } = useContext(ThemeContext);

  if (!results || results.length === 0) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans transition-colors duration-300 animate-fade-in-up ${
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
          <div
            className={`max-w-2xl mx-auto p-6 rounded-xl shadow-lg transition-colors duration-300 animate-slide-up ${
              theme === "light"
                ? "bg-white border border-gray-100"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <h2
              className={`text-3xl font-sans font-bold mb-4 transition-colors duration-300 ${
                theme === "light" ? "text-indigo-800" : "text-indigo-100"
              }`}
            >
              Ranking Results
            </h2>
            <p
              className={`text-lg transition-colors duration-300 ${
                theme === "light" ? "text-gray-600" : "text-gray-200"
              }`}
            >
              No resumes were ranked for this job description.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 animate-fade-in-up ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <section
        className={`py-20 px-6 md:px-20 text-center transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-b from-white to-gray-50"
            : "bg-gradient-to-b from-gray-900 to-gray-800"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl md:text-7xl font-sans font-bold mb-12 transition-colors duration-300 ${
              theme === "light" ? "text-indigo-800" : "text-indigo-100"
            }`}
          >
            Resume Ranking Results
          </h2>
          {results.map((res, idx) => (
            <div
              key={res.candidate_name || res.resume_name || res.filename || idx}
              className={`mb-6 p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-up delay-${
                idx * 100
              } ${
                res.rank <= 3
                  ? theme === "light"
                    ? "bg-gray-50 border border-gray-200"
                    : "bg-gray-900 border border-gray-700"
                  : theme === "light"
                  ? "bg-white border border-gray-100"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              <div className="flex items-center mb-4">
                <span
                  className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold transition-colors duration-300 ${
                    theme === "light"
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-400 text-gray-900"
                  }`}
                >
                  {res.rank}
                </span>
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  {res.resume_name || res.filename}
                </h3>
              </div>
              <p
                className={`mb-3 transition-colors duration-300 text-2xl ${
                  theme === "light" ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <strong>Score:</strong>{" "}
                <span
                  className={`font-bold transition-colors duration-300 ${
                    theme === "light" ? "text-indigo-700" : "text-indigo-400"
                  }`}
                >
                  {res.final_score.toFixed(2)}%
                </span>
              </p>
              <div className="mb-3 text-xl">
                <strong
                  className={`transition-colors duration-300 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Matching Skills:
                </strong>{" "}
                {res.matching_skills && res.matching_skills.length > 0 ? (
                  res.matching_skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-block px-3 py-1 rounded-lg mr-2 mb-2 text-sm transition-colors duration-300 transform hover:scale-105 ${
                        theme === "light"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-indigo-700 text-indigo-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    None
                  </span>
                )}
              </div>
              <div className="mb-3 text-xl">
                <strong
                  className={`transition-colors duration-300 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Missing Skills:
                </strong>{" "}
                {res.missing_skills && res.missing_skills.length > 0 ? (
                  res.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-block px-3 py-1 rounded-lg mr-2 mb-2 text-sm transition-colors duration-300 transform hover:scale-105 ${
                        theme === "light"
                          ? "bg-red-100 text-red-800"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    None
                  </span>
                )}
              </div>
              <div className="mb-3 text-2xl">
                <strong
                  className={`transition-colors duration-300 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Contact:
                </strong>
                <ul
                  className={`mt-1 ml-4 text-lg transition-colors duration-300 ${
                    theme === "light" ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  <li>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      Email:
                    </span>{" "}
                    {res.contact?.email || "N/A"}
                  </li>
                  <li>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      Phone:
                    </span>{" "}
                    {res.contact?.phone || "N/A"}
                  </li>
                  <li>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      GitHub:
                    </span>{" "}
                    {res.contact?.github ? (
                      <a
                        href={res.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline transition-colors duration-300 transform hover:scale-105 ${
                          theme === "light"
                            ? "text-indigo-700 hover:text-indigo-900"
                            : "text-indigo-400 hover:text-indigo-300"
                        }`}
                      >
                        {res.contact.github}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      LinkedIn:
                    </span>{" "}
                    {res.contact?.linkedin ? (
                      <a
                        href={res.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline transition-colors duration-300 transform hover:scale-105 ${
                          theme === "light"
                            ? "text-indigo-700 hover:text-indigo-900"
                            : "text-indigo-400 hover:text-indigo-300"
                        }`}
                      >
                        {res.contact.linkedin}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
