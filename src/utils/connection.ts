import mongoose from "mongoose";

export const connectDB = (url: string) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => console.log(`Connection error: ${error.message}`));
};
