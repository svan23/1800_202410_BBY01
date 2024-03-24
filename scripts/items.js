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

//Function to get all documents from one collection in Firestore
function getAllItems() {
  db.collection("items")
    .get()
    .then((allitems) => {
      //process items to become array.
      const items = allitems.docs.map((doc) => doc.data());
      console.log(items);

      // find the html list element
      // append children of an item to it

      let itemsHtml = "";

      items.forEach((item) => {
        itemsHtml += `
        <div class="d-flex">
        <div class="mb-3">
          <img class="inventoryimg"
            src="${item.photo}"
          />
        </div>
        <div class="ms-3">
          <div class="text-uppercase fw-bold sz-4">${item.name}</div>
          <div class="text-capitalize">${item.category}</div>
          <div class="text-lowercase fw-bold">${item.quantity} available</div>
        </div>
      </div>`;
      });

      document.getElementById("item-list").innerHTML = itemsHtml;
    });
}
getAllItems();
