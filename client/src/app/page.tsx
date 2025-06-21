"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

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

let socket: Socket;

export default function ImportLogsPage() {
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial logs
    async function fetchLogs() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/job/import-jobs?page=1&limit=20"
        );
        setLogs(res.data.data.logs);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();

    
    socket = io("http://localhost:5001"); // 👈 Your WebSocket server port

    // 3️Listen for new log updates
    socket.on("import-logs-update", (newLog: ImportLog) => {
      console.log("📡 New log received:", newLog);

      setLogs((prevLogs) => {
        const updatedLogs = [newLog, ...prevLogs];

        // Keep only the first 20 items
        return updatedLogs.slice(0, 20);
      });
    });

    // on unmount
    return () => {
      if (socket) socket.disconnect();
    };
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
                <th className="border px-2 py-1">Sr No.</th>
                <th className="border px-2 py-1">File Name</th>
                <th className="border px-2 py-1">Timestamp</th>
                {/* <th className="border px-2 py-1">Source</th> */}
                <th className="border px-2 py-1">Total</th>
                <th className="border px-2 py-1">New</th>
                <th className="border px-2 py-1">Updated</th>
                <th className="border px-2 py-1">Failed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log._id}>
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{log.importId}</td>
                  <td className="border px-2 py-1">{formatDate(log.timestamp)}</td>
                  {/* <td className="border px-2 py-1">{log.source || "-"}</td> */}
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
