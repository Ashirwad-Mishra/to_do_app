import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import styles from "./TodoItem.module.css";
import { formatDate } from "@/lib/utils";
import type { Todo } from "../App";

interface Props {
  todo: Todo;
  onDone: (id: number) => void;
  onCouldNotComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onDone, onCouldNotComplete, onDelete }: Props) {
  return (
    <Card
      className={`${styles.todoCard} ${
        todo.status === "done"
          ? styles.done
          : todo.status === "could_not_complete"
          ? styles.couldNotComplete
          : ""
      }`}
    >
      <CardContent className={styles.cardContent}>
        <div className={styles.todoInfo}>
          <span className={styles.todoText}>{todo.text}</span>
          <div className={styles.due}>
            Due: {formatDate(new Date(todo.due))} –{" "}
            {new Date(todo.due).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </CardContent>
      <div className={styles.actions}>
        <Button onClick={() => onDone(todo.id)}>Done</Button>
        <Button onClick={() => onCouldNotComplete(todo.id)}>
          Could Not Complete
        </Button>
        <Button variant="destructive" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default TodoItem;