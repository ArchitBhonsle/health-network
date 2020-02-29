let db = firebase.firestore();
let usersCol = db.collection("user");

document.getElementById("submit-details").addEventListener("click", function() {
    firebase.auth().onAuthStateChanged(function(currentUser) {
        let usersDocRef = usersCol.doc(currentUser.uid);
        usersDocRef.get().then(function(userDoc) {
            user = userDoc.data();
            console.log({ user });
            user.condition.push(document.getElementById("condition").value);
            user.doctor.push(document.getElementById("doctor").value);
            user.medications.push(document.getElementById("medications").value);
            user.timeSinceDiagnosis.push(document.getElementById("timeSinceDiagnosis").value);
            console.log({ user });
            db.collection("user").doc(currentUser.uid).set(user).then().catch(function(error) {
                console.log("Error adding document: ", error);
            });
        });
    });
});
