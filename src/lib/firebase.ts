// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPFEFvfzdJVdIfow4QzBnKHDqh8r6ibmo",
  authDomain: "eyewear-shop-aaf59.firebaseapp.com",
  projectId: "eyewear-shop-aaf59",
  storageBucket: "eyewear-shop-aaf59.firebasestorage.app",
  messagingSenderId: "395991295721",
  appId: "1:395991295721:web:ac8dffa15311f88e9bf278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };