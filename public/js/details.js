var db = firebase.firestore();

document.getElementById("submit-details").addEventListener("click", function() {
    let data = {
        // name : req.body.name,
        dob : document.getElementById("dob").value,
        gender : document.getElementById("gender").value,
        condition : document.getElementById("condition").value,
        timeSinceDiagnosis : document.getElementById("timeSinceDiagnosis").value,
        doctor: document.getElementById("doctor").value,
        medications : document.getElementById("medications").value
    };
    var user = firebase.auth().currentUser;
    let setData = db.collection("user").doc(user.uid).set({
        dob : document.getElementById("dob").value,
        gender : document.getElementById("gender").value,
        condition : document.getElementById("condition").value,
        timeSinceDiagnosis : document.getElementById("timeSinceDiagnosis").value,
        doctor: document.getElementById("doctor").value,
        medications : document.getElementById("medications").value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.log("Error adding document: ", error);
    });
})