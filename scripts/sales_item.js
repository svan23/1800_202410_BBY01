
// //------------------------------------------------------------------------------
// // Input parameter is a string representing the collection we are reading from
// //------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("salesListTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.

  db.collection(collection)
  .orderBy("total_sold_today", "desc")
  // .limit(5)
    .get() //the collection called "hikes"
    .then((allHikes) => {
      //var i = 1;  //Optional: if you want to have a unique ID for each hike
      allHikes.forEach((doc) => {
        //iterate thru each doc
        var name = doc.data().name; // get value of the "name" key
        var location = doc.data().location; // get value of the "details" key
        var time = doc.data().last_updated; //get unique ID to each hike to be used for fetching right image
        var total_sold_today = doc.data().total_sold_today; //gets the length field
        let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
        var docID = doc.id;

        //update title and text and image
        newcard.querySelector("#item_name").innerHTML = name;
        newcard.querySelector("#item_quantity").innerHTML = "Sold: " + total_sold_today;
        newcard.querySelector("#card-location").innerHTML = "Location: " + location;
        newcard.querySelector(".card-time").innerHTML = "Last Updated: " + time;
        // newcard.querySelector(".card-image").src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
        newcard.querySelector("a").href = "eachHike.html?docID=" + docID;

        //Optional: give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery, Example: "hikes-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);

        //i++;   //Optional: iterate variable to serve as unique ID
      });
    });
    
}

displayCardsDynamically("inventory"); //input param is the name of the collection

function resetTotalSoldTodayForAllItems() {
  const itemsRef = db.collection("inventory");

  itemsRef.get().then((querySnapshot) => {
    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { total_sold_today: 0 });
    });

    return batch.commit().then(() => {
      console.log("Total sold today for all items successfully reset!");
      localStorage.clear();
      console.log("User local storage is cleared.");
      window.location.href = window.location.href
      // Optionally, you can add code here to update the UI to reflect the reset values
    });
  }).catch((error) => {
    console.error("Error resetting total sold today for all items: ", error);
  });
}

// Call resetTotalSoldTodayForAllItems function when the user clicks the reset button
document.getElementById("reset-button").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset the total sold today for all items?")) {
    resetTotalSoldTodayForAllItems();
  }
});



