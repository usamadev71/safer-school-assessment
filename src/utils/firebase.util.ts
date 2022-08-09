// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmj2D9CIs1FmYPqqH9bHtDNDWv0PFFzlY",
  authDomain: "safer-school-assessment.firebaseapp.com",
  projectId: "safer-school-assessment",
  storageBucket: "safer-school-assessment.appspot.com",
  messagingSenderId: "568791112704",
  appId: "1:568791112704:web:56a3e927107cc3efe4cce5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
