import mongoose from "mongoose";

// type(student, admin, mentor), name, mobile number, email, college, Year of graduation, Programme enrolled(MCA, BCA, BTech, MTech, Other)

const UserSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
    },
    emailverificationOtp: String,

    // New fields
    repoUrl: {
      type: String,
      // required: true, // If you want it to be mandatory
    },
    bugDescription: {
      type: String,
      // required: true, // If you want it to be mandatory
    },
    branchName: {
      type: String,
      // required: true, // If you want it to be mandatory
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
