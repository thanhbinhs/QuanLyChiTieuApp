// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const FirebaseConfig = {
  apiKey: "AIzaSyC2HGTmAzj1kQADkFzFpx0-DnGGkK-qtGU",
  authDomain: "quanlychitieuapp.firebaseapp.com",
  projectId: "quanlychitieuapp",
  storageBucket: "quanlychitieuapp.appspot.com",
  messagingSenderId: "987834799919",
  appId: "1:987834799919:web:2c7c6ed64a0c6d620bb3da",
  measurementId: "G-57BLE7TGHQ"
};

const FIREBASE_APP = initializeApp(FirebaseConfig);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// const messaging = getMessaging(FIREBASE_APP);

// export const requestForToken = () => {
//   return getToken(messaging, { vapidKey: '<YOUR_PUBLIC_VAPID_KEY>' })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         // Perform any other necessary operations here, like storing the token
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//       }
//     })
//     .catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//     });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });


export { FIREBASE_APP, FIRESTORE_DB, FIREBASE_AUTH };
