// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        var user = authResult.user;                            // get the user object from the Firebase authentication database
        if (authResult.additionalUserInfo.isNewUser) {         //if new user
            db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                   name: user.displayName,                    //"users" collection
                   email: user.email,                         //with authenticated user's ID (user.uid)
            }).then(function () {
                   console.log("New user added to firestore");
                   window.location.assign("../html/sales_track.html");       //re-direct to sales_track.html after signup
            }).catch(function (error) {
                   console.log("Error adding new user: " + error);
            });
        } else {
            return true;
        }
            return false;
        },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: '../html/sales_track.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);

  