import { TasksProvider } from "./TasksContext";
import TaskAddFrom from "./TaskAddFrom";
import TaskList from "./TaskList";
import SelectedDatabaseName from "./SelectedDatabaseName";

export default function Main() {
  return (
    <TasksProvider>
      <main className="grid place-items-center px-4 mt-12 mb-12">
        <div className="w-[min(100%,_500px)]">
          <SelectedDatabaseName />
          <TaskAddFrom />
          <TaskList />
        </div>
      </main>
    </TasksProvider>
  );
}
