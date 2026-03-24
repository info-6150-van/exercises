import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuilderPage from "./pages/BuilderPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/builder">Form Builder</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;