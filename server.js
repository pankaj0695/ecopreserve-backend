import express from "express";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import connectDB from "./config/db.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const app = express();
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

app.use(cors());
app.use(express.json()); // Middleware for JSON body parsing

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});

// async function listModels() {
//     const apiKey ='AIzaSyDZ9NdLMJylt24chBWx6SZSI6TtHQdCtaQ'; // Replace with your actual API key
//     const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log("Available Models:", data);
//     } catch (error) {
//         console.error("Error listing models:", error);
//     }
// }

// listModels();
app.use("/auth", authRoutes); // Mounting auth routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
