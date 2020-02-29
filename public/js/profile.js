let db = firebase.firestore();
let usersCol = db.collection("user");

firebase.auth().onAuthStateChanged(function(currentUser) {
    document.getElementById("name").innerHTML = `Hello ${currentUser.displayName}!`;
    usersDocRef = usersCol.doc(currentUser.uid);
    usersDocRef.get().then(function(userDoc) {
        user = userDoc.data();
        console.log(user);
        cond = user.condition;
        docs = user.doctor;
        meds = user.medications;
        tsd = user.timeSinceDiagnosis;
        cond.forEach(function(c, i) {
            document.getElementById("chatArray").innerHTML += generateCard(c, tsd[i], docs[i], meds[i]);
        });
    });
});

function generateCard(condition, time, doctor, medication) {
    return `<div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${condition}</h5>
        <p class="card-text">On ${medication} since ${time} months recommended by ${doctor}</p>
        <button class="btn btn-primary">Go to Chat</button>
      </div>
    </div>
    </div>`;
}
