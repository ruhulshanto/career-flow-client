
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNn2W5PYIfBpgrisBvZGJ38aYjAavFXEw",
  authDomain: "career-flow-97fcb.firebaseapp.com",
  projectId: "career-flow-97fcb",
  storageBucket: "career-flow-97fcb.firebasestorage.app",
  messagingSenderId: "579476715051",
  appId: "1:579476715051:web:87dd2a7787d2ce03c75c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);