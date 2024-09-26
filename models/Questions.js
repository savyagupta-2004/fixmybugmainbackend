import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionId: {
        type: Number,
        unique: true,
        required: true
    },
    Number: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"],
    },
    Solution: {
        type: String,
        required: true
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
