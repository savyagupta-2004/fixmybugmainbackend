import mongoose from "mongoose";

// type(student, admin, mentor), name, mobile number, email, college, Year of graduation, Programme enrolled(MCA, BCA, BTech, MTech, Other)

const Bugfixer_full = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    resumeUrl: {
      type: String,
      // required: true, // If you want it to be mandatory
    },

    emailverificationOtp: String,

    // New fields
  },
  {
    timestamps: true,
  }
);

const Bugfixer_f = mongoose.model("Bugfixer_full", Bugfixer_full);
export default Bugfixer_f;
