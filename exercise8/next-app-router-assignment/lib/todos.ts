export type Todo = {
  id: number;
  text: string;
};

export let todos: Todo[] = [
  { id: 1, text: "Finish Next.js homework" },
  { id: 2, text: "Build blog page" },
];

export function getTodos() {
  return todos;
}

export function addTodo(text: string) {
  const newTodo = {
    id: Date.now(),
    text,
  };

  todos.push(newTodo);
  return newTodo;
}

export function deleteTodo(id: number) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  const deleted = todos[index];
  todos.splice(index, 1);
  return deleted;
}