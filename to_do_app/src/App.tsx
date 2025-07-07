import { useState } from 'react';
import { Input } from "./Components/ui/input";
import { Button } from "./Components/ui/button";
import TodoItem from "./Components/TodoItem";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, id: Date.now(), done: false }]);
    setInput("");
  };

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">ToDo App</h1>
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="w-full max-w-md space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleDone}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;