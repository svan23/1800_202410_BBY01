function writeItem() {
    //define a variable for the collection you want to create in Firestore to populate data
    const itemsRef = db.collection("items");

    
    const itemName = document.getElementById("name").value;
    const itemPrice = document.getElementById("price").value;
    const itemCategory = document.getElementById("category").value;
    const itemQuantity = document.getElementById("quantity").value;


    itemsRef.add({
        category: itemCategory,
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
    });

    window.location.href = "inventorypage.html";

}