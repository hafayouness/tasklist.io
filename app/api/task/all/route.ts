import Task from "@models/tasks";
import { connectToDB } from "@utile/database";

import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectToDB();
    const tasks = await Task.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("failed to fetch all tasks", { status: 500 });
  }
};
