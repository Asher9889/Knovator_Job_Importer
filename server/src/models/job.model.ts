import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IJob extends Document {
  source: string;
  jobId: string;
  title: string;
  description: string;
  company?: string;
  location?: string;
  // type?: string;
  // category?: string;
  url: string;
  postedAt?: Date;
  // salary?: string;
  // tags?: string[];
  // remote?: boolean;
  // metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}


const jobSchema = new mongoose.Schema<IJob>(
  {
    source: {
      type: String,
      required: true, // "jobicy" or "higheredjobs"
    },
    jobId: {
      type: String,
      required: true,
      unique: true, // to prevent duplicates
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    company: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    // type: {
    //   type: String, // full-time, part-time, etc.
    //   default: null,
    // },
    // category: {
    //   type: String,
    //   default: null,
    // },

    url: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    // salary: {
    //   type: String,
    //   default: null,
    // },
    // tags: {
    //   type: [String],
    //   default: [],
    // },
    // remote: {
    //   type: Boolean,
    //   default: false,
    // },
    // metadata: {
    //   type: mongoose.Schema.Types.Mixed, // to store anything extra for future use
    //   default: {},
    // },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job
