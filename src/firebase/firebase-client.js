import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const clientApp = initializeApp(firebaseConfig);

const clientAuth = getAuth(clientApp);

export {
  clientAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
