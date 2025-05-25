// src/pages/CategorizeSkillPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CategorizeSkill from "../pages/CategorizeSkill";
import ResultPage from "./ResultPage";

export default function CategorizeSkillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jdSkills, sessionInfo } = location.state || {};
  console.log("CategorizeSkillPage: jdSkills =", jdSkills);
  console.log("CategorizeSkillPage: sessionInfo =", sessionInfo);
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

  // Show categorization UI
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <CategorizeSkill
        skills={jdSkills || []}
        sessionInfo={sessionInfo}
        onSubmit={handleCategorize}
        loading={loading}
      />
    </div>
  );
}
