import { createContext, useContext } from "react";

export const TasksContext = createContext(null);

export function useTasksContext() {
  return useContext(TasksContext);
}
