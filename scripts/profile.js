var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userDetails = userDoc.data().details;
                    let userPosition = userDoc.data().position;
                    let userLocationBased = userDoc.data().location;

                    //if the data fields are not empty, then write them in to the form.
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
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

// To edit the function
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

// To save user Info
function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userDetails = document.getElementById('detailsInput').value;
    userPosition = document.getElementById('positionInput').value;
    userLocationBased = document.getElementById('locationInput').value;

    currentUser.update({
        name: userName,
        details: userDetails,
        position: userPosition,
        location: userLocationBased
    })
    .then(() => {
        console.log("Document successfully updated!");
        localStorage.setItem("employeeName", userName); // Store Employee Name into Local Storage
    })

    document.getElementById('personalInfoFields').disabled = true;
}