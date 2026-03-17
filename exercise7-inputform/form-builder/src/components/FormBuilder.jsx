import { useState } from "react";
import QuestionCard from "./QuestionCard";

function FormBuilder() {
  const [questions, setQuestions] = useState([]);

  function addQuestion() {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "text",
      options: ["", ""],
    };

    setQuestions((prev) => [...prev, newQuestion]);
  }

  function updateQuestionText(id, newText) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text: newText } : q))
    );
  }

  function updateQuestionType(id, newType) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              type: newType,
              options:
                newType === "multiple" || newType === "checkbox"
                  ? q.options.length > 0
                    ? q.options
                    : ["", ""]
                  : [],
            }
          : q
      )
    );
  }

  function updateOption(questionId, optionIndex, newValue) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, index) =>
                index === optionIndex ? newValue : opt
              ),
            }
          : q
      )
    );
  }

  function addOption(questionId) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: [...q.options, ""] }
          : q
      )
    );
  }

  function deleteQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  return (
    <div className="form-builder">
      <button className="add-btn" onClick={addQuestion}>
        + Add Question
      </button>

      {questions.length === 0 ? (
        <p className="empty-text">No questions yet. Add one to start.</p>
      ) : (
        questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            index={index}
            question={question}
            onTextChange={updateQuestionText}
            onTypeChange={updateQuestionType}
            onOptionChange={updateOption}
            onAddOption={addOption}
            onDelete={deleteQuestion}
          />
        ))
      )}
    </div>
  );
}

export default FormBuilder;