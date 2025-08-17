import { fetchUpdateTask } from "@/api/tasks";
import { useState, useEffect, useRef } from "react";
import { useTasksContext } from "@/components/Main/TasksContext";

export default function TaskTextInput({ id, isEditing, originalText }) {
  const [editedText, setEditedText] = useState(originalText);
  const { setTasks } = useTasksContext();
  const inputRef = useRef(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (editedText && editedText !== originalText) {
        await fetchUpdateTask(id, { text: editedText });

        savedRef.current = true;
        e.target.blur();

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, isEditing: false, text: editedText }
              : task
          )
        );

        return;
      }

      e.target.blur();
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
          className="task-text shadow-sm"
          maxLength="50"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <span className="task-text">{editedText}</span>
      )}
    </>
  );
}
