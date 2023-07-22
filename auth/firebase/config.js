import { initializeApp, getApps } from "firebase/app";

import { firebaseConfig } from "@/firebase.config";

let Firebase =
  getApps().length == 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default Firebase;
