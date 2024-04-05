//Function to get all documents from one collection in Firestore
var inventoryRef = db.collection("inventory"); // Gets the reference to the Firestore collection

function getAllItems() {
    inventoryRef.get()
    .then((allInventory) => {
      //process items to become array.
      const inventory = allInventory.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("inventory", inventory);

      // find the html list element
      // append children of an item to it

      let itemsHtml = "";

      inventory.forEach((item) => {
        console.log("item", item); // Add this line for debugging
        itemsHtml += `
        <div class="d-flex">
          <div class="mb-3">
            <img class="inventoryimg" src="${item.photo}" />
          </div>
          <div class="ms-3">
            <div class="text-uppercase fw-bold sz-4">${item.name}</div>
            <div class="price">${item.price}</div>
            <div class="text-capitalize">${item.category}</div>
            <div class="text-lowercase fw-bold">${item.quantity} available</div>
            <button class="btn btn-primary" onclick="editItem('${item.id}')">Edit</button>
          </div>
        </div>`;
        console.log(item.id);
      });

      document.getElementById("item-list").innerHTML = itemsHtml;
    });
}

function addItem() {
  window.location.href = "createinventory.html";
  console.log("vdas");
}

function editItem(itemID) {
  console.log(itemID);
  window.location.href = "editInventory.html?saleID=" + itemID;
  console.log("You're being directed to editing inventory page.");
}

getAllItems();
