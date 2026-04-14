"use client";

import { useRouter } from "next/navigation";

export default function DeleteTodoButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  return <button onClick={handleDelete}>Delete</button>;
}