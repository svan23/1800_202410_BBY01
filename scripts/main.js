function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.displayName + " is logged in");

            // document.getElementById("name-goes-here").innerHTML = user.displayName;

        } else {
            console.log(user.displayName +  " is NOT logged in");
        }

    })

}
getNameFromAuth();

// Declaring Item Details

function writeSalesItem() {
    //define a variable for the collection you want to create in Firestore to populate data
    var salesRef = db.collection("mock-sales");

    salesRef.add({
        name: "Croissant", //replace with your own city?
        details: "Soft and Fluffy",
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Bagel w/ Cream Cheese", //replace with your own city?
        details: "Creamy and Crunchy",
        quantity: 6,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "BLT Sandwich", //replace with your own city?
        details: "Crispy and Healthy. Kinda.",
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Roast Beef Sandwich", //replace with your own city?
        details: "Everyone's favorite.",
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Burrito", //replace with your own city?
        details: "A very filling Lunch.",
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Canadian Special Poutine", //replace with your own city?
        details: "The Classic.",
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Cheese Corndog", //replace with your own city?
        details: "Very Cheesy!",
        quantity: 4,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Chicken And Rice Bowl", //replace with your own city?
        details: "A Bodybuilder's go-to.",
        quantity: 3,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    
    salesRef.add({
        name: "Chicken Alfredo Pasta", //replace with your own city?
        details: "Feeling fancy, eh?",
        quantity: 2,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

// Ges the reference to the template
var template = document.getElementById("saleCardTemplate");

// Gets the reference to the container where the cards will be displayed
var container = document.getElementById("mock-sales-go-here");

// Gets the reference to the Firestore collection
var salesRef = db.collection("mock-sales");

// Get all sale items from the Firestore collection
salesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Clone the template content for each sale item
        var clone = template.content.cloneNode(true);

        // Update the cloned content with the sale item data
        clone.querySelector(".card-title").innerHTML = doc.data().name;
        clone.querySelector(".card-length").innerHTML = "Quantity: " + doc.data().quantity + " Remaining";
        clone.querySelector(".card-text").innerHTML = "Details: " + doc.data().details;

        // Add an event listener to the update button for each sale item
        clone.querySelector(".updateQuantity").addEventListener("click", function() {
            var docRef = db.collection("mock-sales").doc(doc.id);
            var currentQuantity = doc.data().quantity;
            var newQuantityValue = Math.max(currentQuantity - 1, 0); // Ensure quantity does not go below zero
            docRef.update({
                quantity: newQuantityValue
            }).then(() => {
                console.log("Document successfully updated.");
            }).catch((error) => {
                console.log("Error updating document: ", error);
            });
        });

        // Append the cloned content to the container
        container.appendChild(clone);
    });
});
