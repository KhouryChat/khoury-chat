import Firebase from "./config";
import { getAuth } from "firebase/auth";

const auth = getAuth(Firebase);

const getUserDataByUID = async (uid) => {
  try {
    const userRecord = await auth.getUser(uid);
    return userRecord;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

export default getUserDataByUID;
