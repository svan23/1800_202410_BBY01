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
          <div class="ms-3 card-grid">
            <div class = "item-details">
              <div class="text-uppercase fw-bold sz-4">${item.name}</div>
              <div class="price">${item.price}</div>
              <div class="text-capitalize">${item.category}</div>
              <div class="text-lowercase fw-bold">${item.quantity} available</div>
            </div>
            <div class = "update-button">
            <button class="btn btn-primary ms-auto" onclick="editItem('${item.id}')">Edit</button>
            </div>
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

// Function to filter items based on search input
function filterItems(searchTerm) {
  const itemsRef = db.collection("inventory");
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  itemsRef.get()
      .then((querySnapshot) => {
          const itemList = document.getElementById("item-list");
          itemList.innerHTML = ""; // Clear previous items

          querySnapshot.forEach((doc) => {
              const item = doc.data();
              const itemName = item.name.toLowerCase();

              if (itemName.includes(lowerCaseSearchTerm)) {
                  const itemCard = document.createElement("div");
                  itemCard.classList.add("card", "mb-3");
                  itemCard.innerHTML = `
                      <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text">Price: ${item.price}</p>
                          <p class="card-text">Quantity: ${item.quantity}</p>
                          <p class="card-text">Details: ${item.details}</p>
                          <div class="update-button">
                              <button class="btn btn-primary ms-auto" onclick="editItem('${doc.id}')">Edit</button>
                          </div>
                      </div>
                  `;
                  itemList.appendChild(itemCard);
              }
          });
      })
      .catch((error) => {
          console.error("Error getting documents: ", error);
      });
}

// Event listener for search input changes
document.getElementById("searchInput").addEventListener("input", function() {
  const searchTerm = this.value.trim();
  filterItems(searchTerm);
});
