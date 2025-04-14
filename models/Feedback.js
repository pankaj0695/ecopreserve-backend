
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  overallExperience: {
    type: String,
    enum: ['Excellent', 'Good', 'Poor'],
  },
  conflictResolution: {
    type: String,
    enum: ['Effective', 'Neutral', 'Ineffective'],
  },
  informationQuality: {
    type: String,
    enum: ['Excellent', 'Good', 'Poor'],
  },
  communityService: {
    type: String,
    enum: ['Effective', 'Neutral', 'Ineffective'],
  },
  suggestions: {
    type: String
  },
  additionalComments: {
    type: String
  }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
