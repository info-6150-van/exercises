import { useState } from "react";
import ProfileCard from "./ProfileCard";

function ProfileList() {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      bio: "Frontend developer who loves React and clean UI design.",
      avatar: "https://i.pravatar.cc/200?img=5",
    },
    {
      id: 2,
      name: "Brian Lee",
      bio: "Backend engineer focused on APIs, databases, and cloud systems.",
      avatar: "https://i.pravatar.cc/200?img=12",
    },
    {
      id: 3,
      name: "Cathy Wang",
      bio: "Full-stack developer interested in product thinking and UX.",
      avatar: "https://i.pravatar.cc/200?img=20",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim() || !formData.bio.trim() || !formData.avatar.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newProfile = {
      id: Date.now(),
      name: formData.name,
      bio: formData.bio,
      avatar: formData.avatar,
    };

    setProfiles((prev) => [...prev, newProfile]);

    setFormData({
      name: "",
      bio: "",
      avatar: "",
    });
  }

  return (
    <div className="profile-list-wrapper">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Add New Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Enter short bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="text"
          name="avatar"
          placeholder="Enter avatar image URL"
          value={formData.avatar}
          onChange={handleChange}
        />

        <button type="submit">Add Profile</button>
      </form>

      <div className="profile-list">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            name={profile.name}
            bio={profile.bio}
            avatar={profile.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileList;