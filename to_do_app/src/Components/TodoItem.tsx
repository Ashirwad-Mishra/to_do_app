import { Card, CardContent } from "@/Components/ui/card";
import type { Todo } from "../App";
import { Button } from "@/Components/ui/button";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Card className={`flex items-center justify-between p-4 ${todo.done ? 'opacity-50' : ''}`}>
      <CardContent className="flex-1 px-0">
        <span
          onClick={() => onToggle(todo.id)}
          className={`cursor-pointer ${todo.done ? "line-through text-gray-500" : ""}`}
        >
          {todo.text}
        </span>
      </CardContent>
      <Button variant="destructive" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </Card>
  );
}

export default TodoItem;