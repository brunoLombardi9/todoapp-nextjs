import connect from "@/database/connect";
import taskModel from "@/database/models/taskModel";

async function handler(req, res) {
  if (req.method === "POST") {
    await connect();
    try {
      const taskData = req.body;
      const tasks = await taskModel.create(taskData);
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
