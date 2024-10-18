import Task from "@models/tasks";
import { connectToDB } from "@utile/database";
import { NextResponse } from "next/server";
import { IDeleteTaskRequestParam } from "@types";

export const DELETE = async (
  request: Request,
  { params }: IDeleteTaskRequestParam
) => {
  try {
    const { id } = params;

    console.log("Received Task ID:", id);

    if (!id || id.length !== 24) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    await connectToDB();

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: "Error deleting task" },
      { status: 500 }
    );
  }
};
