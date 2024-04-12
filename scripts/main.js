// Function to get the display name of the currently logged in user and update the DOM
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.displayName + " is logged in");
            document.getElementById("name-goes-here").innerHTML = user.displayName;

        } else {
            console.log(user.displayName + " is NOT logged in");
        }

    })

}
getNameFromAuth();

// Console logging the firebase object
console.log(firebase);

// Getting references to the template, container, and Firestore collection
var template = document.getElementById("saleCardTemplate");
var container = document.getElementById("mock-sales-go-here");
var salesRef = db.collection("inventory");

// Function to dynamically display sale cards
function displayCardsDynamically() {
    salesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Clone the template content for each sale item
            var clone = template.content.cloneNode(true);

            // Update the cloned content with the sale item data
            clone.querySelector(".card-title").innerHTML = doc.data().name;
            clone.querySelector(".card-length").innerHTML = "Quantity: " + doc.data().quantity + " Remaining";
            clone.querySelector(".card-text").innerHTML = "Details: " + doc.data().details;
            clone.querySelector('.card-image').src = doc.data().photo; //Example: NV01.jpg

            // Add an event listener to the update button for each sale item
            clone.querySelector(".updateQuantity").addEventListener("click", function () {
                var docRef = db.collection("inventory").doc(doc.id);
                console.log(doc.id);
                var currentQuantity = doc.data().quantity;
                var currentlySold = doc.data().total_sold_today;
                var newQuantityValue = Math.max(currentQuantity - 1, 0); // Ensure quantity does not go below zero
                var newSaleValue = currentlySold + 1; // Increments by One when interacted with
                var newTimeUpdated = new Date().toLocaleString();

                // Store the sold item and quantity in local storage
                var saleItem = doc.data().name; // Gets item name
                var user = firebase.auth().currentUser;
                var userId = user ? user.uid : null;
                var location = doc.data().location; // Gets location
                var timestamp = new Date().toLocaleString(); // Gets the current timestamp
                console.log("Sale Item:", saleItem);
                console.log(location);
                
                addToSaleHistory(saleItem, 1, timestamp, userId, location);

                // Update the Firestore document with new values
                docRef.update({
                    quantity: newQuantityValue,
                    total_sold_today: newSaleValue,
                    last_updated: newTimeUpdated
                }).then(() => {
                    console.log("Document successfully updated.");
                    window.location.href = window.location.href;
                    console.log("After reload.");
                }).catch((error) => {
                    console.error("Error updating document: ", error);
                });
            });

            // Add the out-of-stock class and disable the button if quantity is 0
            if (doc.data().quantity === 0) {
                clone.querySelector(".updateQuantity").disabled = true;
            }

            // Append the cloned content to the container
            container.appendChild(clone);
        });
    });
}

// Call the function to display sale cards
displayCardsDynamically();

// Function to add a sale item to local storage
function addToSaleHistory(itemName, quantity, timestamp, userId, location) {
    let saleItem = { name: itemName, quantity: quantity, timestamp: timestamp, userId: userId, location: location };
    let saleHistory = JSON.parse(localStorage.getItem("saleHistory")) || [];
    saleHistory.push(saleItem);
    localStorage.setItem("saleHistory", JSON.stringify(saleHistory));
}
