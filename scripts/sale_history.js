function populateSales() {
    let saleCardTemplate = document.getElementById("saleCardTemplate");
    let saleCardGroup = document.getElementById("trackedSalesCardGroup");

    let soldItems = JSON.parse(localStorage.getItem("saleHistory")) || [];
    console.log(soldItems);

    saleCardGroup.innerHTML = "";

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let currentUserSales = soldItems.filter(soldItem => soldItem.userId === user.uid);
            let currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                // Sort the sales by timestamp in descending order (most recent first)
                currentUserSales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                if (currentUserSales.length === 0) {
                    // Add a message indicating no sales have been made yet
                    let noSalesMessage = document.createElement("div");
                    noSalesMessage.classList.add("text-muted", "my-3", "text-center");
                    noSalesMessage.innerHTML = "No sales have been made yet.";
                    saleCardGroup.appendChild(noSalesMessage);
                } else {
                    currentUserSales.forEach((soldItem) => {
                        let saleCard = saleCardTemplate.content.cloneNode(true);
                        saleCard.querySelector(".card-header").innerHTML = "Item Name: " + soldItem.name;
                        saleCard.querySelector(".card-title").innerHTML = soldItem.timestamp;
                        saleCard.querySelector(".card-length").innerHTML = "Sold: " + soldItem.quantity;
                        saleCard.querySelector(".card-details").innerHTML = "Location: " + soldItem.location;
                        saleCard.querySelector(".card-text").innerHTML = "Agent: " + userDoc.data().name;
                        saleCardGroup.appendChild(saleCard);
                    });
                }
            });
        }
    });
}
populateSales();

