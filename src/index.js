import { createServer } from "@graphql-yoga/node";
import "graphql-import-node";
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const server = createServer({});

server.start({ port: process.env.PORT || 4691 }, () => {
  console.log("The server is up and running");
});
