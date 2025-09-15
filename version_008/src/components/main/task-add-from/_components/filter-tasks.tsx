import { useTasksContext } from "@/components/main/tasks-context";
import { Square, SquareCheckBig } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FilterTasks() {
  const { filter, setFilter } = useTasksContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const filterParams = searchParams.get("filter");
    const initialFilter =
      filterParams === "completed" || filterParams === "incomplete"
        ? filterParams
        : null;
    setFilter(initialFilter);
  }, [searchParams, setFilter]);

  function handleFilterChange(value: string | undefined) {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value === "completed" || value === "incomplete") {
      setFilter(value);
      newSearchParams.set("filter", value);
    } else {
      setFilter(null);
      newSearchParams.delete("filter");
    }
    router.replace(`?${newSearchParams.toString()}`);
  }

  return (
    <ToggleGroup
      className="h-6.5 min-w-6.5 rounded-sm"
      variant="outline"
      type="single"
      value={filter ?? ""}
      onValueChange={(value) => handleFilterChange(value)}
    >
      <ToggleGroupItem
        className="h-6.5 p-1 first:rounded-l-sm gap-1"
        value="incomplete"
        aria-label="未完了のタスクを表示する"
      >
        <Square className="h-4 w-4" strokeWidth={1.5} />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-6.5 min-w-6.5 p-1 last:rounded-r-sm gap-1"
        value="completed"
        aria-label="完了したタスクを表示する"
      >
        <SquareCheckBig className="h-4 w-4" strokeWidth={1.5} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
