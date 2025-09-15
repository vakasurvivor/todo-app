// ./src/app/api/tasks/route.ts

import { NextRequest, NextResponse } from "next/server";
import { addTask, getAllTasks } from "@/libs/tasks";
import { taskSchema } from "@/utils/schemas";
import handleError from "@/utils/handleError";
import zValidate from "@/utils/zValidate";

// 疎通確認
export async function HEAD() {
  try {
    await getAllTasks();
    return new Response(null, { status: 200 });
  } catch (err) {
    handleError(err);
  }
}

// CREATE:[新規作成]
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updates = zValidate(taskSchema.pick({ text: true }), body);

    const newTaskId = await addTask(updates.text);
    return NextResponse.json(newTaskId, { status: 201 });
  } catch (err) {
    handleError(err);
  }
}

// READ:[全件取得]
export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks, { status: 200 });
  } catch (err) {
    handleError(err);
  }
}
