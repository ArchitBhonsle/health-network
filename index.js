const firebase = require("firebase-admin");

const firebaseConfig = {
    apiKey            : "AIzaSyAs8FVXBJ-M4toU6-GNQKDuAsodbkP501w",
    authDomain        : "social-network-c462e.firebaseapp.com",
    databaseURL       : "https://social-network-c462e.firebaseio.com",
    projectId         : "social-network-c462e",
    storageBucket     : "social-network-c462e.appspot.com",
    messagingSenderId : "132403966735",
    appId             : "1:132403966735:web:a5104971fbbb768ce7847a",
    measurementId     : "G-FD1QD59BLT"
};

firebase.initializeApp(firebaseConfig);
