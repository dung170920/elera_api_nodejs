import router from "./routes";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectDB } from "./db/connection";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api", router());

connectDB(process.env.MONGO_URL || "");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
