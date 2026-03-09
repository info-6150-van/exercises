import { useState } from "react";

function ProfileCard({ name, bio, avatar }) {
  const [highlight, setHighlight] = useState(false);

  const cardStyle = {
    boxShadow: highlight
      ? "0 10px 24px rgba(76, 175, 80, 0.35)"
      : "0 4px 10px rgba(0, 0, 0, 0.12)",
    border: highlight ? "2px solid #4caf50" : "2px solid transparent",
    transform: highlight ? "translateY(-2px)" : "translateY(0)",
  };

  return (
    <div className="profile-card" style={cardStyle}>
      <img className="profile-avatar" src={avatar} alt={`${name} avatar`} />

      <h2>{name}</h2>
      <p>{bio}</p>

      <button
        className={highlight ? "highlight-btn active" : "highlight-btn"}
        onClick={() => setHighlight(!highlight)}
      >
        {highlight ? "Remove Highlight" : "Highlight"}
      </button>
    </div>
  );
}

export default ProfileCard;