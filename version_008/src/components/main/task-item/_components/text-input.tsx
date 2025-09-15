import { useState, useEffect, useRef, useTransition } from "react";
import { useTasksContext } from "@/components/main/tasks-context";
import { cn } from "@/utils/cn";
import { actionUpdateTask } from "@/libs/actions";
import { toast } from "sonner";

type TaskTextInputProps = {
  id: number;
  isEditing: boolean;
  originalText: string;
};

export default function TextInput({
  id,
  isEditing,
  originalText,
}: TaskTextInputProps) {
  const { setTasks } = useTasksContext();
  const [editedText, setEditedText] = useState(originalText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const savedRef = useRef(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (textareaRef.current) {
      // 入力内容に応じて高さを変更
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";

      // キャレットを末尾に移動する
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);

      if (isEditing) {
        textareaRef.current.focus();
      }
    }
  }, [editedText, isEditing]);

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); //改行を防ぐ

      if (editedText && editedText !== originalText) {
        startTransition(async () => {
          try {
            const res = await actionUpdateTask(id, { text: editedText });
            if (!res.success && "error" in res) {
              toast.error(res.error.message);
            } else if (!res.success) {
              toast.error("タスクの変更に失敗しました。");
            }

            startTransition(() => {
              savedRef.current = true;
              setTasks((prev) =>
                prev.map((task) =>
                  task.id === id
                    ? { ...task, isEditing: false, text: editedText }
                    : task
                )
              );
            });
          } catch {
            toast.error("タスクの変更に失敗しました。");
          }
        });
      }

      (e.target as HTMLTextAreaElement).blur();
    }

    if (e.key === "Escape") {
      savedRef.current = false;
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isEditing: false } : task
        )
      );
      setEditedText(originalText);
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
        <textarea
          ref={textareaRef}
          name="task-text"
          className={cn(
            "resize-none grow w-full p-2 rounded-sm shadow-sm outline-2 outline-transparent",
            "transition-[outline,box-shadow] duration-100 ease-out focus:outline-ring"
          )}
          maxLength={50}
          rows={1}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isPending}
        />
      ) : (
        <span className="grow p-2 break-all">{editedText}</span>
      )}
    </>
  );
}
