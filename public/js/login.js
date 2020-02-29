let googleProvider = new firebase.auth.GoogleAuthProvider();

document.getElementById("google-login").addEventListener("click", function() {
    firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
            console.log({ token });
            console.log({ user });
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
