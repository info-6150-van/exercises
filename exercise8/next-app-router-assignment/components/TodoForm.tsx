"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoForm() {
  const [text, setText] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo..."
      />
      <button>Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
  },
};