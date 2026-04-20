import FormBuilder from "../components/FormBuilder";
import ThemeToggle from "../components/ThemeToggle";

function BuilderPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Builder Page</h1>
        <ThemeToggle />
      </div>

      <p className="page-description">
        Edit your form schema here. Changes are persisted to localStorage.
      </p>

      <FormBuilder />
    </div>
  );
}

export default BuilderPage;