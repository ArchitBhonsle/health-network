let googleProvider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();

document.getElementById("google-login").addEventListener("click", function() {
    firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
        })
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
        });
});

firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    document.getElementById("google-login").innerHTML = `Logged in as ${user.displayName}`;

    db.collection("user")
        .doc(user.uid)
        .onSnapshot(function(querySnapshot) {      
            let arr = querySnapshot.data().condition;
            if(arr.length !== 0) {
                window.location.replace("/profile");
            } else {
                window.location.replace("/details");
            }
        })
        .catch(function(error) {
            window.location.replace("/details");
        })
});
