//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyD-JEk9hykuC42llcjyRTRoVWFXbf2_Pq0",
    authDomain: "bby01-4e84d.firebaseapp.com",
    projectId: "bby01-4e84d",
    storageBucket: "bby01-4e84d.appspot.com",
    messagingSenderId: "263087281685",
    appId: "1:263087281685:web:cb669a2edf9b206d63201c"
  };
  

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();


