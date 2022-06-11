import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../serviceAccountKey.json";

dotenv.config({ path: ".env" });

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const auth = admin.auth(app);
export const db = admin.database(app);
