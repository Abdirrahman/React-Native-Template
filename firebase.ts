// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { API_KEY, AUTH_DOMAIN, DATABSE_URL, PROJECT_ID, STORAGE_BUCKET, MEASUREMENT_ID, APP_ID,MESSASING_SENDER_ID
 } from "@env"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABSE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSASING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
console.log(API_KEY, "and", process.env.API_KEY)
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const storage = getStorage(FirebaseApp);
export const db = getFirestore(FirebaseApp)

