import { WebSocketServer } from "ws";

export const startServer = (port: number) => {
  const server = new WebSocketServer({
    port,
  });

  server.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
      console.log(`Received: ${message.toString()}`);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`Broadcast server listening on port ${port}`)
};
