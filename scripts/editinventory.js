// Function to extract a specific parameter value from the URL query string.
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the saleID from the URL
const saleID = getUrlParameter('saleID');
console.log('saleID:', saleID);

// Function to fetch item data from Firestore using the provided item ID and populate the form fields with the item's data.
function getItemAndPopulateFields(itemId) {
  const itemsRef = db.collection("inventory").doc(itemId);

  itemsRef.get().then((doc) => {
    if (doc.exists) {
      const item = doc.data();

      // Populate the form fields with the item's data
      document.getElementById("name").value = item.name;
      document.getElementById("price").value = item.price;
      document.getElementById("category").value = item.category;
      document.getElementById("quantity").value = item.quantity;
      document.getElementById("details").value = item.details;
      document.getElementById("location").value = item.location;
      document.getElementById("uploadedimg").src = item.photo;
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}
// Usage: Pass the document ID of the item you want to fetch and populate the fields with
getItemAndPopulateFields(saleID);

// Function to save changes made to an item's data.
function saveChanges(itemId) {
  const itemsRef = db.collection("inventory").doc(itemId);

  const itemName = document.getElementById("name").value;
  const itemPrice = document.getElementById("price").value;
  const itemCategory = document.getElementById("category").value;
  const itemQuantity = parseInt(document.getElementById("quantity").value);
  const itemDetails = document.getElementById("details").value;
  const itemLocation = document.getElementById("location").value;

  return itemsRef.update({
    name: itemName,
    price: itemPrice,
    category: itemCategory,
    quantity: itemQuantity,
    details: itemDetails,
    location: itemLocation
  })
    .then(() => {
      console.log("Document successfully updated!");
      window.location.href = "inventorypage.html";
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}

// Call saveChanges function when the user clicks the save button
document.getElementById("save-button").addEventListener("click", () => {
  saveChanges(saleID);
})

// Function to delete an item from Firestore
function deleteItem(itemId) {
  const itemsRef = db.collection("inventory").doc(itemId);

  itemsRef.delete().then(() => {
    console.log("Document successfully deleted!");
    window.location.href = "inventorypage.html";
  }).catch((error) => {
    console.error("Error deleting document: ", error);
  });
}

// Call deleteItem function when the user clicks the delete button
document.getElementById("delete-button").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this item?")) {
    deleteItem(saleID);
  }
});

// Function to cancel the edit operation and redirect to the inventory page.
function cancel() {
  console.log("Cancel Edit Inventory.");
  window.location.href = "inventorypage.html";
}
