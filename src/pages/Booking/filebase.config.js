import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  // Your Firebase config options

  apiKey: "AIzaSyCOJHwbmX57odbMQldpwSjKGl1ezcoLC_g",
  authDomain: "sms-project-524e6.firebaseapp.com",
  projectId: "sms-project-524e6",
  storageBucket: "sms-project-524e6.appspot.com",
  messagingSenderId: "434361035814",
  appId: "1:434361035814:web:3a87e0167a4fe439988ae7",
  measurementId: "G-7TKRV0NQNF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;
