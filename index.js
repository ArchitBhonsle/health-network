const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    firebase = require("firebase-admin"),
    // functions = require("firebase-functions"),
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
// firebase.initializeApp(functions.config().firebase);
let db = firebase.firestore();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/login", (req, res) => {
    console.log(firebase.auth().currentUser);
    res.render("auth/login");
});

app.get("/details", (req, res) => {
    console.log(firebase.auth().currentUser);
    res.render("auth/details");
});

app.post("/details", (req, res) => {
    /*let name = req.body.name,
        dob = req.body.dob,
        gender = req.body.gender,
        condition = req.body.condition,
        timeSinceDiagnosis = req.body.timeSinceDiagnosis,
        doctor = req.body.doctor,
        medications = req.body.medications;*/

    let data = {
        // name : req.body.name,
        dob : req.body.dob,
        gender : req.body.gender,
        condition : req.body.condition,
        timeSinceDiagnosis : req.body.timeSinceDiagnosis,
        doctor: req.body.doctor,
        medications : req.body.medications
    };
    var user = firebase.auth().currentUser.uid;
    // user = firebase.auth().currentUser.uid;
    // user = firebase.auth().currentUser.uid;
    let setData = db.collection("user").doc(user).set(data);
})

app.listen(9001, () => {
    console.log("Server started at port 9001");
});