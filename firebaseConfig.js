// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2HGTmAzj1kQADkFzFpx0-DnGGkK-qtGU",
    authDomain: "quanlychitieuapp.firebaseapp.com",
    projectId: "quanlychitieuapp",
    storageBucket: "quanlychitieuapp.appspot.com",
    messagingSenderId: "987834799919",
    appId: "1:987834799919:web:2c7c6ed64a0c6d620bb3da",
    measurementId: "G-57BLE7TGHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);