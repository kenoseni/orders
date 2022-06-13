import { createServer } from "@graphql-yoga/node";
import "graphql-import-node";
import * as schema from "./schema/schema.graphql";
import dotenv from "dotenv";
import { db, auth } from "./firebase/firebase-admin";
import {
  clientAuth,
  signInWithEmailAndPassword,
} from "./firebase/firebase-client";
import { Mutation } from "./resolvers/Mutation";
import { Query } from "./resolvers/Query";

dotenv.config({ path: ".env" });

const server = createServer({
  schema: {
    typeDefs: schema,
    resolvers: { Query, Mutation },
  },
  context: (req) => {
    return {
      db,
      auth,
      clientAuth,
      signInWithEmailAndPassword,
      req,
    };
  },
});

server.start({ port: process.env.PORT || 4691 }, () => {
  console.log("The server is up and running");
});
