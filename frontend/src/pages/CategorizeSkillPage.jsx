// src/pages/CategorizeSkillPage.jsx
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CategorizeSkill from "../pages/CategorizeSkill";
import ResultPage from "./ResultPage";
import { ThemeContext } from "../components/ThemeContext"; // <-- added

export default function CategorizeSkillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jdSkills, sessionInfo } = location.state || {};
  const { theme } = useContext(ThemeContext); // <-- added

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Redirect to home if required data missing
  React.useEffect(() => {
    if (!jdSkills || !sessionInfo) {
      navigate("/", { replace: true });
    }
  }, [jdSkills, sessionInfo, navigate]);

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

  if (results) {
    return <ResultPage results={results} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 transition-colors duration-300 -mt-10 ${
        theme === "light"
          ? "bg-gradient-to-b from-white to-gray-50"
          : "bg-gradient-to-b from-gray-900 to-gray-800"
      }`}
    >
      <CategorizeSkill
        skills={jdSkills || []}
        sessionInfo={sessionInfo}
        onSubmit={handleCategorize}
        loading={loading}
      />
    </div>
  );
}
