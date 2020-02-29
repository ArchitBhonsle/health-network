const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    firebase = require("firebase-admin"),
    methodOverride = require("method-override");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.listen(9001, () => {
    console.log("Server started at port 9001");
});
