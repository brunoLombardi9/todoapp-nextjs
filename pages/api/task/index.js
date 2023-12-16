import connect from "@/database/connect";
import taskModel from "@/database/models/taskModel";
import userModel from "@/database/models/userModel";
import cookie from "cookie";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await connect();
      const { taskId } = req.query;
      const cookies = cookie.parse(req.headers.cookie || null);
      const token = cookies.token || null;
      const tokenUser = jwt.verify(token, process.env.JWTKEY);
      const user = await userModel.findById(tokenUser.userId);
      const task = await taskModel.findById(taskId);

      if (task.userId.equals(user._id)) {
        await task.deleteOne();
        res.status(200).json({ message: "Tarea eliminada" });
      } else {
        res.status(409).json({
          message: "El usuario no está autorizado a borrar esta tarea.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
