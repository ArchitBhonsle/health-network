let db = firebase.firestore();

document.getElementById("submit-details").addEventListener("click", function() {
    let user = firebase.auth().currentUser;

    if(document.getElementById("doctor").value === null || document.getElementById("doctor").value === "") {
        window.location.replace("/profile");
        return;
    }
    let setData = db
        .collection("user")
        .doc(user.uid)
        .set({
            dob                : document.getElementById("dob").value,
            gender             : document.getElementById("gender").value,
            condition          : [ document.getElementById("condition").value ],
            timeSinceDiagnosis : [ document.getElementById("timeSinceDiagnosis").value ],
            doctor             : [ document.getElementById("doctor").value ],
            medications        : [ document.getElementById("medications").value ]
        })
        .then(function() {
            window.location.replace("/profile");
        })
        .catch(function(error) {
            console.log("Error adding document: ", error);
        });
});
