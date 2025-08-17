import { fetchGetAllTasks } from "@/api/tasks";
import { useState, useEffect } from "react";
import { TasksContext } from "./TasksContext";
import TaskAddFrom from "./TaskAddFrom";
import TaskList from "./TaskList";
import SelectedDatabase from "./SelectedDatabase";

export default function Main() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const res = await fetchGetAllTasks();
      const tasks = res.map((t) => ({
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
      <main>
        <SelectedDatabase />
        <TaskAddFrom />
        <TaskList />
      </main>
    </TasksContext>
  );
}
