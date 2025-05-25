import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

export default function ResultPage({ results }) {
  const { theme } = useContext(ThemeContext);

  if (!results || results.length === 0) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
          theme === "light" ? "bg-gray-50" : "bg-gray-900"
        }`}
      >
        <div
          className={`max-w-2xl mx-auto mt-12 mb-12 p-8 rounded-xl shadow-lg border transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-100"
              : "bg-gray-800 border-gray-700"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Ranking Results
          </h2>
          <p>No resumes were ranked for this job description.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
          theme === "light" ? "bg-gray-50" : "bg-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto mt-12 mb-12">
          <h2
            className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            Resume Ranking Results
          </h2>
          <div className="flex flex-col gap-8">
            {results.map((res, idx) => (
              <div
                key={idx}
                className={`rounded-2xl shadow-xl border-0 p-0 md:p-0 transition-colors duration-300 overflow-hidden ${
                  theme === "light"
                    ? "bg-gradient-to-br from-indigo-100 via-indigo-200 to-purple-400"
                    : "bg-gradient-to-br from-cyan-700  via-cyan-900 to-gray-900  border-blue-800"
                }`}
                style={{
                  boxShadow:
                    theme === "light"
                      ? "0 8px 32px 0 rgba(99,102,241,0.15), 0 1.5px 6px 0 rgba(139,92,246,0.10)"
                      : "0 8px 32px 0 rgba(55,48,163,0.25), 0 1.5px 6px 0 rgba(168,85,247,0.10)",
                }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block w-8 h-8 text-lg font-bold rounded-full text-center leading-8 mr-2 shadow-md ${
                          theme === "light"
                            ? "bg-gradient-to-br from-indigo-500 to-purple-400 text-white"
                            : "bg-gradient-to-br from-indigo-400 to-purple-700 text-white"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`text-xl font-semibold transition-colors duration-300 ${
                          theme === "light"
                            ? "text-indigo-900"
                            : "text-indigo-100"
                        }`}
                      >
                        {res.resume_name || res.filename}
                      </span>
                    </div>
                    <span
                      className={`text-lg font-bold transition-colors duration-300 ${
                        theme === "light"
                          ? "text-purple-700"
                          : "text-purple-200"
                      }`}
                    >
                      Score: {res.final_score.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-8 gap-2 mb-2">
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "light"
                            ? "text-indigo-700"
                            : "text-indigo-200"
                        }`}
                      >
                        Skills Matched:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(res.matching_skills || []).map((skill, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                              theme === "light"
                                ? "bg-gradient-to-r from-green-200 to-green-500 text-indigo-800"
                                : "bg-gradient-to-r from-green-800 to-green-900 text-indigo-100"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          theme === "light" ? "text-red-700" : "text-red-200"
                        }`}
                      >
                        Skills Missing:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(res.missing_skills || []).map((skill, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                              theme === "light"
                                ? "bg-gradient-to-r from-red-200 to-pink-100 text-red-800"
                                : "bg-gradient-to-r from-red-900 to-pink-900 text-red-100"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 mt-2">
                    <span
                      className={`font-medium ${
                        theme === "light"
                          ? "text-indigo-700"
                          : "text-indigo-200"
                      }`}
                    >
                      Contact:
                    </span>
                    <ul className="ml-4 text-sm mt-1">
                      {res.contact?.email && res.contact.email !== "N/A" && (
                        <li>
                          <span
                            className={`font-medium ${
                              theme === "light"
                                ? "text-indigo-700"
                                : "text-indigo-300"
                            }`}
                          >
                            Email:
                          </span>{" "}
                          <span
                            className={`font-medium ${
                              theme === "light"
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          >
                            {res.contact.email}
                          </span>
                        </li>
                      )}
                      {res.contact?.phone && res.contact.phone !== "N/A" && (
                        <li>
                          <span
                            className={`font-medium ${
                              theme === "light"
                                ? "text-indigo-700"
                                : "text-indigo-300"
                            }`}
                          >
                            Phone:
                          </span>{" "}
                          <span
                            className={`font-medium ${
                              theme === "light"
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          >
                            {" "}
                            {res.contact.phone}
                          </span>
                        </li>
                      )}
                      {res.contact?.github && res.contact.github !== "N/A" && (
                        <li>
                          <span
                            className={`font-medium ${
                              theme === "light"
                                ? "text-indigo-700"
                                : "text-indigo-300"
                            }`}
                          >
                            GitHub:
                          </span>{" "}
                          <a
                            href={res.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-medium ${
                              theme === "light"
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          >
                            {res.contact.github}
                          </a>
                        </li>
                      )}
                      {res.contact?.linkedin &&
                        res.contact.linkedin !== "N/A" && (
                          <li>
                            <span
                              className={`font-medium ${
                                theme === "light"
                                  ? "text-indigo-700"
                                  : "text-indigo-300"
                              }`}
                            >
                              LinkedIn:
                            </span>{" "}
                            <a
                              href={res.contact.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium ${
                                theme === "light"
                                  ? "text-gray-700"
                                  : "text-gray-300"
                              }`}
                            >
                              {res.contact.linkedin}
                            </a>
                          </li>
                        )}
                      {/* If no contact info at all, show a fallback */}
                      {!(
                        (res.contact?.email && res.contact.email !== "N/A") ||
                        (res.contact?.phone && res.contact.phone !== "N/A") ||
                        (res.contact?.github && res.contact.github !== "N/A") ||
                        (res.contact?.linkedin &&
                          res.contact.linkedin !== "N/A")
                      ) && (
                        <li className="italic text-gray-400">
                          No contact info provided.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
