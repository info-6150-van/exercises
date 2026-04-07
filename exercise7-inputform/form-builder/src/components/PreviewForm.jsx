import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PreviewForm() {
  const questions = useSelector((state) => state.form.questions);

  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        <Link className="toolbar-link" to="/builder/edit">
          Back to Edit
        </Link>
      </div>

      <form className="preview-form">
        {questions.map((question) => (
          <div className="preview-question" key={question.id}>
            <label className="preview-label">
              {question.label} {question.required && <span>*</span>}
            </label>

            {question.type === "text" && (
              <input className="preview-input" type="text" placeholder="Your answer" />
            )}

            {question.type === "radio" &&
              question.options.map((option, index) => (
                <label className="preview-option" key={index}>
                  <input type="radio" name={question.id} />
                  {option}
                </label>
              ))}

            {question.type === "checkbox" &&
              question.options.map((option, index) => (
                <label className="preview-option" key={index}>
                  <input type="checkbox" />
                  {option}
                </label>
              ))}
          </div>
        ))}

        <button className="submit-btn" type="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PreviewForm;