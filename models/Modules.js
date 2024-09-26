import mongoose from "mongoose";

/*
Sample req.

POST /admin/setModules

{
  "moduleName": "Module 1",
  "chapters": [
    {
      "chapterNumber": 1,
      "chapterName": "Recursion",
      "videos": [
        { 
          "videoTitle": "Recursion Tower of Hanoi", 
          "videoUrl": "https://example.com/video1",
          "releaseTimeDays": 2
        },
        { 
          "videoTitle": "Recursion Tower of Hanoi Part2", 
          "videoUrl": "https://example.com/video2",
          "releaseTimeDays": 3
        }
      ]
    },
    {
      "chapterNumber": 2,
      "chapterName": "Stacks",
      "videos": [
        { 
          "videoTitle": "Stacks with Linked List", 
          "videoUrl": "https://example.com/video3",
          "releaseTimeDays": 4
        },
        { 
          "videoTitle": "Stacks with Arrays", 
          "videoUrl": "https://example.com/video4",
          "releaseTimeDays": 5
        }
      ]
    }
  ]
}



*/


const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
    trim: true,
  },
  chapters: [
    {
      chapterNumber: {
        type: Number,
        required: true,
        min: 1,
      },
      chapterName: {
        type: String,
        required: true,
        trim: true,
      },
      videos: [
        {
          videoTitle: {
            type: String,
            required: true,
            trim: true,
          },
          videoUrl: {
            type: String,
            required: true,
            trim: true,
          },
          releaseTimeDays: {
            type: Number,
            required: true,
            min: 0,
            default: 0,  // 0 means the video is immediately available
          },
        },
      ],
    },
  ],
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;

