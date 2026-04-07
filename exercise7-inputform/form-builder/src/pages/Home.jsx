import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  return (
    <div className="page-container">
      <h1>Dynamic Form Builder</h1>
      <p className="page-description">
        This project demonstrates Redux, Context, Router, persistence, and preview mode.
      </p>

      <div className="home-actions">
        <Link className="nav-btn" to="/builder/edit">
          Start Building
        </Link>

        <Link className="nav-btn" to="/feedback">
          View Feedback Page
        </Link>
      </div>

      <ThemeToggle />
    </div>
  );
}

export default Home;