"use server";

import { addTask, updateTask, deleteTask } from "@/libs/data";
import { taskSchema } from "@/utils/schemas";
import actionHandleError from "@/utils/actionHandleError";
import zodHandleError from "@/utils/zodHandleError";
import { initialTask } from "./types";

type ActionResult =
  | { success: boolean; data?: initialTask }
  | {
      success: boolean;
      error: { name: string; message: string; details?: unknown };
    };

// 追加（CREATE）
export async function actionAddTask(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const { text } = zodHandleError(
      taskSchema.pick({ text: true }).safeParse({
        text: formData.get("text"),
      })
    );

    const newTask = await addTask(text);
    return { success: true, data: newTask };
  } catch (err) {
    return actionHandleError(err);
  }
}

// 更新（UPDATE）
export async function actionUpdateTask(
  id: number,
  updates: { text?: string; isCompleted?: boolean }
): Promise<ActionResult> {
  try {
    const { id: parsedId, ...parsedUpdates } = zodHandleError(
      taskSchema
        .partial({
          text: true,
          isCompleted: true,
        })
        .safeParse({
          id,
          ...updates,
        })
    );

    const success = await updateTask(parsedId, parsedUpdates);
    return { success };
  } catch (err) {
    return actionHandleError(err);
  }
}

// 削除（DELETE）
export async function actionDeleteTask(id: number): Promise<ActionResult> {
  try {
    const result = zodHandleError(
      taskSchema.pick({ id: true }).safeParse({ id })
    );

    const success = await deleteTask(result.id);
    return { success };
  } catch (err) {
    return actionHandleError(err);
  }
}
