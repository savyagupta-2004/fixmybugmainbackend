import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  mentorBio: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  certification: {
    type: String,
    required: true
  },
  totalCourses: {
    type: Number,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  },
  ratingsCount: {
    type: Number,
    required: true
  },
  experiences: {
    type: String,
    required: true
  },
  graduated: {
    type: Boolean,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  profilePictureUrl: {
    type: String, // URL for mentor's profile picture
    required: true
  }
});

export const Mentor = mongoose.model('Mentor', mentorSchema);

