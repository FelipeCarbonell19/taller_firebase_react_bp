import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2g16nEgU6_Z-waeboYluFSDzGU32RfPQ",
  authDomain: "bd-react-firebase.firebaseapp.com",
  projectId: "bd-react-firebase",
  storageBucket: "bd-react-firebase.appspot.com",
  messagingSenderId: "268298505993",
  appId: "1:268298505993:web:55c32cef5e6ffcba888dd8"
};

firebase.initializeApp(firebaseConfig);
export{firebase}

