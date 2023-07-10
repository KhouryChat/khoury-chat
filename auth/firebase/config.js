import { initializeApp, getApps, getApp } from "firebase/app";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let Firebase =
  getApps().length == 0 ? initializeApp(FirebaseCredentials) : getApps()[0];

export default Firebase;
