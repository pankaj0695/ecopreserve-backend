import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //valadiation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "password is Required" });
    }

    //existing user:
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "User already exists. Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Regestration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function handleConflictChat(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });
    const updatedPrompt = `You are an AI expert in conflict resolution, specializing in providing practical and balanced solutions. Your goal is to help individuals navigate disputes peacefully and effectively through clear, constructive, and fair advice. Keep your responses concise, focusing on understanding different perspectives and promoting resolution within a maximum of 100 words. Answer this: ${prompt}`;
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro-002",
    });
    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: updatedPrompt }],
        },
      ],
    });

    res.json({
      response: result.response.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("Error handling conflict chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleCommunityChat(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });
    const updatedPrompt = `You are an AI expert in community service, dedicated to providing inspiring and practical advice. Your goal is to guide individuals in making a positive impact on their communities through thoughtful and actionable responses. Keep your answers concise, clear, and within a maximum of 100 words. Answer this: ${prompt}`;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro-002",
    });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: updatedPrompt }],
        },
      ],
    });

    res.json({
      response: result.response.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("Error handling community chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
