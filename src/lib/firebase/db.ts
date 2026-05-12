import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { app } from "./config";

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
