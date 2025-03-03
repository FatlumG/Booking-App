import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1", routes);

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
