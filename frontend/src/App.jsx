import "./fonts.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Process from "./pages/Process";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
