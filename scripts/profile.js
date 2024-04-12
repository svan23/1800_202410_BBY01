var currentUser; // points to the document of the user who is logged in

// Function to populate user information in the form
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Get the document reference for the current user
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                let userDetails = userDoc.data().details;
                let userPosition = userDoc.data().position;
                let userLocationBased = userDoc.data().location;

                // Populate the form fields with user information
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userDetails != null) {
                    document.getElementById("detailsInput").value = userDetails;
                }
                if (userPosition != null) {
                    document.getElementById("positionInput").value = userPosition;
                }
                if (userLocationBased != null) {
                    document.getElementById("locationInput").value = userLocationBased;
                }
            });
        } else {
            console.log("No user is signed in");
        }
    });
}

// Call the function to populate user info
populateUserInfo();

// Function to enable editing of user into
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

// Function to save user info
function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userDetails = document.getElementById('detailsInput').value;
    userPosition = document.getElementById('positionInput').value;
    userLocationBased = document.getElementById('locationInput').value;

    // Update the user document with new information
    currentUser.update({
        name: userName,
        details: userDetails,
        position: userPosition,
        location: userLocationBased
    }).then(() => {
        console.log("Document successfully updated!");
        localStorage.setItem("employeeName", userName); // Store Employee Name into Local Storage
        // Update the display name in the authentication object
        firebase.auth().currentUser.updateProfile({
            displayName: userName
        }).then(() => {
            // Update the name in the getNameFromAuth function in main.js
            getNameFromAuth();
        }).catch((error) => {
            console.error("Error updating display name in authentication:", error);
        });
    });

    // Disable editing of form fields after saving
    document.getElementById('personalInfoFields').disabled = true;
}
