import bcrypt from "bcryptjs";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { connectDB } from "./Database/db.js";
import router from "./Routers/route.js";
import express from 'express';

const app = express()

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
connectDB();

// call Routes 

app.use("/api",router)

app.listen(PORT, () => {
  console.log(`Server is now running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server is now Running...`);
});
