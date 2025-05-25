import React, { useState, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

// Category options
const categories = [
  { value: "required", label: "Required" },
  { value: "essential", label: "Essential" },
  { value: "good_to_have", label: "Good to Have" },
];

export default function CategorizeSkill({ skills = [], onSubmit, loading }) {
  const { theme } = useContext(ThemeContext);
  const [assignments, setAssignments] = useState({});

  // Handle category change for a skill
  const handleChange = (skill, category) => {
    setAssignments((prev) => ({
      ...prev,
      [skill]: category,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skills || skills.length === 0) {
      alert("No skills to categorize.");
      return;
    }
    if (skills.some((skill) => !assignments[skill])) {
      alert("Please assign a category to every skill.");
      return;
    }
    const skill_categories = { required: [], essential: [], good_to_have: [] };
    Object.entries(assignments).forEach(([skill, cat]) => {
      if (cat) skill_categories[cat].push(skill);
    });
    onSubmit(skill_categories);
  };

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
            className={`text-3xl font-sans font-bold mb-6 transition-colors duration-300 ${
              theme === "light" ? "text-indigo-800" : "text-indigo-100"
            }`}
          >
            Categorize Job Description Skills
          </h2>
          <table
            className={`min-w-full rounded-lg shadow-md mb-6 transition-colors duration-300 ${
              theme === "light"
                ? "bg-white border border-gray-100"
                : "bg-gray-800 border border-gray-700"
            }`}
          >
            <thead>
              <tr
                className={`transition-colors duration-300 ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-700"
                }`}
              >
                <th
                  className={`py-3 px-4 border-b text-left font-semibold transition-colors duration-300 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Skill
                </th>
                <th
                  className={`py-3 px-4 border-b text-left font-semibold transition-colors duration-300 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {(skills || []).map((skill, index) => (
                <tr
                  key={skill}
                  className={`transition-all duration-300 animate-slide-up delay-${
                    index * 100
                  } ${
                    theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-700"
                  }`}
                >
                  <td
                    className={`py-3 px-4 border-b transition-colors duration-300 ${
                      theme === "light" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    {skill}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <select
                      className={`border rounded-lg px-3 py-2 w-full text-sm focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                        theme === "light"
                          ? "border-gray-300 text-gray-700 bg-white"
                          : "border-gray-600 text-gray-200 bg-gray-700"
                      }`}
                      value={assignments[skill] || ""}
                      onChange={(e) => handleChange(skill, e.target.value)}
                      required
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
              theme === "light"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900 text-white"
            }`}
          >
            {loading ? "Ranking..." : "Rank Resumes"}
          </button>
        </div>
      </section>
    </div>
  );
}
