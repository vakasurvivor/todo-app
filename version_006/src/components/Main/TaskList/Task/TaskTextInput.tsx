import { fetchUpdateTask } from "@/utils/db-feach";
import { useState, useEffect, useRef } from "react";
import { useTasksContext } from "@/components/Main/TasksContext";
import { cn } from "@/utils/cn";

type TaskTextInputProps = {
  id: number;
  isEditing: boolean;
  originalText: string;
};

export default function TaskTextInput({
  id,
  isEditing,
  originalText,
}: TaskTextInputProps) {
  const [editedText, setEditedText] = useState(originalText);
  const { setTasks } = useTasksContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (editedText && editedText !== originalText) {
        await fetchUpdateTask(id, { text: editedText });

        savedRef.current = true;
        (e.target as HTMLInputElement).blur();

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, isEditing: false, text: editedText }
              : task
          )
        );

        return;
      }

      (e.target as HTMLInputElement).blur();
    }

    if (e.key === "Escape") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isEditing: false } : task
        )
      );

      setEditedText(originalText);
      savedRef.current = false;
    }
  }

  function handleBlur() {
    if (!savedRef.current) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isEditing: false } : task
        )
      );
      setEditedText(originalText);
    }
    savedRef.current = false;
  }

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          name="task-text"
          className={cn(
            "grow p-2 rounded-sm shadow-sm outline-2 outline-transparent",
            "transition-[outline,box-shadow] duration-100 ease-out",
            "focus:outline-black/20"
          )}
          maxLength={50}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <span className="grow p-2">{editedText}</span>
      )}
    </>
  );
}
