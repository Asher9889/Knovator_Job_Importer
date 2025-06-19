import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IJob {
    source: string;
    jobId: string;
    title: string;
    company?: string;
    location?: string;
    type?: string;
    category?: string;
    description?: string;
    url: string;
    datePosted?: Date;
    salary?: string;
    tags?: string[];
    remote?: boolean;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
  

const JobSchema = new mongoose.Schema<IJob>(
  {
    source: {
      type: String,
      required: true, // e.g., "jobicy" or "higheredjobs"
    },
    jobId: {
      type: String,
      required: true,
      unique: true, // used to prevent duplicates
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    type: {
      type: String, // full-time, part-time, etc.
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // to store anything extra for future use
      default: {},
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const JobModel = mongoose.model<IJob>("Job", JobSchema);

export default JobModel
