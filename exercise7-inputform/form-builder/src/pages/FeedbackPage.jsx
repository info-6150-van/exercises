function FeedbackPage() {
  return (
    <div className="page-container">
      <h1>Code Review Feedback</h1>

      <div className="feedback-card">
        <h3>Classmate Review Notes</h3>
        <ul>
          <li>The project separates edit mode and preview mode clearly.</li>
          <li>Redux is used for schema state management.</li>
          <li>Context is used for global theme management.</li>
          <li>Router controls page navigation and preview/edit state.</li>
          <li>Schema persistence improves usability and simulates optimistic updates.</li>
        </ul>
      </div>
    </div>
  );
}

export default FeedbackPage;