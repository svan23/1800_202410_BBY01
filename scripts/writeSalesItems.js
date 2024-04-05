// javascript file used to set data into firestore

function writeSalesItem() {
    //define a variable for the collection you want to create in Firestore to populate data
    var salesRef = db.collection("inventory");

    salesRef.add({
        name: "Croissant",
        photo: "/assets/croissant.jpg",
        category: "Pastry",
        price: "$9.00",
        details: "Soft and Fluffy",
        quantity: 8,
        total_sold_today: 0,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Scone",
        photo: "/assets/scone.jpg",
        category: "Pastry",
        price: "$9.00",
        details: "Creamy and Crunchy",
        total_sold_today: 0,
        quantity: 6,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Cream Puff",
        photo: "/assets/puff.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Cheesecake",
        photo: "/assets/cheesecake.png",
        category: "Cake",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Peach Pie",
        photo: "/assets/peach.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Napolean",
        photo: "/assets/napaleon.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Kouign Amann",
        photo: "/assets/amann.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Tiramisu",
        photo: "/assets/tiramisu.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    salesRef.add({
        name: "Eclair",
        photo: "/assets/eclair.png",
        category: "Pastry",
        price: "$9.00",
        details: "Crispy and Healthy. Kinda.",
        total_sold_today: 0,
        quantity: 8,
        location: "Surrey",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}