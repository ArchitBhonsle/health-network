let db = firebase.firestore();
let array = [];
db.collection("user").get().then((q) => {
    let condSet = new Set();
    arr = q.docs.map((doc) => doc.data());
    arr.forEach(function(a) {
        ac = a.condition;
        ac.forEach(function(c) {
            condSet.add(c);
        });
    });
    let conds = Array.from(condSet);
    // console.log(conds);
   /* conds.forEach(function(c, i) {
        document.getElementById("chatArray").innerHTML += generateCard(i, c);
    });*/

    firebase.auth().onAuthStateChanged(function(user) {
        conds.forEach(function(c, i) {
            document.getElementById("chatArray").innerHTML += generateCard(i, c);
        });

        for(var i=0;i<conds.length;i++) {
            array.push(conds[i]);
        }
        /*db.collection("user").doc(user.uid).onSnapshot(function(querySnapshot) {
            let arr = querySnapshot.data().condition;
            // console.log(arr);
            for (var i = 0; i < arr.length; i++) {
                // conds.push(arr[i]);
            }
        });*/
    });
    // console.log(conds);
});
console.log(array);
function gotoChat(i) {
    window.location.replace(`/chats/${array[i]}`);
}
function generateCard(i, condition) {   
    return `<div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${condition}</h5>
        <button class="btn btn-primary" id="${i}" onclick="gotoChat(${i})">Go to Chat</button>
      </div>
    </div>
    </div>`;
}
