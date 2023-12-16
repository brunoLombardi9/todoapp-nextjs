import connect from "@/database/connect";
import taskModel from "@/database/models/taskModel";

async function handler(req, res) {
  if (req.method === "GET") {
    await connect();
    try {
      const { userId } = req.query;
      const tasks = await taskModel.find({ userId });
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
