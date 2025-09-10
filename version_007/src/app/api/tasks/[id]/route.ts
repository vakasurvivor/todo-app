// ./src/app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getTask, updateTask, deleteTask } from "@/libs/tasks";
import { idSchema, taskSchema } from "@/utils/schemas";
import { NotFoundError } from "@/utils/errors";
import handleError from "@/utils/handleError";
import zValidate from "@/utils/zValidate";

// READ:[一件取得]
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = zValidate(idSchema, resolvedParams);
    const task = await getTask(id);
    if (!task) throw new NotFoundError(`タスク id:${id} が見つかりません。`);
    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

// UPDATE:[更新]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = zValidate(idSchema, resolvedParams);
    const body = await req.json();
    const updates = zValidate(taskSchema.partial(), body);

    const success = await updateTask(id, updates);
    if (!success) throw new NotFoundError(`タスク id:${id} が見つかりません。`);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}

// DELETE:[削除]
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = zValidate(idSchema, resolvedParams);

    const success = await deleteTask(id);
    if (!success) throw new NotFoundError(`タスク id:${id} が見つかりません。`);

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}
