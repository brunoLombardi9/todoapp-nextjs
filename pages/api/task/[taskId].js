import connect from "@/database/connect";
import taskModel from "@/database/models/taskModel";

async function handler(req, res) {
  const { taskId } = req.query;
console.log(taskId)
  if (req.method === "GET") {
    try {
      await connect();
      const task = await taskModel.findById(taskId);
      console.log(task);
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  } else if (req.method === "PUT") {
    try {
      await connect();
      const { title, date, content } = req.body;
      const task = await taskModel.findById(taskId);
      task.title = title;
      task.date = date;
      task.content = content;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
}

export default handler;
