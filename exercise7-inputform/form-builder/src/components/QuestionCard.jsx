import {
  addOption,
  deleteOption,
  deleteQuestion,
  toggleRequired,
  updateOption,
  updateQuestionLabel,
  updateQuestionType,
} from "../features/form/formSlice";
import { useDispatch } from "react-redux";

function QuestionCard({ question }) {
  const dispatch = useDispatch();

  return (
    <div className="question-card">
      <input
        className="question-input"
        type="text"
        value={question.label}
        onChange={(e) =>
          dispatch(
            updateQuestionLabel({
              id: question.id,
              label: e.target.value,
            })
          )
        }
        placeholder="Enter question title"
      />

      <select
        className="question-select"
        value={question.type}
        onChange={(e) =>
          dispatch(
            updateQuestionType({
              id: question.id,
              type: e.target.value,
            })
          )
        }
      >
        <option value="text">Text</option>
        <option value="radio">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
      </select>

      <label className="required-row">
        <input
          type="checkbox"
          checked={question.required}
          onChange={() => dispatch(toggleRequired(question.id))}
        />
        Required
      </label>

      {(question.type === "radio" || question.type === "checkbox") && (
        <div className="options-wrapper">
          <h4>Options</h4>

          {question.options.map((option, index) => (
            <div className="option-row" key={index}>
              <input
                className="option-input"
                type="text"
                value={option}
                onChange={(e) =>
                  dispatch(
                    updateOption({
                      id: question.id,
                      index,
                      value: e.target.value,
                    })
                  )
                }
              />
              <button
                className="option-btn delete-btn"
                onClick={() =>
                  dispatch(
                    deleteOption({
                      id: question.id,
                      index,
                    })
                  )
                }
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="option-btn"
            onClick={() => dispatch(addOption(question.id))}
          >
            Add Option
          </button>
        </div>
      )}

      <button
        className="delete-question-btn"
        onClick={() => dispatch(deleteQuestion(question.id))}
      >
        Delete Question
      </button>
    </div>
  );
}

export default QuestionCard;