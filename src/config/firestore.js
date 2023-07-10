// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT3Xj7kuEg0XXijChF_7pIFG8eGIg3-48",
  authDomain: "presmaflix-784d1.firebaseapp.com",
  databaseURL: "https://presmaflix-784d1-default-rtdb.firebaseio.com",
  projectId: "presmaflix-784d1",
  storageBucket: "presmaflix-784d1.appspot.com",
  messagingSenderId: "1051978975179",
  appId: "1:1051978975179:web:9db58debfa4cb7906b584e",
  measurementId: "G-ZCQ5QRJC74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);