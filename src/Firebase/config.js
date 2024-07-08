import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Zs3Ewtaxd4jTLak2ra5oKaBBctfclL0",
  authDomain: "crystal-910a1.firebaseapp.com",
  projectId: "crystal-910a1",
  storageBucket: "crystal-910a1.appspot.com",
  messagingSenderId: "921525106524",
  appId: "1:921525106524:web:0bed72c126dcc4ee953399"

  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();
const database = firebaseApp.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

database.settings({ timestampsInSnapshots: true, merge: true });

export { storage, database, timestamp };