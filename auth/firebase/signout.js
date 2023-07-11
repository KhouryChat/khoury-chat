import Firebase from "./config";
import { getAuth } from "firebase/auth";

const auth = getAuth(Firebase);

export default async function signOut() {
  auth.signOut();
}
