import { TasksProvider } from "./TasksContext";
import TaskAddFrom from "./TaskAddFrom";
import TaskList from "./TaskList";
import SelectedDatabaseName from "./SelectedDatabaseName";
import { getAllTasks } from "@/libs/data";
import { cn } from "@/utils/cn";

export default async function Main() {
  const initialTasks = await getAllTasks();
  return (
    <TasksProvider initialTasks={initialTasks}>
      <main className="grid place-items-center px-4 mb-12 relative">
        <div className="w-[min(100%,_500px)]">
          <div
            className={cn(
              "bg-white z-10 pt-12 pb-12 sticky top-16",
              "before:content-[''] before:absolute before:z-0 before:bottom-0 before:translate-y-full",
              "before:h-8 before:w-full before:border-t before:border-gray-200 ",
              "before:bg-gradient-to-b before:from-white before:to-transparent"
            )}
          >
            <SelectedDatabaseName />
            <TaskAddFrom />
          </div>
          <TaskList className="pt-6" />
        </div>
      </main>
    </TasksProvider>
  );
}
