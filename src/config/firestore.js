// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3xPI1yp8szj_CIkFy9QYKqUWU6dhGH7U",
  authDomain: "presmaflix.firebaseapp.com",
  databaseUrl: "https://presmaflix-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "presmaflix",
  storageBucket: "presmaflix.appspot.com",
  messagingSenderId: "923273589990",
  appId: "1:923273589990:web:055a36de7bf8d785b33727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);