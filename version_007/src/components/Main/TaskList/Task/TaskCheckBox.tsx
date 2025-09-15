import { useState, useTransition } from "react";
import { cn } from "@/utils/cn";
import { actionUpdateTask } from "@/libs/actions";

type TaskCheckboxProps = {
  id: number;
  isCompleted: boolean;
};

export default function TaskCheckbox({ id, isCompleted }: TaskCheckboxProps) {
  const [done, setDone] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();

  async function handleChange() {
    startTransition(async () => {
      const res = await actionUpdateTask(id, { isCompleted: !done });
      if (!res?.success) return;

      startTransition(() => {
        setDone(!done);
      });
    });
  }

  return (
    <label
      className={cn(
        "grid w-fit",
        "[&:has(input:checked)+span]:text-gray-600",
        "[&:has(input:checked)+span]:transition-[text-decoration]",
        "[&:has(input:checked)+span]:[text-decoration:line-through_1.3px_var(--color-gray-600)]"
      )}
    >
      <input
        className={cn(
          "relative cursor-pointer appearance-none ",
          "size-[22px] bg-white border border-black/15 rounded-xs transition-colors",
          "hover:bg-gray-100 hover:border-black/40",
          "before:content-[''] before:absolute before:block before:size-full before:inset-0 before:bg-gray-950",
          "before:opacity-0 before:transition-opacity before:ease-out",
          "before:mask-[url(/img/check.svg)] before:mask-no-repeat before:mask-contain",
          "checked:before:opacity-100 checked:before:transition-opacity ease-out"
        )}
        name="task-completed"
        type="checkbox"
        checked={done}
        onChange={handleChange}
        disabled={isPending}
      />
    </label>
  );
}
