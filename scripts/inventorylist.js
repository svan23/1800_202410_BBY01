//Function to get all documents from one collection in Firestore
function getAllItems() {
  var inventoryRef = db
    .collection("inventory")
    .get()
    .then((allinventory) => {
      //process items to become array.
      const inventory = allinventory.docs.map((doc) => doc.data());
      console.log("inventory", inventory);

      // find the html list element
      // append children of an item to it

      let itemsHtml = "";

      inventory.forEach((item) => {
        itemsHtml += `
        <div class="d-flex">
        <div class="mb-3">
          <img class="inventoryimg"
            src="${item.photo}"
          />
        </div>
        <div class="ms-3">
          <div class="text-uppercase fw-bold sz-4 ">${item.name}</div>
          <div class="price">${item.price}</div>
          <div class="text-capitalize">${item.category}</div>
          <div class="text-lowercase fw-bold">${item.quantity} available</div>
        </div>
      </div>`;
      });

      document.getElementById("item-list").innerHTML = itemsHtml;
    });
}

function addItem() {
  window.location.href = "editinventory.html";
  console.log("vdas");
}
getAllItems();
