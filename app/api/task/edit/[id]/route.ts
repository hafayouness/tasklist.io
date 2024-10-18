import Task from "@models/tasks";
import { connectToDB } from "@utile/database";
import { NextResponse } from "next/server";
import { IDeleteTaskRequestParam } from "@types";

export const PATCH = async (
  request: Request,
  { params }: IDeleteTaskRequestParam
) => {
  try {
    const { task } = await request.json();
    await connectToDB();

    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      { task: task },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    console.error("Error updating task:", err);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
};
