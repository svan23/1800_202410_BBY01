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

// Reading from Collection of Data

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(salesRef) {
    let cardTemplate = document.getElementById("saleCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    // Clears the container before adding new cards.
    document.getElementById("mock-sales-go-here").innerHTML = "";

    db.collection(salesRef).get()   //the collection called "mock-sales"
        .then(allSales => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allSales.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                // var hikeCode = doc.data().itemID;    //get unique ID to each hike to be used for fetching right image
                var quantity = doc.data().quantity; //gets the quantity field
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = "Quantity: " + quantity + " Remaining";
                newcard.querySelector('.card-text').innerHTML = "Details: " + details;
                // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "sales-go-here"
                document.getElementById(salesRef + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}
displayCardsDynamically("mock-sales");  //input param is the name of the collection

// console.log(writeSalesItem());
