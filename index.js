import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import users from "./routes/users.js";
import auth from "./routes/auth.js";
import groups from "./routes/groups.js";
import ai from "./routes/ai.js";

import cors from "cors";

const app = express();

// Load cấu hình từ .env
const port = process.env.PORT || 8000;
const api_url = process.env.API_URL || "/api";
const mongodb_url = process.env.MONGODB_URL;

// Middleware
app.use(cors({ origin: '*' })); // hoặc giới hạn origin cho an toàn
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.set("strictQuery", true);
mongoose.connect(mongodb_url)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect MongoDB:", err));

// Route mặc định (check server hoạt động)
app.get("/", (req, res) => {
  res.send("Hello from Express server");
});

// Các route API chính
app.use(`${api_url}/users`, users);
app.use(`${api_url}/auth`, auth);
app.use(`${api_url}/groups`, groups);
app.use(`${api_url}/ai`, ai);

// Lắng nghe server (không truyền HOST → phù hợp cloud)
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}${api_url}`);
});
