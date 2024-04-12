// Function to dynamically display cards for items in a collection
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("salesListTemplate"); // Retrieve the HTML element with the ID "salesListTemplate" and store it in the cardTemplate variable.

  db.collection(collection)
    .orderBy("total_sold_today", "desc")
    .get() // Retrieve all documents from the specified collection
    .then((allItems) => {
      allItems.forEach((doc) => {
        // Extract data from each document
        var name = doc.data().name;
        var location = doc.data().location;
        var time = doc.data().last_updated;
        var total_sold_today = doc.data().total_sold_today;
        let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card that will be filled with Firestore data.
        var docID = doc.id;

        // Update title, text, and image of the card
        newcard.querySelector("#item_name").innerHTML = name;
        newcard.querySelector("#item_quantity").innerHTML = "Sold: " + total_sold_today;
        newcard.querySelector("#card-location").innerHTML = "Location: " + location;
        newcard.querySelector("#card-time").innerHTML = "Last Updated: " + time;

        // Attach the new card to the specified element
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}

// Call the function to display cards for items in the "inventory" collection
displayCardsDynamically("inventory");

// Function to reset the "total_sold_today" field for all items in the "inventory" collection
function resetTotalSoldTodayForAllItems() {
  const itemsRef = db.collection("inventory");

  itemsRef.get().then((querySnapshot) => {
    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { total_sold_today: 0 });
    });

    return batch.commit().then(() => {
      console.log("Total sold today for all items successfully reset!");
      localStorage.clear(); // Clear the local storage
      console.log("User local storage is cleared.");
      window.location.href = window.location.href; // Refresh the page to reflect the reset values
    });
  }).catch((error) => {
    console.error("Error resetting total sold today for all items: ", error);
  });
}

// Event listener for the reset button to call the resetTotalSoldTodayForAllItems function
document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset the total sold today for all items?")) {
    resetTotalSoldTodayForAllItems();
  }
});
