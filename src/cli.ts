#!/usr/bin/env node

import { connectClient } from "./client.js";
import { startServer } from "./server.js";

const command = process.argv[2];

switch (command) {
  case "start":
    startServer(8080)
    break;

  case "connect":
    connectClient()
    break;

  default:
    console.log("Usage: broadcast-server <start|connect>");
}