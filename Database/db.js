import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGOOSE_URI = process.env.MONGOOSE_URI;
    await mongoose
      .connect(MONGOOSE_URI)
      .then((res) => {
        console.log("mongodb Connected.");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
