import ProfileList from "./components/ProfileList";

function App() {
  return (
    <div className="app">
      <h1>Profile Card Exercise</h1>
      <p className="subtitle">
        Reusable ProfileCard component with dynamic styling and interactive
        profile list.
      </p>

      <ProfileList />
    </div>
  );
}

export default App;