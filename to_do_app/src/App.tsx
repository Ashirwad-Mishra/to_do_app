import { useEffect, useState } from "react";
import { Input } from "./Components/ui/input";
import { Button } from "./Components/ui/button";
import TodoItem from "./Components/TodoItem";
import styles from "./App.module.css";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  due: Date;
  alarmMinutes: number;
  status: "pending" | "done" | "could_not_complete";
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [alarmMinutes, setAlarmMinutes] = useState(5);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const now = Date.now();
    todos.forEach((todo) => {
      if (todo.status === "pending" && todo.due) {
        const alarmTime = new Date(todo.due).getTime() - todo.alarmMinutes * 60 * 1000;
        if (alarmTime > now) {
          const timeout = setTimeout(() => {
            if (Notification.permission === "granted") {
              new Notification("Reminder", {
                body: todo.text,
              });
            }
          }, alarmTime - now);
          return () => clearTimeout(timeout);
        }
      }
    });
  }, [todos]);

  const addTodo = () => {
    if (!input.trim() || !dueDate || !dueTime) return;

    const fullDate = new Date(`${dueDate}T${dueTime}`);
    if (fullDate < new Date()) {
      alert("Cannot set a task in the past.");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
      due: fullDate,
      alarmMinutes,
      status: "pending",
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
    setDueDate("");
    setDueTime("");
    setAlarmMinutes(5);
  };

  const markDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: "done", done: true } : todo
      )
    );
  };

  const markCouldNotComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: "could_not_complete", done: false } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Task Scheduler</h1>

      <div className={styles.form}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <input
          type="date"
          className={styles.dateInput}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          className={styles.dateInput}
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <input
          type="number"
          className={styles.numberInput}
          value={alarmMinutes}
          min={0}
          onChange={(e) => setAlarmMinutes(Number(e.target.value))}
          placeholder="Remind before (min)"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDone={markDone}
            onCouldNotComplete={markCouldNotComplete}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;