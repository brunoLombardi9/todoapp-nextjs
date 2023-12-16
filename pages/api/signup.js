import connect from "@/database/connect";
import userModel from "@/database/models/userModel";
import { hashData } from "@/utils/hash";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connect();
      const { email, password } = req.body;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res.status(409).json({ error: "El email ingresado ya existe." });
      }

      const hashedPassword = await hashData(password);
      const newUser = await userModel.create({
        email,
        password: hashedPassword,
      });
      const userData = {
        userId: newUser._id,
        email,
      };

      const token = jwt.sign(userData, process.env.JWTKEY);

      res.setHeader("Set-Cookie", cookie.serialize("token", token));

      console.log(token);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default handler;
