// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase, ref, set, push, get, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfq79mCRLr-oobv_XBuLXPZGrXIo2jrO8",
  authDomain: "letchat-331305.firebaseapp.com",
  projectId: "letchat-331305",
  storageBucket: "letchat-331305.appspot.com",
  messagingSenderId: "274773643394",
  appId: "1:274773643394:web:5c40bb0ab5e11e4ad4e49b",
  measurementId: "G-LWPQ0K7TXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);



const msgRef = ref(database, 'messages');
push(msgRef,[1,2,3,4,5]);