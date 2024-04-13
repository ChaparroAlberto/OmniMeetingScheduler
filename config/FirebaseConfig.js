import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "omnimeetingscheduler.firebaseapp.com",
  projectId: "omnimeetingscheduler",
  storageBucket: "omnimeetingscheduler.appspot.com",
  messagingSenderId: "209135713347",
  appId: "1:209135713347:web:89e0c198a6efab9ef1e8f6",
  measurementId: "G-66RKE1DJ75",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
