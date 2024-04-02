

function drawGraph(collection) {
  // let cardTemplate = document.getElementById("myChart"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
  var points = [];
  var itemName = [];
  var itemQuantity = [];
  db.collection(collection)
    .orderBy("total_sold_today", "desc")
    .limit(5)
    .get() //the collection called "hikes"
    .then((allSales) => {
      //var i = 1;  //Optional: if you want to have a unique ID for each hike
      allSales.forEach((doc) => {
        //iterate thru each doc
        var xdat = doc.data().name; // get value of the "name" key
        var location = doc.data().location; // get value of the "details" key
        var time = doc.data().last_updated.toDate(); //get unique ID to each hike to be used for fetching right image
        var ydat = doc.data().total_sold_today; //gets the length field
        // let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
        var newpoint = { x: xdat, y: ydat };
        points.push(newpoint);

        itemName.push(xdat);
        itemQuantity.push(ydat);

        // call the graph function with points
        document.getElementById("myChart").innerHTML =
          '<canvas id="myChart"></canvas>';
        // let myChart = document.getElemenyById('myChart').getContext('2d');

        const ctx = document.getElementById("myChart");

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [itemName[0],itemName[1], itemName[2], itemName[3], itemName[4]],
            datasets: [
              {
                label: "# of Sales",
                data: itemQuantity,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)'

                ],
                borderWidth: 5,
                hoverBorderColor: "#777",
                
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: "Top 5 Sales Item",
              fontSize:25
            },
            scales: {
              yAxes: [{ ticks: { min: 0, max: itemQuantity[0] } }],
              // y: {
              //   beginAtZero: true,
              //   min:0,
              //   max:0
              // }
            },
            legend: {
              display: false,
            },
          },
        });
      });
    });
  console.log(points);
  console.log(itemName);
  console.log(itemQuantity);
}

drawGraph("inventory");

