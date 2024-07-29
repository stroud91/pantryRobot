// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhuVPo5Zsg-3YBDDH5WMdotng82vxKjbs",
  authDomain: "pantrylistdb.firebaseapp.com",
  projectId: "pantrylistdb",
  storageBucket: "pantrylistdb.appspot.com",
  messagingSenderId: "687582366587",
  appId: "1:687582366587:web:c4862d81e4c91084da8bde",
  measurementId: "G-76G1K5787L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)