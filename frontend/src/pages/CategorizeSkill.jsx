import React, { useState } from "react";

// Category options
const categories = [
  { value: "required", label: "Required" },
  { value: "essential", label: "Essential" },
  { value: "good_to_have", label: "Good to Have" },
];

export default function CategorizeSkill({ skills = [], onSubmit, loading }) {
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
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        Categorize Job Description Skills
      </h2>
      <table className="min-w-full bg-white rounded shadow mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Skill</th>
            <th className="py-2 px-4 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {(skills || []).map((skill) => (
            <tr key={skill}>
              <td className="py-2 px-4 border-b">{skill}</td>
              <td className="py-2 px-4 border-b">
                <select
                  className="border rounded px-2 py-1"
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
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Ranking..." : "Rank Resumes"}
      </button>
    </form>
  );
}
