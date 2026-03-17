function QuestionCard({
  index,
  question,
  onTextChange,
  onTypeChange,
  onOptionChange,
  onAddOption,
  onDelete,
}) {
  return (
    <div className="question-card">
      <div className="question-header">
        <h2>Question {index + 1}</h2>
        <button
          className="delete-btn"
          onClick={() => onDelete(question.id)}
        >
          Delete
        </button>
      </div>

      <input
        className="question-input"
        type="text"
        placeholder="Enter your question"
        value={question.text}
        onChange={(e) => onTextChange(question.id, e.target.value)}
      />

      <select
        className="question-select"
        value={question.type}
        onChange={(e) => onTypeChange(question.id, e.target.value)}
      >
        <option value="text">Text</option>
        <option value="multiple">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {(question.type === "multiple" || question.type === "checkbox") && (
        <div className="options-section">
          <h3>Options</h3>

          {question.options.map((option, index) => (
            <input
              key={index}
              className="option-input"
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                onOptionChange(question.id, index, e.target.value)
              }
            />
          ))}

          <button
            className="option-btn"
            onClick={() => onAddOption(question.id)}
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;