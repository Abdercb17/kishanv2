// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import {
  MdHelpOutline,
  MdSettings,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import Home from "./Home"; // Import Home component
import MeetingPage from "./MeetingPage"; // Import MeetingPage component
import "./App.css"; // Import styles

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [datetime, setDatetime] = useState("");

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setDatetime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav id="navbar" className="navbar fixed-top">
          <div className="logo d-flex align-items-center">
            <FaVideo size={30} className="logo-img" />
            <div className="logo-txt ml-2">CallX</div>
          </div>

          <div className="navbar-actions d-flex align-items-center">
            <div className="circle mx-2">
              <MdHelpOutline size={24} />
            </div>
            <div className="circle mx-2">
              <MdSettings size={24} />
            </div>
            <div className="circle mx-2" onClick={toggleDarkMode}>
              {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </div>

            <div id="datetime" className="ml-3">
              {datetime}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meeting" element={<MeetingPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="container">
          <div>
            <h6>
              Learn more about{" "}
              <span className="learn-more text-info">VCallerx</span> .
            </h6>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
