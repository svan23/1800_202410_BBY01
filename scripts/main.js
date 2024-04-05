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

// Declaring Item Details

function writeSalesItem() {
    //define a variable for the collection you want to create in Firestore to populate data
    var salesRef = db.collection("inventory");

    salesRef.add({
        name: "Croissant",
        photo: "/assets/croissant.jpg",
        category: "Pastry",
        price: "$9.00",
        details: "Soft and Fluffy",
        quantity: 8,
        total_sold_today: 0,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Scone",
        photo: "/assets/scone.jpg",
        category: "Pastry",
        price: "$9.00",
        details: "Creamy and Crunchy",
        total_sold_today: 0,
        quantity: 6,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Cream Puff",
        photo: "/assets/puff.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Cheesecake",
        photo: "/assets/cheesecake.png",
        category: "Cake",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Peach Pie",
        photo: "/assets/peach.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Napolean",
        photo: "/assets/napaleon.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Kouign Amann",
        photo: "/assets/amann.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Tiramisu",
        photo: "/assets/tiramisu.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Eclair",
        photo: "/assets/eclair.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

console.log(firebase);

var template = document.getElementById("saleCardTemplate"); // Gets the reference to the template
var container = document.getElementById("mock-sales-go-here"); // Gets the reference to the container where the cards will be displayed
var salesRef = db.collection("inventory"); // Gets the reference to the Firestore collection

// Get all sale items from the Firestore collection
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
                var timestamp = new Date().toLocaleString(); // Gets the current timestamp
                console.log("Sale Item:", saleItem);
                
                addToSaleHistory(saleItem, 1, timestamp, userId);

                docRef.update({
                    quantity: newQuantityValue,
                    total_sold_today: newSaleValue,
                    last_updated: newTimeUpdated
                }).then(() => {
                    console.log("Document successfully updated.");
                    location.replace(location.href);
                }).catch((error) => {
                    window.alert("Error updating document: ", error);
                });
            });
            // Append the cloned content to the container
            container.appendChild(clone);
        });
    });
}
displayCardsDynamically();

function addToSaleHistory(itemName, quantity, time, employee) {
    // Retrieve existing sale history from localStorage
    let saleHistory = JSON.parse(localStorage.getItem("saleHistory")) || [];

    // Add the new sold item to the sale history
    saleHistory.push({
        name: itemName,
        quantity: quantity,
        timestamp: time,
        employeeName: employee // Include the user's ID
    });

    // Store the updated sale history back in localStorage
    localStorage.setItem("saleHistory", JSON.stringify(saleHistory));
}
