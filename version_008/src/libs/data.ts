// src/lib/tasks.ts

import { createClient } from "@/utils/supabase/client";
import { toCamelCaseKeys } from "es-toolkit";
import { PostgrestError } from "@supabase/supabase-js";
import { DatabaseError } from "@/utils/errors";

const supabase = createClient();

export async function getAllTasks() {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase API:", error);
      throw error;
    }

    return toCamelCaseKeys(data);
  } catch (e) {
    if (e instanceof PostgrestError) {
      throw new DatabaseError("タスクの全件取得に失敗しました。", {
        cause: e,
      });
    }

    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: e,
    });
  }
}

export async function addTask(text: string) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ text: text }])
      .select()
      .single();

    if (error) {
      console.error("Supabase API:", error);
      throw error;
    }

    return toCamelCaseKeys(data);
  } catch (e) {
    if (e instanceof PostgrestError) {
      throw new DatabaseError("タスクの追加に失敗しました。", {
        cause: e,
      });
    }

    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: e,
    });
  }
}

export async function updateTask(
  id: number,
  updates: { text?: string; isCompleted?: boolean }
) {
  try {
    const { text, isCompleted } = updates;

    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...(text !== undefined && { text }),
        ...(isCompleted !== undefined && { is_completed: isCompleted }),
        updated_at: new Date(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase API:", error);
      throw error;
    }

    return Boolean(data);
  } catch (e) {
    if (isPostgrestError(e)) {
      throw new DatabaseError("変更に失敗しました。", {
        cause: e,
      });
    }

    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: e,
    });
  }
}

export async function deleteTask(id: number) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase API:", error);
      throw error;
    }

    return Boolean(data);
  } catch (e) {
    if (isPostgrestError(e)) {
      throw new DatabaseError("削除に失敗しました。", {
        cause: e,
      });
    }

    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: e,
    });
  }
}

function isPostgrestError(err: unknown): err is PostgrestError {
  return (
    typeof err === "object" && err !== null && "message" in err && "code" in err
  );
}
