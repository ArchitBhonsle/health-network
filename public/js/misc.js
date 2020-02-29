/*function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}*/
function signOut() {
    firebase.auth().signOut();
}
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}
function getUserName() {
    return firebase.auth().currentUser.displayName;
}
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function saveMessage(message, disease) {
    return firebase.firestore().collection('messages').doc(disease).add({
        name: getUserName(),
        text: message,
        profilePic: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing new message to database', error);
    });
}

function loadMessages(disease) {
    var query = firebase.firestore()
                    .collection('messages')
                    .doc(disease)
                    .orderBy('timestamp', 'desc')
                    .limit(100);
    
    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === 'removed') {
            deleteMessage(change.doc.id);
            } else {
                var message = change.doc.data();
                displayMessage(change.doc.id, message.timestamp, message.name,
                    message.text, message.profilePicUrl, message.imageUrl);
            }
        });
    });
}

/*function saveImageMessage(file) {
    firebase
        .firestore()
        .collection("messages")
        .add({
            name: getUserName(),
            imageUrl: LODING_IMAGE_URL,
            profilePic: getProfilePicUrl(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(messageRef) {
            let filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
            return firebase
                .storage()
                .ref(filePath)
                .put(file)
                .then(function(fileSnapshot) {
                    return fileSnapshot.ref.getDownloadUrl()
                        .then(function (url) {
                            return messageRef.update({
                                imageUrl: url,
                                storageUri: fileSpanshot.metadata.fullPath
                            });
                        });
                });
        })
        .catch(function(err) {
            console.log(err.message);
        });
}*/

function saveMessagingDeviceToken() {
    firebase.messaging().getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
            firebase.firestore().collection('fcmTokens').doc(currentToken)
                .set({uid: firebase.auth().currentUser.uid});
        } else {
            requestNotificationsPermissions();
        }
    }).catch(function(error){
        console.error('Unable to get messaging token.', error);
    });
}
/*function onMediaFileSelected(event) {
    event.preventDefault();
    var file = event.target.files[0];

    imageFormElement.reset();
  
    if (!file.type.match('image.*')) {
        var data = {
            message: 'You can only share images',
            timeout: 2000
        };
        signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
        return;
    }
    if (checkSignedInWithMessage()) {
        saveImageMessage(file);
    }
}*/
function onMessageFormSubmit(e) {
    e.preventDefault();
    if (messageInputElement.value && checkSignedInWithMessage()) {
      saveMessage(messageInputElement.value).then(function() {
            resetMaterialTextfield(messageInputElement);
            toggleButton();
        });
    }
}

function authStateObserver(user) {
    if (user) { 
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();
  
      // Set the user's profile pic and name.
        // < userPicElement >.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        // < userNameElement >.textContent = userName;
  
      // Show user's profile and sign-out button.
    //   < userNameElement >.removeAttribute('hidden');
    //   < userPicElement >.removeAttribute('hidden');
    //   < signOutButtonElement >.removeAttribute('hidden');
  
      // Hide sign-in button.
    //   < signInButtonElement >.setAttribute('hidden', 'true');
  
      // We save the Firebase Messaging Device token and enable notifications.
        saveMessagingDeviceToken();
    } else {
      // Hide user's profile and sign-out button.
    //   < userNameElement >.setAttribute('hidden', 'true');
    //   < userPicElement >.setAttribute('hidden', 'true');
    //   < signOutButtonElement >.setAttribute('hidden', 'true');
  
      // Show sign-in button.
        // < signInButtonElement ></signInButtonElement>.removeAttribute('hidden');
    }
  }

function resetMaterialTextfield(element) {
    element.value = '';
    // element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    '</div>';

function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}

var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

/*function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
        div.parentNode.removeChild(div);
    }
}*/

function createAndInsertMessage(id, timestamp) {
    const container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    const div = container.firstChild;
    div.setAttribute('id', id);
  
    // If timestamp is null, assume we've gotten a brand new message.
    // https://stackoverflow.com/a/47781432/4816918
    timestamp = timestamp ? timestamp.toMillis() : Date.now();
    div.setAttribute('timestamp', timestamp);
  
    // figure out where to insert new message
    // const existingMessages = < messageListElement >.children;
    if (existingMessages.length === 0) {
        // < messageListElement >.appendChild(div);
    } else {
        let messageListNode = existingMessages[0];
  
        while (messageListNode) {
            const messageListNodeTime = messageListNode.getAttribute('timestamp');
  
            if (!messageListNodeTime) {
                throw new Error(`Child ${messageListNode.id} has no 'timestamp' attribute`);
            }
            if (messageListNodeTime > timestamp) {
                break;
            }
            messageListNode = messageListNode.nextSibling;
        }
        // < messageListElement >.insertBefore(div, messageListNode);
    }
    return div;
}

function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);

    if (picUrl) {
        div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    }
  
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
  
    if (text) { // If the message is text.
        // < messageElement >.textContent = text;
        // < messageElement >.innerHTML = < messageElement >.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUrl) { // If the message is an image.
        var image = document.createElement('img');
        image.addEventListener('load', function() {
            // < messageListElement >.scrollTop = < messageListElement >.scrollHeight;
        });
        image.src = imageUrl + '&' + new Date().getTime();
        messageElement.innerHTML = '';
        messageElement.appendChild(image);
    }
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function() {div.classList.add('visible')}, 1);
    // < messageListElement >.scrollTop = < messageListElement >.scrollHeight;
    // < messageInputElement >.focus();
}