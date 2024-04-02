// Function to read the quote of the day from the Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
// function readitem(id) {
//   db.collection("sales_item")
//     .doc(id) //name of the collection and documents should matach excatly with what you have in Firestore
//     .onSnapshot((sales_item) => {
//       //arrow notation
//       console.log(sales_item.data()); //.data() returns data object
//       //    document.getElementById("item-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

//       //Here are other ways to access key-value data fields
//       //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//       //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
//       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
//     });
// }
// readitem("OziNRF5JaqCzdaAMAJto"); //calling the function

// //Getting all documents from one collection in Firestore
// function getAllItems() {
//   db.collection("sales_item")
//     .get()
//     .then((allitems) => {
//       const sales_item = allitems.docs.map((doc) => doc.data());
//       console.log(sales_item);
//     });
// }
// getAllItems();


//Getting all documents from one collection in Firestore
// function getAllItems() {
//   db.collection("items")
//     .get()
//     .then((allitems) => {
//       const items = allitems.docs.map((doc) => doc.data());
//       console.log(items);
//     });
// }
// getAllItems();


// function writeSales() {
//   //define a variable for the collection you want to create in Firestore to populate data
//   var salesRef = db.collection("sales item");

//   salesRef.add({
//     location: "Burnaby", //replace with your own city?
//     name: "Sandwich",
//     quantity: 10, //number value
//     time: firebase.firestore.FieldValue.serverTimestamp(), //current system time
//   });
//   salesRef.add({
//     location: "Coquitlam", //replace with your own city?
//     name: "Taco",
//     quantity: 9, //number value
//     time: firebase.firestore.FieldValue.serverTimestamp(), //current system time
//   });
//   salesRef.add({
//     location: "Vancouver", //replace with your own city?
//     name: "Burger",
//     quantity: 8, //number value
//     time: firebase.firestore.FieldValue.serverTimestamp(), //current system time
//   });
// }
// writeSales();



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
        newcard.querySelector("#item_quantity").innerHTML = "sold: " + total_sold_today;
        newcard.querySelector("#card-location").innerHTML = "location: " + location;
        newcard.querySelector(".card-time").innerHTML = "last updated: " + time;
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



