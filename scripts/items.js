// Function to read the quote of the day from the Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readitem(id) {
  db.collection("items")
    .doc(id) //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot((item) => {
      //arrow notation
      console.log(item.data()); //.data() returns data object
      //    document.getElementById("item-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place

      //Here are other ways to access key-value data fields
      //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
      //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
      //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
    });
}
readitem("NxBoSX8L0JxLSQj69WCR"); //calling the function

//Getting all documents from one collection in Firestore
function getAllItems() {
  db.collection("items")
    .get()
    .then((allitems) => {
      const items = allitems.docs.map((doc) => doc.data());
      console.log(items);
    });
}
getAllItems();
