// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3vGRnodVNnOr-ZJe4tmgAPJPtCWbV9G4",
  authDomain: "store-progetto.firebaseapp.com",
  projectId: "store-progetto",
  storageBucket: "store-progetto.firebasestorage.app",
  messagingSenderId: "712127006423",
  appId: "1:712127006423:web:bbece39daba0d627b39292"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore service
const db=getFirestore()
export const auth = getAuth();
export default db