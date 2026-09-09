import WebSocket from "ws";
import readline from "node:readline";

export const connectClient = () => {
  const socket = new WebSocket("ws://localhost:8080");

  socket.on("open", () => {
    console.log("Connected to broadcast server on port 8080.");

    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readlineInterface.on("line", (message) => {
      socket.send(message);
    });

    process.on("SIGINT", () => {
      console.log("\nDisconnecting from broadcast server...");

      readlineInterface.close();
      socket.close();
    });
  });

  socket.on("message", (message) => {
    console.log(message.toString());
  });

  socket.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });

  socket.on("close", () => {
    console.log("Disconnected from broadcast server.");
  });
};