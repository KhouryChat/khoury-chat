import Firebase from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(Firebase);

export default async function signUp(username, email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(result.user, {
      displayName: username,
      photoURL: "https://picsum.photos/100/100",
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
