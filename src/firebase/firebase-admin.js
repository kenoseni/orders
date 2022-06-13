import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: process.env.DATABASE_URL,
});

const auth = admin.auth(app);
const db = admin.firestore();

export { auth, db };
