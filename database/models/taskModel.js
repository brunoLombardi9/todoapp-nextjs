import { Schema, model , models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

taskSchema.plugin(mongoosePaginate);

const taskModel = models.tasks || model("tasks", taskSchema);

export default taskModel;
