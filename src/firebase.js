import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXUmgbOdrONKU6M5q4MFstQwUwBDO1EX0",
  authDomain: "reac-fire.firebaseapp.com",
  projectId: "reac-fire",
  storageBucket: "reac-fire.appspot.com",
  messagingSenderId: "1030404335263",
  appId: "1:1030404335263:web:600e80c7c5e5931d19e4aa"
};

firebase.initializeApp(firebaseConfig);
export{firebase}

