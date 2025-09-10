"use client";

import { actionAddTask } from "@/libs/actions";
import { useActionState, useEffect } from "react";
import { useTasksContext } from "@/components/main/tasks-context";
import { toast } from "sonner";
import { ArrowDownWideNarrow, Square, SquareCheckBig } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { initialTask, Task } from "@/libs/types";
import { cn } from "@/utils/cn";

export default function TaskAddFrom({ className }: { className?: string }) {
  const { setTasks } = useTasksContext();
  const [result, formAction, isPending] = useActionState(actionAddTask, null);

  useEffect(() => {
    if (!result || !result?.success || !("data" in result)) {
      toast.success(result?.error.message);
      return;
    }

    const newTask: Task = {
      ...(result.data as initialTask),
      isAdding: true,
      isEditing: false,
      isDeleting: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }, [result, setTasks]);

  return (
    <section className={cn(className)}>
      <SelectedDatabase />
      <form
        className={cn("relative w-full")}
        action={formAction}
        onSubmit={(e) => {
          const inputEl = e.currentTarget.elements.namedItem(
            "text"
          ) as HTMLInputElement;

          if (!inputEl.value.trim()) {
            e.preventDefault();
            inputEl.focus();
            inputEl.setSelectionRange(0, 0);
            return;
          }
        }}
      >
        <input
          className={cn(
            "w-full p-2 bg-white rounded-sm",
            "border border-black/10 outline-2 outline-transparent transition-[border,_outline]",
            "focus:outline-black/20 focus:border-transparent"
          )}
          maxLength={50}
          placeholder="🚀 新しいタスクを作成する"
          name="text"
          type="text"
          disabled={isPending}
        />
        <button
          className={
            "absolute top-1/2 right-4 -translate-y-1/2 size-6 p-1 rounded-sm bg-blue-100 hover:bg-blue-200"
          }
          type="submit"
          aria-label="タスクを追加する"
        >
          <Image height="24" width="24" src="img/plus.svg" alt="" />
        </button>
      </form>
      <Filter />
    </section>
  );
}

function SelectedDatabase() {
  return (
    <div className="opacity-50 w-fit flex items-center gap-1.5 ml-auto text-xs mb-2">
      <Image
        width="18"
        height="18"
        src="img/database.svg"
        alt=""
        aria-hidden="true"
      />
      <span>Supabase</span>
    </div>
  );
}

function Filter() {
  return (
    <div className="flex justify-end items-center gap-x-2 pt-5 pb-5">
      <FilterTasks />
      <SortOrderTasks />
    </div>
  );
}

function FilterTasks() {
  const { filter, setFilter } = useTasksContext();
  const searchParams = useSearchParams();
  const router = useRouter();

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
        <Square className="h-4 w-4" strokeWidth={1.25} />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="h-6.5 min-w-6.5 p-1 last:rounded-r-sm gap-1"
        value="completed"
        aria-label="完了したタスクを表示する"
      >
        <SquareCheckBig className="h-4 w-4" strokeWidth={1.25} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function SortOrderTasks() {
  const { sortOrder, setSortOrder } = useTasksContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSortChange(pressed: boolean) {
    setSortOrder(pressed ? "desc" : "asc");
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (pressed) {
      newSearchParams.set("sort", "desc");
    } else {
      newSearchParams.delete("sort");
    }

    router.replace(`?${newSearchParams.toString()}`);
  }

  return (
    <Toggle
      className="h-6.5 min-w-6.5 p-1 rounded-sm gap-1.5"
      aria-label="作成日で並び替える"
      variant="outline"
      pressed={sortOrder === "desc"}
      onPressedChange={(pressed) => handleSortChange(pressed)}
    >
      <ArrowDownWideNarrow className="h-4 w-4" strokeWidth={1.5} />
    </Toggle>
  );
}
