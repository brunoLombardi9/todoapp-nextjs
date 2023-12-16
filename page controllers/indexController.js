import jwt from "jsonwebtoken";
import taskModel from "../database/models/taskModel";
import cookie from "cookie";
import connect from "../database/connect";
import redirectionObj from "@/utils/redirectionObj";

async function indexController(req, res) {
  const cookies = cookie.parse(req.headers.cookie || null);
  const token = cookies.token || null;

  if (token) {
    try {
      await connect();
      const userData = jwt.verify(token, process.env.JWTKEY);
      const tasks = await taskModel.find({ userId: userData.userId });
      const serializedUserTasks = tasks.map((task) => ({
        taskId: task._id.toString(),
        userId: task.userId.toString(),
        title: task.title,
        date: task.date,
        content: task.content,
      }));
      return {
        props: {
          userId: userData.userId.toString(),
          userTasks: serializedUserTasks,
        },
      };
    } catch (error) {
      console.log(error);
      return redirectionObj;
    }
  }

  if (!token) {
    return redirectionObj;
  }
}

export default indexController;
