import React, { useContext, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";

const initialCategories = [
  { key: "required", label: "Required" },
  { key: "essential", label: "Essential" },
  { key: "good_to_have", label: "Good to Have" },
];

export default function CategorizeSkill({ skills = [], onSubmit, loading }) {
  const { theme } = useContext(ThemeContext);
  const [selections, setSelections] = useState({
    required: [],
    essential: [],
    good_to_have: [],
  });

  // Helper: get all selected skills (to disable in other categories)
  const allSelected = [
    ...selections.required,
    ...selections.essential,
    ...selections.good_to_have,
  ];

  // Handle selection toggle
  const handleToggle = (category, skill) => {
    setSelections((prev) => {
      // Remove skill from all categories first
      const newSelections = {};
      for (const cat of initialCategories.map((c) => c.key)) {
        newSelections[cat] = prev[cat].filter((s) => s !== skill);
      }
      // Add to selected category if not already there
      if (!prev[category].includes(skill)) {
        newSelections[category] = [...newSelections[category], skill];
      }
      return newSelections;
    });
  };

  // Handle select all for a category
  const handleSelectAll = (category) => {
    setSelections((prev) => {
      const otherCats = initialCategories
        .map((c) => c.key)
        .filter((k) => k !== category);
      const alreadySelected = otherCats.flatMap((k) => prev[k]);
      const selectable = skills.filter(
        (skill) => !alreadySelected.includes(skill)
      );
      const newSelections = { ...prev };
      newSelections[category] = selectable;
      // Remove from other categories
      otherCats.forEach((k) => {
        newSelections[k] = prev[k].filter((s) => !selectable.includes(s));
      });
      return newSelections;
    });
  };

  // Handle deselect all for a category
  const handleDeselectAll = (category) => {
    setSelections((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSelected =
      selections.required.length +
      selections.essential.length +
      selections.good_to_have.length;
    if (skills.length === 0 || totalSelected !== skills.length) {
      alert("Please assign every skill to a category.");
      return;
    }
    onSubmit(selections);
  };

  return (
    <form
      className={`w-full max-w-4xl h-[calc(100vh-9rem)] flex flex-col rounded-2xl shadow-xl border-0 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-cyan-50 via-white to-blue-50"
          : "bg-gradient-to-br from--900 via-cyan-950 to-blue-950 border border-cyan-800"
      }`}
      style={{ minWidth: 0 }}
      onSubmit={handleSubmit}
    >
      <h2
        className={`text-xl font-bold py-3 text-center tracking-wide ${
          theme === "light"
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-blue-700 to-teal-600"
            : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-teal-300"
        }`}
      >
        Categorize Job Description Skills
      </h2>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-3 min-h-0">
        {initialCategories.map((cat) => {
          const otherCats = initialCategories
            .map((c) => c.key)
            .filter((k) => k !== cat.key);
          const alreadySelected = otherCats.flatMap((k) => selections[k]);
          const selectable = skills.filter(
            (skill) => !alreadySelected.includes(skill)
          );
          const allSelectedHere =
            selections[cat.key].length === selectable.length &&
            selectable.length > 0;

          return (
            <div
              key={cat.key}
              className={`flex flex-col rounded-xl p-2 shadow-lg border-0 transition-colors duration-300 backdrop-blur-lg bg-opacity-80 min-h-0 ${
                theme === "light"
                  ? "bg-gradient-to-br from-white via-cyan-50 to-blue-100 border border-cyan-200"
                  : "bg-gradient-to-br from-gray-800  via-cyan-800 to-cyan-900  border-blue-800"
              }`}
              style={{
                boxShadow:
                  theme === "light"
                    ? "0 8px 32px 0 rgba(99,102,241,0.15), 0 1.5px 6px 0 rgba(139,92,246,0.10)"
                    : "0 8px 32px 0 rgba(55,48,163,0.25), 0 1.5px 6px 0 rgba(168,85,247,0.10)",
              }}
            >
              <h3
                className={`font-bold mb-1 text-center text-base tracking-wide ${
                  theme === "light"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-blue-700 to-teal-600"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-teal-300"
                }`}
              >
                {cat.label}
              </h3>
              <div className="flex items-center mb-1 justify-center">
                <input
                  type="checkbox"
                  id={`select-all-${cat.key}`}
                  checked={allSelectedHere}
                  onChange={() =>
                    allSelectedHere
                      ? handleDeselectAll(cat.key)
                      : handleSelectAll(cat.key)
                  }
                  className="accent-cyan-600 mr-1 scale-100"
                />
                <label
                  htmlFor={`select-all-${cat.key}`}
                  className={`text-xs  font-medium cursor-pointer ${
                    theme === "light"
                      ? "text-black hover:text-cyan-800"
                      : "text-white hover:text-cyan-300"
                  }`}
                >
                  {allSelectedHere ? "Deselect All" : "Select All"}
                </label>
              </div>
              <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar min-h-0">
                {skills.map((skill) => {
                  const selectedInOther =
                    alreadySelected.includes(skill) &&
                    !selections[cat.key].includes(skill);
                  return (
                    <label
                      key={skill}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 cursor-pointer text-sm ${
                        selections[cat.key].includes(skill)
                          ? theme === "light"
                            ? "bg-cyan-200 text-cyan-900 font-semibold"
                            : "bg-cyan-900 text-cyan-100 font-semibold"
                          : selectedInOther
                          ? "opacity-40 pointer-events-none"
                          : theme === "light"
                          ? "hover:bg-cyan-800"
                          : "hover:bg-cyan-900"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selections[cat.key].includes(skill)}
                        disabled={selectedInOther}
                        onChange={() => handleToggle(cat.key, skill)}
                        className="accent-cyan-600 scale-100"
                      />
                      <span
                        className={`truncate ${
                          theme === "light" ? "text-gray-800" : "text-gray-200"
                        }`}
                      >
                        {skill}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center p-2">
        <button
          type="submit"
          className={`px-6 py-1.5 rounded-lg font-semibold text-sm tracking-wide transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
              : "bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-cyan-800 hover:to-blue-800 text-white border border-cyan-900"
          }`}
          disabled={loading}
        >
          {loading ? "Ranking..." : "Rank Resumes"}
        </button>
      </div>
    </form>
  );
}
