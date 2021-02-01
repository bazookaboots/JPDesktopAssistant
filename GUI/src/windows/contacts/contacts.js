
function ListContacts(data) {
    for (i = 0; i < 4; i++) {

        // Create item container
        let listing = document.createElement('div')
        listing.setAttribute("class", "contactListing")

        // Create name Editor
        let nameBar = document.createElement('input');
        nameBar.setAttribute("type", "text");
        nameBar.value = data[i].Name;

        // Create name Editor
        let platformBar = document.createElement('select');
        platformBar.setAttribute("type", "text");
        platformBar.value = data[i].Platform;

        // Create name Editor
        let userBar = document.createElement('input');
        userBar.setAttribute("type", "text");
        userBar.value = data[i].UserName;

        // Create save buttton
        let saveBtn = document.createElement('button');
        saveBtn.innerHTML = "S";
        saveBtn.addEventListener("click", (e) => {
            console.log("new-listing-btn function called")
            NewListing();
        })

        // Create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "X";
        deleteBtn.addEventListener("click", (e) => {
            console.log("new-listing-btn function called")
            NewListing();
        })

        // Append items to listing
        listing.appendChild(nameBar)
        listing.appendChild(platformBar)
        listing.appendChild(userBar)
        listing.appendChild(saveBtn)
        listing.appendChild(deleteBtn)

        // Append listing to list
        document.getElementById("contacts-list").appendChild(listing);
    }
}

function NewListing() {
    // Create item container
    let listing = document.createElement('div')
    listing.setAttribute("class", "contactListing")

    // Create name Editor
    let nameBar = document.createElement('input');
    nameBar.setAttribute("type", "text");
    nameBar.placeholder = "Name";

    // Create platform Editor
    let platformBar = document.createElement('input');
    platformBar.setAttribute("type", "text");
    platformBar.placeholder = "Platform";

    // Create username Editor
    let userBar = document.createElement('input');
    userBar.setAttribute("type", "text");
    userBar.placeholder = "Username";

    // // Create save buttton
    // let saveBtn = document.createElement('button');
    // deleteBtn.innerHTML = "S";

    // // Create delete button
    // let deleteBtn = document.createElement('button');
    // deleteBtn.innerHTML = "X";
    

    // Append items to listing
    listing.appendChild(nameBar)
    listing.appendChild(platformBar)
    listing.appendChild(userBar)
    //listing.appendChild(saveBtn)
    //listing.appendChild(deleteBtn)

    // Append listing to list
    document.getElementById("contacts-list").appendChild(listing)

}

function init() {
    var contacts;
    contacts = GetContacts(ListContacts);

    //EVENT LISTENERS
    //
    document.getElementById("new-listing-btn").addEventListener("click", (e) => {
        console.log("new-listing-btn function called")
        NewListing();
    })

}