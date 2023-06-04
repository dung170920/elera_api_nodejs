import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import { swaggerDocs, connectDB } from "./utils";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/", router());

connectDB(process.env.MONGO_URL || "");

const port = process.env.PORT || 5000;

swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
