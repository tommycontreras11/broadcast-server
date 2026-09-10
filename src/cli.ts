#!/usr/bin/env node

import { signUp } from "./auth.js";
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

  case "register":
    signUp()
    break;

  default:
    console.log("Usage: broadcast-server <start|connect>");
}
