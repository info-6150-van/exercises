import PreviewForm from "../components/PreviewForm";
import ThemeToggle from "../components/ThemeToggle";

function PreviewPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Preview Page</h1>
        <ThemeToggle />
      </div>

      <p className="page-description">
        This page renders the form in preview mode using URL-based navigation.
      </p>

      <PreviewForm />
    </div>
  );
}

export default PreviewPage;