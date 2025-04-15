import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    overallExperience: {
      type: String,
    },
    conflictResolution: {
      type: String,
    },
    informationQuality: {
      type: String,
    },
    communityService: {
      type: String,
    },
    suggestions: {
      type: String,
    },
    additionalComments: {
      type: String,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
