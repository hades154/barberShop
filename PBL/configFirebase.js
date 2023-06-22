
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAyfZmruR0SvwP-VHiR4gqcu5269-vPK4c",
  authDomain: "barberbooking-cfe50.firebaseapp.com",
  databaseURL:
    "https://barberbooking-cfe50-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "barberbooking-cfe50",
  storageBucket: "barberbooking-cfe50.appspot.com",
  messagingSenderId: "832985243610",
  appId: "1:832985243610:web:8917cc15acc83bab93eae3",
  measurementId: "G-WCQR36HE82",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { auth, db, storage };
