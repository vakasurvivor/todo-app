"use client";

import { fetchGetAllTasks } from "@/utils/db-feach";
import { createContext, useContext, useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string | null;
  isCompleted: boolean;
  isAdding: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isMovingUp: boolean;
};

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (context === null) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
}

type TasksProviderProps = {
  children: React.ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function getTasks() {
      const res = await fetchGetAllTasks();
      const tasks = res.map((t: any) => ({
        ...t,
        isAdding: false,
        isEditing: false,
        isDeleting: false,
        isMovingUp: false,
      }));
      setTasks(tasks);
    }
    getTasks();
  }, []);

  return (
    <TasksContext
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext>
  );
}
