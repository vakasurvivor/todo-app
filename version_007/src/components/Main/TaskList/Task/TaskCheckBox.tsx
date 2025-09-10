import { fetchUpdateTask } from "@/utils/db-feach";
import { useState } from "react";
import { cn } from "@/utils/cn";

type TaskCheckboxProps = {
  id: number;
  isCompleted: boolean;
};

export default function TaskCheckbox({ id, isCompleted }: TaskCheckboxProps) {
  const [done, setDone] = useState(isCompleted);

  async function handleChange() {
    await fetchUpdateTask(id, { isCompleted: !done });
    setDone(!done);
  }

  return (
    <label
      className={cn(
        "grid w-fit",
        "[&:has(input:checked)+span]:transition-[text-decoration]",
        "[&:has(input:checked)+span]:[text-decoration:line-through_1.3px_var(--color-gray-950)]"
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
      />
    </label>
  );
}
