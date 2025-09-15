// src/lib/tasks.ts

import prisma from "./prisma";
import { DatabaseError } from "@/utils/errors";

export async function getAllTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });

    return tasks.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt ? t.updatedAt.toISOString() : null,
    }));
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの全件取得に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function addTask(text: string) {
  try {
    const newTask = await prisma.task.create({
      data: { text },
    });
    return {
      ...newTask,
      createdAt: newTask.createdAt.toISOString(),
      updatedAt: newTask.updatedAt ? newTask.updatedAt.toISOString() : null,
    };
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの新規作成に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function updateTask(
  id: number,
  updates: { text?: string; isCompleted?: boolean }
) {
  try {
    const result = await prisma.task.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    });
    return Boolean(result);
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの更新に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function deleteTask(id: number) {
  try {
    const result = await prisma.task.delete({ where: { id } });
    return Boolean(result);
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの削除に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベースの操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

function isPrismaError(err: unknown) {
  return (
    err instanceof Error &&
    typeof err.name === "string" &&
    err.name.startsWith("PrismaClient")
  );
}
