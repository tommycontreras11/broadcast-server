import { WebSocketServer, WebSocket } from "ws";

const clients = new Map<WebSocket, string>();

export const startServer = (port: number) => {
  const server = new WebSocketServer({
    port,
  });

  server.on("connection", (socket) => {
    const clientId = `Client ${clients.size + 1}`;

    clients.set(socket, clientId);

    console.log(`${clientId} connected. Total clients: ${clients.size}`);

    socket.on("message", (message) => {
      const clientId = clients.get(socket);

      if (!clientId) {
        return;
      }

      broadcast(`${clientId} says: ${message.toString()}`);
    });

    socket.on("close", () => {
      clients.delete(socket);

      console.log(`Client disconnected. Total clients: ${clients.size}`);
    });

    socket.on("error", (error) => {
      console.error("Client WebSocket error:", error.message);
    });
  });

  server.on("error", (error) => {
    console.error("WebSocket server error:", error.message);
  });

  console.log(`Broadcast server listening on port ${port}`);

  process.on("SIGINT", () => {
    console.log("\nShutting down server...");

    for (const client of clients.keys()) {
      client.close();
    }

    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
};

function broadcast(message: string) {
  for (const client of clients.keys()) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}
