import { useDispatch, useSelector } from "react-redux";
import { addQuestion, resetForm } from "../features/form/formSlice";
import QuestionCard from "./QuestionCard";
import { Link } from "react-router-dom";

function FormBuilder() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.form.questions);

  return (
    <div className="builder-container">
      <div className="builder-toolbar">
        <button className="toolbar-btn" onClick={() => dispatch(addQuestion())}>
          Add Question
        </button>

        <button className="toolbar-btn reset-btn" onClick={() => dispatch(resetForm())}>
          Reset Form
        </button>

        <Link className="toolbar-link" to="/builder/preview">
          Go to Preview
        </Link>
      </div>

      <div className="question-list">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default FormBuilder;