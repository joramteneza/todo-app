// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoF-z0cw9QKRUrDJt8ZTygJWZWi49rwYo",
  authDomain: "todo-app-bb09a.firebaseapp.com",
  projectId: "todo-app-bb09a",
  storageBucket: "todo-app-bb09a.appspot.com",
  messagingSenderId: "248558040328",
  appId: "1:248558040328:web:3d229ddbd7f9c99c60a8bd",
  measurementId: "G-XJ64G6PEK9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
