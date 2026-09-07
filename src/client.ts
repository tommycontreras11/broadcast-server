import WebSocket from "ws";
import readline from "node:readline";

export const connectClient = () => {
  const socket = new WebSocket("ws://localhost:8080");

  socket.on("open", () => {
    console.log("Connected to broadcast server.");

    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readlineInterface.on("line", (message) => {
      socket.send(message);
    });
  });

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  console.log("The client is listening to the server on port 8080")
};
