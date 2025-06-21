import Redis from "ioredis";

/**
 * Emit an event to all connected Socket.IO clients via Redis Pub/Sub.
 * Works from any service (cron, worker, etc.) using ioredis.
 */

async function emitToSocketIO(
  eventName: string,
  payload: any,
  namespace: string = "/"
) {
  const redis = new Redis(); // Default: redis://localhost:6379

  try {
    // The channel Socket.IO Redis adapter listens to:
    const channel = `socket.io#${namespace}#`;

    const message = [
      "", // Empty room name (broadcast to all clients)
      JSON.stringify({
        type: 2,               // 2 = EVENT (Socket.IO protocol)
        data: [eventName, payload],
        nsp: namespace,
      }),
    ];

    await redis.publish(channel, JSON.stringify(message));
    console.log(`✅ Emitted "${eventName}" to Socket.IO via Redis`);
  } catch (err) {
    console.error("❌ Failed to emit event via Redis:", err);
  } finally {
    redis.disconnect();
  }
}

export default emitToSocketIO;