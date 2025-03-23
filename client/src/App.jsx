import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Moviecenter from "./components/Moviecenter"; // Import Moviecenter from components folder

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Moviecenter />} />

          <Route
            path="/booking/:movieTitle"
            element={<div className="text-white text-center pt-20">Booking Page (To be implemented)</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;