import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    description: "Job title, e.g. 'Salesforce Marketing'"
  },
  company: {
    type: String,
    required: true,
    description: "Company name, e.g. 'Trivium Education'"
  },
  location: {
    type: String,
    required: true,
    description: "Job location, e.g. 'India (Remote)'"
  },
  type: {
    type: String,
    required: true,
    description: "Job type, e.g. 'Remote'"
  },
  logo: {
    type: String,
    required: true,
    description: "URL or path to company logo image"
  },
  description: {
    type: String,
    description: "Detailed job description"
  },
  postedDate: {
    type: Date,
    description: "Date when the job was posted"
  },
  applicantRanking: {
    type: String,
    enum: ["Top Applicant", null],
    description: "Applicant's ranking for this job, if applicable"
  },
  applicationStatus: {
    type: String,
    enum: ["Applied", "Viewed", "Interviewing", "Offered", "Rejected", null],
    description: "Current status of the user's application"
  },
  applyLink: {
    type: String,
    required: true,
    description: "URL where users can apply for the job"
  }
});

export const JobsList = mongoose.model('Job', jobSchema);
