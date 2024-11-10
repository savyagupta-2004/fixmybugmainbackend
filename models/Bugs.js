import mongoose from "mongoose";

// type(student, admin, mentor), name, mobile number, email, college, Year of graduation, Programme enrolled(MCA, BCA, BTech, MTech, Other)

const Bugfixer_part = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
      min: 2,
      max: 35,
    },
    description: {
      type: String,
      // required: true,
      max: 60,
      // unique: true,
    },
    postedBy: {
      type: String,
      //   required: true,
      minlength: 5,
    },
    bountyStatus: {
      type: String,
      //   required: true,
      minlength: 5,
    },
    category: {
      type: String,
      //   required: true,
      minlength: 5,
    },
    postedDate: {
      type: Date,
    },
    bountyAmount: {
      type: Number,
    },

    emailverificationOtp: String,

    // New fields
  },
  {
    timestamps: true,
  }
);

const Bugfixer_p = mongoose.model("Bugfixer_part", Bugfixer_part);
export default Bugfixer_p;
