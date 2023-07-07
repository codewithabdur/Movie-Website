// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "register-data-bed5b.firebaseapp.com",
  databaseURL: "https://register-data-bed5b-default-rtdb.firebaseio.com",
  projectId: "register-data-bed5b",
  storageBucket: "register-data-bed5b.appspot.com",
  messagingSenderId: "44417762807",
  appId: "1:44417762807:web:04e716f8c6d04c532ddaf2",
  measurementId: "G-MJ5YRK4K47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);