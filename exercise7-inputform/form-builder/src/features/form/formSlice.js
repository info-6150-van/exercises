import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "form-builder-schema";

const defaultState = {
  questions: [
    {
      id: nanoid(),
      type: "text",
      label: "What is your name?",
      required: true,
      options: [],
    },
    {
      id: nanoid(),
      type: "radio",
      label: "Which language do you prefer?",
      required: false,
      options: ["JavaScript", "Python", "Java"],
    },
  ],
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load schema from localStorage:", error);
    return defaultState;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save schema to localStorage:", error);
  }
}

const initialState = loadState();

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addQuestion: (state) => {
      state.questions.push({
        id: nanoid(),
        type: "text",
        label: "New Question",
        required: false,
        options: [],
      });
      saveState(state);
    },

    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
      saveState(state);
    },

    updateQuestionLabel: (state, action) => {
      const { id, label } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      if (question) {
        question.label = label;
        saveState(state);
      }
    },

    updateQuestionType: (state, action) => {
      const { id, type } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      if (question) {
        question.type = type;
        if (type === "text") {
          question.options = [];
        }
        if ((type === "radio" || type === "checkbox") && question.options.length === 0) {
          question.options = ["Option 1", "Option 2"];
        }
        saveState(state);
      }
    },

    toggleRequired: (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload);
      if (question) {
        question.required = !question.required;
        saveState(state);
      }
    },

    addOption: (state, action) => {
      const question = state.questions.find((q) => q.id === action.payload);
      if (question && (question.type === "radio" || question.type === "checkbox")) {
        question.options.push(`Option ${question.options.length + 1}`);
        saveState(state);
      }
    },

    updateOption: (state, action) => {
      const { id, index, value } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      if (question && question.options[index] !== undefined) {
        question.options[index] = value;
        saveState(state);
      }
    },

    deleteOption: (state, action) => {
      const { id, index } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      if (question) {
        question.options.splice(index, 1);
        saveState(state);
      }
    },

    resetForm: (state) => {
      state.questions = defaultState.questions;
      saveState(state);
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  updateQuestionLabel,
  updateQuestionType,
  toggleRequired,
  addOption,
  updateOption,
  deleteOption,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;