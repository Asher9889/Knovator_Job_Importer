"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface ImportLog {
  _id: string;
  importId: string;
  timestamp: string;
  totalFetched: number;
  totalImported?: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: any[];
  source?: string;
}

export default function ImportLogsPage() {
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/job/import-jobs?page=1&limit=20");
        const json = res.data.data;

        setLogs(json.logs); // ✅ fix: access logs correctly
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoString));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Import Logs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Timestamp</th>
                <th className="border px-2 py-1">Import ID</th>
                <th className="border px-2 py-1">Source</th>
                <th className="border px-2 py-1">Fetched</th>
                <th className="border px-2 py-1">New</th>
                <th className="border px-2 py-1">Updated</th>
                <th className="border px-2 py-1">Failed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td className="border px-2 py-1">{formatDate(log.timestamp)}</td>
                  <td className="border px-2 py-1">{log.importId}</td>
                  <td className="border px-2 py-1">{log.source || "-"}</td>
                  <td className="border px-2 py-1">{log.totalFetched}</td>
                  <td className="border px-2 py-1">{log.newJobs}</td>
                  <td className="border px-2 py-1">{log.updatedJobs}</td>
                  <td className="border px-2 py-1">{log.failedJobs?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
