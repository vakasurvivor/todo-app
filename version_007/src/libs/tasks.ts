// src/lib/tasks.ts
import { DatabaseError } from "@/utils/errors";
import prisma from "./prisma";

function isPrismaError(err: unknown) {
  return (
    err instanceof Error &&
    typeof err.name === "string" &&
    err.name.startsWith("PrismaClient")
  );
}

export async function getTask(id: number) {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return null;
    return task;
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの取得に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function getAllTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "asc" },
    });
    return tasks;
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの全件取得に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function addTask(text: string) {
  try {
    const task = await prisma.task.create({
      data: { text },
    });
    return { id: task.id };
  } catch (err) {
    if (isPrismaError(err)) {
      throw new DatabaseError("タスクの新規作成に失敗しました。", {
        cause: err,
      });
    }
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}

export async function updateTask(
  id: number,
  updates: Partial<{ text: string }>
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
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
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
    throw new DatabaseError("データベース操作中に例外が発生しました。", {
      cause: err,
    });
  }
}
