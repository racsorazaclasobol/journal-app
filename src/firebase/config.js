// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAAmMN9iWnbAEEpF0uChp5YfsLJfHXZERg",
  authDomain: "react-projects-1b37d.firebaseapp.com",
  projectId: "react-projects-1b37d",
  storageBucket: "react-projects-1b37d.appspot.com",
  messagingSenderId: "336350538203",
  appId: "1:336350538203:web:592ed75edddfec185cdffe"
};

// Initialize Firebase
const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );