import bcrypt from "bcryptjs";
import "dotenv/config";
import { userModel } from "../Model/Schema.js";

export const SignupController = async (req,res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({
          message: "Required field are missing!",
          status: false,
        });
        return;
      }

      const encryptpass = await bcrypt.hash(password, 6);

      const userObj = {
        firstName,
        lastName,
        email,
        password: encryptpass,
      };
      const saveData = await userModel.create(userObj);
      res.status(200).json({
        message: "User Created.",
        // saveData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error!",
        status: false,
      });
    }
};
