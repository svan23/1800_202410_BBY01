function populateSales() {
    let saleCardTemplate = document.getElementById("saleCardTemplate");
    let saleCardGroup = document.getElementById("trackedSalesCardGroup");

    // Retrieve data from local storage
    let soldItems = JSON.parse(localStorage.getItem("saleHistory"));
    console.log(soldItems);

    saleCardGroup.innerHTML = "";

    // Retrieve the employee name from Firestore
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                soldItems.forEach((soldItem) => {
                    let saleCard = saleCardTemplate.content.cloneNode(true);
                    saleCard.querySelector(".card-header").innerHTML = "Item Name: " + soldItem.name;
                    saleCard.querySelector(".card-title").innerHTML = soldItem.timestamp;
                    saleCard.querySelector(".card-length").innerHTML = "Sold: " + soldItem.quantity;
                    saleCard.querySelector(".card-text").innerHTML = "Agent: " + userDoc.data().name; // Use the employee name from Firestore
                    saleCardGroup.appendChild(saleCard);
                });
            });
        }
    });
}
populateSales();

