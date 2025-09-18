import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { userModel } from "./Model/Schema.js";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGOOSe_URI = `mongodb+srv://admin:admin123@cluster0.s66lzlj.mongodb.net/`;

mongoose
  .connect(MONGOOSe_URI)
  .then((res) => {
    console.log("mongodb Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

//SIGNUP
app.post("/api/signup", async (req, res) => {
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
});

//LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const getData = await userModel.findOne({ email });

    console.log(getData);

    if (!getData) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, getData.password);

    console.log(comparePassword);

    if (!comparePassword) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    res.json({
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is now running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server is now Running...`);
});
