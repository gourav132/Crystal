import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// TODO: For production, use environment variables instead of hardcoded values
// Create a .env file in the root directory with your Firebase config:
// REACT_APP_API_KEY=your_api_key_here
// REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
// REACT_APP_PROJECT_ID=your_project_id
// REACT_APP_STORAGE_BUCKET=your_project.appspot.com
// REACT_APP_MESSAGING_SENDER_ID=your_sender_id
// REACT_APP_APP_ID=your_app_id

const firebaseConfig = {
  apiKey: "AIzaSyD6Zs3Ewtaxd4jTLak2ra5oKaBBctfclL0",
  authDomain: "crystal-910a1.firebaseapp.com",
  projectId: "crystal-910a1",
  storageBucket: "crystal-910a1.appspot.com",
  messagingSenderId: "921525106524",
  appId: "1:921525106524:web:0bed72c126dcc4ee953399"
};

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();
const database = firebaseApp.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

database.settings({ timestampsInSnapshots: true, merge: true });

export { storage, database, timestamp, auth };