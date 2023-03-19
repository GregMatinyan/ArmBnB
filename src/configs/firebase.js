import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnwcbp-r2HwteUTYfCeniaQ3-3k6tOD0s",
  authDomain: "bountyfix-986c8.firebaseapp.com",
  projectId: "bountyfix-986c8",
  storageBucket: "bountyfix-986c8.appspot.com",
  messagingSenderId: "283798043728",
  appId: "1:283798043728:web:450196ef7574be7c62a555",
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const usersListRef = collection(db, "users");
export const offersListRef = collection(db, "offers");
