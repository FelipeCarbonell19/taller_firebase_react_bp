import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMzxhIcLBOL33495nCGKlziv3UE0ZPmB8",
  authDomain: "crud-react-firebase-13ec0.firebaseapp.com",
  projectId: "crud-react-firebase-13ec0",
  storageBucket: "crud-react-firebase-13ec0.appspot.com",
  messagingSenderId: "210019898793",
  appId: "1:210019898793:web:92afc5d9747bd5679ca0b8"
};

firebase.initializeApp(firebaseConfig);
export{firebase}

