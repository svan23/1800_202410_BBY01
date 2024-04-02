var ImageFile;
function listenFileSelect() {
  // listen for file selection
  var fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("uploadedimg"); // pointer #2

  // When a change happens to the File Chooser Input
  fileInput.addEventListener("change", function (e) {
    ImageFile = e.target.files[0]; //Global variable
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob; // Display this image
  });
}
listenFileSelect();

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
//
// This function is called AFTER the post has been created,
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  var storageRef = storage.ref("images/" + postDocID + ".jpg");

  storageRef
    .put(ImageFile) //global variable ImageFile

    // AFTER .put() is done
    .then(function () {
      console.log("2. Uploaded to Cloud Storage.");
      storageRef
        .getDownloadURL()

        // AFTER .getDownloadURL is done
        .then(function (url) {
          // Get URL of the uploaded file
          console.log("3. Got the download URL.");

          // Now that the image is on Storage, we can go back to the
          // post document, and update it with an "image" field
          // that contains the url of where the picture is stored.
          db.collection("inventory")
            .doc(postDocID)
            .update({
              image: url, // Save the URL into users collection
            })
            // AFTER .update is done
            .then(function () {
              console.log("4. Added pic URL to Firestore.");
              // One last thing to do:
              // save this postID into an array for the OWNER
              // so we can show "my posts" in the future
              savePostIDforUser(postDocID);
            });
        });
    })
    .catch((error) => {
      console.log("error uploading to cloud storage");
    });
}

function writeItem() {
  //define a variable for the collection you want to create in Firestore to populate data
  const itemsRef = db.collection("inventory");

  const itemName = document.getElementById("name").value;
  const itemPrice = document.getElementById("price").value;
  const itemCategory = document.getElementById("category").value;
  const itemQuantity = document.getElementById("quantity").value;

  itemsRef
    .add({
      category: itemCategory,
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    })
    .then((doc) => {
      console.log("1. Post document added!");
      console.log(doc.id);
      uploadPic(doc.id);
    });

  window.location.href = "inventorypage.html";
}
