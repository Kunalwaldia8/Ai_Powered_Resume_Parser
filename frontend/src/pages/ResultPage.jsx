import React from "react";

export default function ResultPage({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Ranking Results</h2>
        <p>No resumes were ranked for this job description.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Resume Ranking Results</h2>
      {results.map((res, idx) => (
        <div
          key={res.candidate_name || res.resume_name || res.filename || idx}
          className={`mb-6 p-4 rounded border ${
            res.rank <= 3
              ? "bg-green-50 border-green-400"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center mb-2">
            <span className="inline-block bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">
              {res.rank}
            </span>
            <h3 className="text-lg font-semibold">
              {res.resume_name || res.filename}
            </h3>
          </div>
          <p className="mb-2">
            <strong>Score:</strong>{" "}
            <span className="text-blue-700 font-bold">
              {res.final_score.toFixed(2)}%
            </span>
          </p>
          <div className="mb-2">
            <strong>Matching Skills:</strong>{" "}
            {res.matching_skills && res.matching_skills.length > 0
              ? res.matching_skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 mb-1 text-xs"
                  >
                    {skill}
                  </span>
                ))
              : "None"}
          </div>
          <div className="mb-2">
            <strong>Missing Skills:</strong>{" "}
            {res.missing_skills && res.missing_skills.length > 0
              ? res.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded mr-1 mb-1 text-xs"
                  >
                    {skill}
                  </span>
                ))
              : "None"}
          </div>
          <div className="mb-2">
            <strong>Contact:</strong>
            <ul className="ml-4">
              <li>
                <span className="font-medium">Email:</span>{" "}
                {res.contact?.email || "N/A"}
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                {res.contact?.phone || "N/A"}
              </li>
              <li>
                <span className="font-medium">GitHub:</span>{" "}
                {res.contact?.github ? (
                  <a
                    href={res.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    {res.contact.github}
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
              <li>
                <span className="font-medium">LinkedIn:</span>{" "}
                {res.contact?.linkedin ? (
                  <a
                    href={res.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
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
  );
}
