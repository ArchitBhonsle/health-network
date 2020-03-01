let db = firebase.firestore();
let usersCol = db.collection("user");

firebase.auth().onAuthStateChanged(function(currentUser) {
    document.getElementById("name").innerHTML = `Hello ${currentUser.displayName}!`;
    let usersDocRef = usersCol.doc(currentUser.uid);
    usersDocRef.get().then(function(userDoc) {
        user = userDoc.data();
        cond = user.condition;
        docs = user.doctor;
        meds = user.medications;
        tsd = user.timeSinceDiagnosis;
        cond.forEach(function(c, i) {
            document.getElementById("chatArray").innerHTML += generateCard(i, c, tsd[i], docs[i], meds[i]);
        });
    });
});

function generateCard(i, condition, time, doctor, medication) {
    return `<div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${condition}</h5>
        <p class="card-text">On ${medication} since ${time} months recommended by ${doctor}</p>
        <button class="btn btn-primary" id="${i}" onclick="(gotoChat(${i}))">Go to Chat</button>
      </div>
    </div>
    </div>`;
}

let conds = [];

firebase.auth().onAuthStateChanged(function(user) {
  db.collection("user").doc(user.uid)
    .onSnapshot(function(querySnapshot) {      
		let arr = querySnapshot.data().condition;
		console.log(arr);
		for(var i=0;i<arr.length;i++) {
			conds.push(arr[i]);
		}
	});
});

function gotoChat(i) {
	window.location.replace(`/chats/${conds[i]}`);
}

document.getElementById("addCondition").addEventListener("click", function() {
    window.location.replace("/addCondition");
});

document.getElementById("logout").addEventListener("click", function() {
	firebase.auth().signOut();
	window.location.replace("/login");
});