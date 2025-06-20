import mongoose, { Document, Schema } from "mongoose";

export interface IImportLog extends Document {
  importId: string;
  timestamp: Date;
  source: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: {
    jobId: string;
    reason: string;
  }[];
}

const importLogSchema = new Schema<IImportLog>({
  importId: { type: String, required: true, unique: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // source: {
  //   type: String,
  //   required: true,
  // },
  totalFetched: {
    type: Number,
    required: true,
  },
  totalImported: {
    type: Number,
    required: true,
  },
  newJobs: {
    type: Number,
    required: true,
  },
  updatedJobs: {
    type: Number,
    required: true,
  },
  failedJobs: [
    {
      jobId: String,
      reason: String,
    },
  ],
}, {collection: "import-logs"});

const ImportLog = mongoose.model<IImportLog>("import_logs", importLogSchema);

export default ImportLog;
