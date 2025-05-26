// src/pages/CategorizeSkillPage.jsx
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CategorizeSkill from "./CategorizeSkill";
import ResultPage from "./ResultPage";
import { ThemeContext } from "../components/ThemeContext";

export default function CategorizeSkillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { jdSkills, sessionInfo } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // If user navigates directly, redirect to home
  React.useEffect(() => {
    if (!jdSkills || !sessionInfo) {
      navigate("/", { replace: true });
    }
  }, [jdSkills, sessionInfo, navigate]);

  // Handler for categorization submission
  const handleCategorize = async (skill_categories) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/categorize_skills", {
        ...sessionInfo,
        skill_categories,
      });
      setResults(res.data.ranked_resumes);
    } catch (err) {
      alert("Ranking failed");
    } finally {
      setLoading(false);
    }
  };

  // Show results if available
  if (results) {
    return <ResultPage results={results} />;
  }

  // Show categorization UI with matching background
  return (
    <div
      className={`h-screen w-full overflow-hidden flex flex-col font-sans transition-colors duration-300 ${
        theme === "light" ? "bg-cyan-50" : "bg-gray-900"
      }`}
    >
      {/* Background gradients with absolute positioning */}
      <div
        className={`fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 filter blur-2xl z-0 transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-r from-cyan-400 to-blue-300"
            : "bg-gradient-to-r from-indigo-800 to-purple-700"
        }`}
      ></div>
      <div
        className={`fixed top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 filter blur-3xl z-0 transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-r from-blue-400 to-cyan-300"
            : "bg-gradient-to-r from-blue-800 to-cyan-700"
        }`}
      ></div>
      <div
        className={`fixed top-[40%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 filter blur-2xl z-0 transition-colors duration-300 ${
          theme === "light"
            ? "bg-gradient-to-r from-teal-400 to-cyan-300"
            : "bg-gradient-to-r from-teal-800 to-cyan-700"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-2">
        <CategorizeSkill
          skills={jdSkills || []}
          onSubmit={handleCategorize}
          loading={loading}
        />
      </div>
    </div>
  );
}
