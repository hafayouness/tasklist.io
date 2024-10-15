import { Schema, model, models } from "mongoose";
import { Itask } from "@types";

const taskSchema = new Schema<Itask>({
  task: {
    type: String,
    require: [true, "  Task is required."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = models.task || model<Itask>("Task", taskSchema);
export default Task;
