import connect from "@/database/connect";
import userModel from "@/database/models/userModel";
import { compareData } from "@/utils/hash";
import jwt from "jsonwebtoken";
import cookie from "cookie";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connect();
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      const dehashedPassword = await compareData(password, user?.password);

      if (!user || !dehashedPassword) {
        return res
          .status(409)
          .json({ error: "El email o la contraseña son incorrectos." });
      }

      const userData = {
        userId: user._id,
        email,
      };

      const token = jwt.sign(userData, process.env.JWTKEY);
      // console.log(token);

      res
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 60 * 60 * 24 * 7, // 7 días de duración, ajusta según tus necesidades
            path: "/", // Asegúrate de incluir la propiedad path
          })
        )
        .status(200)
        .json(userData);
    } catch (err) {
      res.status(500).json({ error: "El email ingresado no existe." });
    }
  }
}

export default handler;
