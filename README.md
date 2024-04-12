# Project Title
TrackMySales™️

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  

Our team, BBY01, is developing TrackMySales™️ to assist small business owners in tracking their sales effortlessly, by easily recording sale quantities with a simple tap. Some of the core features of our app include users recording sale quantities with just a simple tap, track inventory levels with the inventory page, view sales history and colorful graphs, and using the image of inventories to represent the item itself.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, I'm Raven! I'm excited to change the world with our new app!
* Hi I'm Andre, I'm the oldest in the group!
* Hi, I'm Vanessa. I'm excited to learn in this course!
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* To use our app, you need the Firebase API.
* ...
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* Changing the photo in edit inventory does not work.
* The bookmark function is not working.
* The edit button on the overall sale view page does not work.

## 6. Features for Future
What we'd like to build in the future:
* To build a feature where the user can delete a tracked sale in case users make a mistake on tracking a sale.
* Add feature to sort sale history based on quantity sold, item name, location, or agent.
* To implement the bookmark function and finish inventory details page.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├──.firebase
    /hosting..cache

├── assets                   # Folder for icons
    /bookmark.svg
    /history.svg   
    /home.svg   
    /inventory.svg   
    /profile.svg            

├── html                     #Folder for web pages when user is logged in
    /createinventory.html
    /editInventory.html
    /inventorypage.html
    /profile.html
    /sales_history_graph.html
    /sales_history_main.html
    /sales_history_recent.html
    /sales_track.html

├── images
    /tms.png

├── scripts                  # Folder for scripts
    /authentication.js
    /createinventory.js
    /editinventory.js
    firebaseAPI.js
    inventorylist.js
    main.js
    profile.js
    sale_history.js
    sales_item.js
    script.js
    skeleton.js
    writeSalesItems.js

├── styles                  #Folder for styles
    global.css
    inventorypage.css
    sales_history.css
    sales_track.css
    style.css
                      
├── text                   # Folder for components
    /footer_after_login.html
    /footer_before_login.html
    /nav_after_login.html
    /nav_before_login.html
    
index.html                 # Landing Page 

login.html                 # Login Page


