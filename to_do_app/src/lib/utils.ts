// src/lib/utils.ts
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export interface Todo {
  id: number;
  text: string;
  done: boolean; // Keep for compatibility
  due: Date;
  alarmMinutes: number;
  status: "pending" | "done" | "could_not_complete";
}