import FormBuilder from "../components/FormBuilder";

function BuilderPage() {
  return (
    <div className="page-card">
      <h1>Dynamic Form Builder</h1>
      <p className="subtitle">
        Create questions, choose question types, and add options dynamically.
      </p>

      <FormBuilder />
    </div>
  );
}

export default BuilderPage;