import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import FeedbackPage from "./pages/FeedbackPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder/edit" element={<BuilderPage />} />
        <Route path="/builder/preview" element={<PreviewPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;