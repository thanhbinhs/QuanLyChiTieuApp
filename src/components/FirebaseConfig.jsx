import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';


const FirebaseConfig = {
    apiKey: "AIzaSyC2HGTmAzj1kQADkFzFpx0-DnGGkK-qtGU",
    authDomain: "quanlychitieuapp.firebaseapp.com",
    projectId: "quanlychitieuapp",
    storageBucket: "quanlychitieuapp.appspot.com",
    messagingSenderId: "987834799919",
    appId: "1:987834799919:web:2c7c6ed64a0c6d620bb3da",
    measurementId: "G-57BLE7TGHQ"
  };

  export const FIREBASE_APP = initializeApp(FirebaseConfig);
  export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
