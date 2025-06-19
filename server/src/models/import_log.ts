import mongoose, { Document } from "mongoose";

// 1️⃣ Define TypeScript Interface
export interface IImportFailure {
  jobId?: string;
  reason: string;
  rawData?: any;
}

interface IImportLog extends Document{
  fileName: string;
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
  failures: IImportFailure[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Define Mongoose Schema
const ImportFailureSchema = new mongoose.Schema<IImportFailure>({
  jobId: { type: String },
  reason: { type: String, required: true },
  rawData: { type: mongoose.Schema.Types.Mixed }
});

const ImportLogSchema = new mongoose.Schema<IImportLog>(
  {
    fileName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    totalFetched: { type: Number, required: true },
    totalImported: { type: Number, required: true },
    newJobs: { type: Number, required: true },
    updatedJobs: { type: Number, required: true },
    failedJobs: { type: Number, required: true },
    failures: { type: [ImportFailureSchema], default: [] }
  },
  {
    timestamps: true
  }
);

const ImportLog = mongoose.model<IImportLog>(
  "import-log",
  ImportLogSchema
);

export default ImportLog;