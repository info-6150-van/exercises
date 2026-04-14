import TodoForm from "@/components/TodoForm";
import DeleteTodoButton from "@/components/DeleteTodoButton";
import { getTodos } from "@/lib/todos";

export default function TodosPage() {
  const todos = getTodos();

  return (
    <div>
      <h1>Todo App</h1>

      <div className="card">
        <TodoForm />
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="card" style={styles.todoRow}>
          <span>{todo.text}</span>
          <DeleteTodoButton id={todo.id} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  todoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};