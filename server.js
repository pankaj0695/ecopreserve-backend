import express from "express";
import authRoutes from "./routes/authRoute.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const app = express();
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";


app.use(express.json()); // Middleware for JSON body parsing

app.get("/", (req, res) => {
    res.send("Hello, Express with ES Modules!");
});

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};


connectDB(); // Connect to MongoDB
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
app.use("/feedback", feedbackRoutes); // Mounting feedback routes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
