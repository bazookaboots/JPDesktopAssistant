

testData = [
    { 
        id: "1",
        name: "LEHI",
        platform:"Discord",
        username:"Bazookaboots#9013",    
    },
    { 
        id: "2",
        name: "BAILEY",
        platform:"Discord",
        username:"Bazookaboots#9013",    
    },
    { 
        id: "3",
        name: "MORGAN",
        platform:"Discord",
        username:"Bazookaboots#9013",    
    },
    { 
        id: "4",
        name: "EREN",
        platform:"Discord",
        username:"Bazookaboots#9013",    
    }
]

var i = 0;
function ListContacts(data) {
    for (i = i; i < 4; i++) {
        // Create item container
        let listing = document.createElement('div')
        listing.setAttribute("class", "contactListing")
        listing.setAttribute("id", i + "-listing")

        // Create text containers
        let textInputs = document.createElement('div')
        textInputs.setAttribute("class", "listingTextInputs")

        // Create text containers
        let btnInputs = document.createElement('div')
        btnInputs.setAttribute("class", "listingBtnInputs")

        // Create name Editor
        let nameBar = document.createElement('input');
        nameBar.setAttribute("type", "text");
        nameBar.setAttribute("id", i + "-name-input")
        nameBar.value = data[i].name;

        // Create name Editor
        let platformBar = document.createElement('input');
        platformBar.setAttribute("type", "text");
        platformBar.setAttribute("id", i + "-platform-input")
        platformBar.value = data[i].platform;

        // Create name Editor
        let userBar = document.createElement('input');
        userBar.setAttribute("type", "text");
        userBar.setAttribute("id", i + "-username-input")
        userBar.value = data[i].username;

        // Create save buttton
        let saveBtn = document.createElement('button');
        saveBtn.classList.add('green')
        let saveIco = document.createElement('img')
        saveIco.setAttribute('src',"../../assets/icons/save_24px_outlined.svg")
        saveBtn.appendChild(saveIco)
        saveBtn.addEventListener("click", (e) => {

            // get  text input values
            let nameData = document.getElementById(i + "-name-input").value
            let platformData = document.getElementById(i + "-platform-input").value
            let usernameData = document.getElementById( i + "-username-input").value
            
            // function to update contact values
            // UpdateContact(data[i].id, { 
            //         "Name": nameData,
            //         "Platform": platformData,
            //         "Username":usernameData
            //     }
            // )
        })

        let count = i.toString()
        // Create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('red')
        let deleteIco = document.createElement('img')
        deleteIco.setAttribute('src',"../../assets/icons/delete_forever_24px_outlined.svg")
        deleteBtn.appendChild(deleteIco)
        deleteBtn.addEventListener("click", (e) => {
            DeleteListing( count + "-listing")
            //DeleteContact(data[i].id)
        })

        // Append items to listing
        textInputs.appendChild(nameBar)
        textInputs.appendChild(platformBar)
        textInputs.appendChild(userBar)
        btnInputs.appendChild(saveBtn)
        btnInputs.appendChild(deleteBtn)
        listing.appendChild(textInputs)
        listing.appendChild(btnInputs)

        // Append listing to list
        document.getElementById("contacts-list").appendChild(listing);
    }
}

function DeleteListing(id){
    console.log(id);
    let element = document.getElementById(id)
    element.parentNode.removeChild(element)
}

function NewListing() {
    
    let count = i.toString()

    // Create item container
    let listing = document.createElement('div')
    listing.setAttribute("class", "contactListing")
    listing.setAttribute("id", i + "-listing")

    // Create text containers
    let textInputs = document.createElement('div')
    textInputs.setAttribute("class", "listingTextInputs")

    // Create text containers
    let btnInputs = document.createElement('div')
    btnInputs.setAttribute("class", "listingBtnInputs")

    // Create name Editor
    let nameBar = document.createElement('input');
    nameBar.setAttribute("type", "text");
    nameBar.setAttribute("id", count + "-name-input")
    nameBar.placeholder = "name";
    nameBar.addEventListener('change', (e) =>{
        
        let nameValue = nameBar.value
        let platformValue = platformBar.value
        let usernameValue = userBar.value

        // let nameValue = document.getElementById(count + "-name-input").value
        // let platformValue = document.getElementById(count + "-platform-input").value
        // let usernameValue = document.getElementById(count + "-username-input").value

        console.log(nameValue)
        console.log(platformValue)
        console.log(usernameValue)

        if(nameValue != "" && platformValue != "" && usernameValue != "")
        {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("gray")
            btn.classList.add("green")
            btn.disabled = false;        
        }
        else {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("green")
            btn.classList.add("gray")
            btn.disabled = true;    
        }

    })

    // Create name Editor
    let platformBar = document.createElement('input');
    platformBar.setAttribute("type", "text");
    platformBar.setAttribute("id", count + "-platform-input")
    platformBar.placeholder = "platform";
    platformBar.addEventListener('change', (e) =>{
        
        let nameValue = nameBar.value
        let platformValue = platformBar.value
        let usernameValue = userBar.value

        // let nameValue = document.getElementById(count + "-name-input").value
        // let platformValue = document.getElementById(count + "-platform-input").value
        // let usernameValue = document.getElementById(count + "-username-input").value

        console.log(nameValue)
        console.log(platformValue)
        console.log(usernameValue)

        if(nameValue != "" && platformValue != "" && usernameValue != "")
        {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("gray")
            btn.classList.add("green")
            btn.disabled = false;        
        }
        else {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("green")
            btn.classList.add("gray")
            btn.disabled = true;    
        }

    })

    // Create name Editor
    let userBar = document.createElement('input');
    userBar.setAttribute("type", "text");
    userBar.setAttribute("id", count + "-username-input")
    userBar.placeholder = "username";
    userBar.addEventListener('change', (e) =>{
        
        let nameValue = nameBar.value
        let platformValue = platformBar.value
        let usernameValue = userBar.value

        // let nameValue = document.getElementById(count + "-name-input").value
        // let platformValue = document.getElementById(count + "-platform-input").value
        // let usernameValue = document.getElementById(count + "-username-input").value

        console.log(nameValue)
        console.log(platformValue)
        console.log(usernameValue)

        if(nameValue != "" && platformValue != "" && usernameValue != "")
        {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("gray")
            btn.classList.add("green")
            btn.disabled = false;        
        }
        else {
            let btn = document.getElementById( count + "-save-btn")
            btn.classList.remove("green")
            btn.classList.add("gray")
            btn.disabled = true;    
        }

    })

    // Create save buttton
    let saveBtn = document.createElement('button');
    saveBtn.setAttribute("id",  count + "-save-btn" )
    saveBtn.classList.add('gray');
    saveBtn.disabled = true;
    let saveIco = document.createElement('img');
    saveIco.setAttribute('src',"../../assets/icons/save_24px_outlined.svg");
    saveBtn.appendChild(saveIco);
    saveBtn.addEventListener("click", (e) => {

        // get  text input values
        let nameData = document.getElementById(count + "-name-input").value
        let platformData = document.getElementById(count + "-platform-input").value
        let usernameData = document.getElementById( count + "-username-input").value
        
        // function to update contact values
        // UpdateContact(data[i].id, { 
        //         "Name": nameData,
        //         "Platform": platformData,
        //         "Username":usernameData
        //     }
        // )
    })

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("id",  count + "-delete-btn" )
    deleteBtn.classList.add('red')
    let deleteIco = document.createElement('img')
    deleteIco.setAttribute('src',"../../assets/icons/delete_forever_24px_outlined.svg")
    deleteBtn.appendChild(deleteIco)
    deleteBtn.addEventListener("click", (e) => {
        DeleteListing( count + "-listing")
        //DeleteContact()
    })

    // Append items to listing
    textInputs.appendChild(nameBar)
    textInputs.appendChild(platformBar)
    textInputs.appendChild(userBar)
    btnInputs.appendChild(saveBtn)
    btnInputs.appendChild(deleteBtn)
    listing.appendChild(textInputs)
    listing.appendChild(btnInputs)

    // Append listing to list
    document.getElementById("contacts-list").appendChild(listing);

}

function init() {

    // Test Function
    ListContacts(testData)

    //EVENT LISTENERS
    //
    document.getElementById("new-listing-btn").addEventListener("click", (e) => {
        console.log("new-listing-btn function called")
        NewListing();
    })

}