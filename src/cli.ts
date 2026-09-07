#!/usr/bin/env node

const command = process.argv[2];

switch (command) {
  case "start":
    console.log("Start")
    break;

  case "connect":
    console.log("connect")
    break;

  default:
    console.log("Usage: broadcast-server <start|connect>");
}