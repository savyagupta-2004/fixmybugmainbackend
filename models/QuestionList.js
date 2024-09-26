import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false
  },
  problem: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  practice: {
    type: String, // URL or link to the practice problem
    required: true
  },
  add: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  flag: {
    type: Boolean,
    default: false
  }
});

const stepSchema = new mongoose.Schema({
  stepTitle: {
    type: String,
    required: true
  },
  problems: [problemSchema]
});

const dsaSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true
  },
  steps: [stepSchema]
});

const QuestionList = mongoose.model('QuestionList', dsaSchema);

export default QuestionList;
