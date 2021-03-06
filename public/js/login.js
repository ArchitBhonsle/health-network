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

document.getElementById("email-login").addEventListener("click", function() {
    
    firebase
            .auth()
            .signInWithEmailAndPassword(document.getElementById("email-input").value, document.getElementById("pass-word").value)
            .then(function() {
                window.location.replace("/doctor");
            })
            .catch(function(error) {
                console.log(error.message);
            });
            window.location.replace("/doctor");
        });


firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    document.getElementById("google-login").innerHTML = `Logged in as ${user.displayName}`;

    db.collection("user")
        .doc(user.uid)
        .onSnapshot(function(querySnapshot) {     
            try { 
                let arr = querySnapshot.data().doctor;
                if(arr.length !== 0) {
                    window.location.replace("/profile");
                } else {
                    window.location.replace("/details");
                }
            } catch(err) {
                window.location.replace("/details");
            }
            if(arr.length !== 0) {
                window.location.replace("/profile");
            }
        });
});