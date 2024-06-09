// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiu1CarwUbE7jRsj_Ta5pNpa7nos8UuOU",
  authDomain: "notes-application-1a449.firebaseapp.com",
  projectId: "notes-application-1a449",
  storageBucket: "notes-application-1a449.appspot.com",
  messagingSenderId: "907324261407",
  appId: "1:907324261407:web:b17937c946b576a074812a",
  measurementId: "G-XD4K3FYRLM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
