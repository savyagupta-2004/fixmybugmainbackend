import mongoose from "mongoose";

// Topic, Image, Title, Description, Rating and Educator Necessary for Course Card
// C_Objectives will have multiple strings

export const CourseSchema = mongoose.Schema({
    C_id: {
        type: String,
        required: true,
    },
    C_image: {
        type: String,
        required: true,
    },
    C_Topic: {
        type: String,
        required: true,
    },
    C_title: {
        type: String,
        required: true,
    },
    C_description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
    },
    Rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 2.5
    },
    Educator_Names: {
        type: [String],
        required: true,
    },
    Educator_Note: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300,
    },
    Reviews: {
        type: [String],
        default: [],
    },
    C_Objectives: {
        type: [String],
        required: true,
    },
    Duration: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    CompletionPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    Numberoflectures: {
        type: Number,
        default: 0,
    },
    Numberofassignments:{
        type:Number,
        default:0,
    },
    Numberofmodules:{
        type:Number,
        default:0
    }
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
