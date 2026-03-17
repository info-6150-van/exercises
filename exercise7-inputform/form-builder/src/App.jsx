import FormBuilder from "./components/FormBuilder";

function App() {
  return (
    <div className="app">
      <h1>Dynamic Form Builder</h1>
      <p className="subtitle">
        A simple React form builder inspired by Google Forms.
      </p>
      <FormBuilder />
    </div>
  );
}

export default App;