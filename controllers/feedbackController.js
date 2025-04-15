import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully",
      data: savedFeedback,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating feedback", error: error.message });
  }
};
