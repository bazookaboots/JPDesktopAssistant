const { ipcRenderer } = require('electron')
const { LoggedInMenu } = require('./components/menu-loggedin/menu-loggedin-comp')
const { LoggedOutMenu } = require('./components/menu-loggedout/menu-loggedout-comp')
const { LoginPage } = require('./components/page-login/page-login-comp')
const { RegisterPage } = require('./components/page-register/page-register-comp')


//DEBUG START
const io = require("socket.io-client"),
ioClient = io.connect("http://localhost:8000", 
    { 
        query: {
        userid: 2222
    }});

ioClient.on("getmessage", (message) => {

    console.log("Got a message")
    console.log(message.message);
})

function killChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

//LOAD COMPONENTS
ipcRenderer.send('get-state')

ipcRenderer.on('change-state', (event, arg) => {
    console.log("change state called")
    let menu_container = document.getElementById("menu-container")
    let username_title = document.getElementById("menu-title")
    switch (arg) {
        case 'loggedin':

            //swap menu type
            killChildren(menu_container)
            menuLoggedIn = document.createElement('menu-logged-in')
            menu_container.appendChild(menuLoggedIn)

            //set username title to "Guest User"
            username_title.innerText = "Logged In"

            break;
        case 'loggedout':

            //swap menu type
            killChildren(menu_container)
            menuLoggedOut = document.createElement('menu-logged-out')
            menu_container.appendChild(menuLoggedOut)

            //set username title to "Guest User"
            username_title.innerText = "Guest User"

            break;

        default:
            break;
    }
})

ipcRenderer.on('change-engine', (event, arg) => {
    let startpal_btn = document.getElementById("startpal-btn")
    switch (arg) {
        case 'off':
            //remove class to main button
            startpal_btn.classList.remove("loggedin_palbtn")
            console.log("removing loggedin_palbtn class to startpal-btn")
            
            break;

        case 'on':
            //remove class to main button
            startpal_btn.classList.add("loggedin_palbtn")
            console.log("removing loggedin_palbtn class to startpal-btn")
            
            break;
    
        default:
            break;
    }
})


// EVENT LISTENERS
//Calls the event to close the GUI
document.getElementById("close-btn").addEventListener("click", (e) => {
    console.log("menu-closed-button pressed");
    ipcRenderer.send('close-mainWin')
})

//Calls the IPC event to start the PAL Engine
document.getElementById("startpal-btn").addEventListener("click", (e) => {
    ipcRenderer.send('toggle-engine')
})

//initialize and watch online status
if (navigator.onLine) document.getElementById("online-tag").style.backgroundColor = "greenyellow";
else document.getElementById("online-tag").style.backgroundColor = "red";
window.addEventListener('online', (e) => { document.getElementById("online-tag").style.backgroundColor = "greenyellow"; })
window.addEventListener('offline', (e) => { document.getElementById("online-tag").style.backgroundColor = "red"; })



//Opens menu on menu-btn click event
document.getElementById("menu-btn").addEventListener("click", async (e) => {
    console.log("menu-btn pressed");
    document.getElementById("menu").classList.remove("hidden")
})

//Closes menu on close-menu-btn click event
document.getElementById("non-menu-area").addEventListener("click", (e) => {
    console.log("non-menu-area function called")
    document.getElementById("menu").classList.add("hidden")
})

document.getElementById("page-container").addEventListener("click", (e) => {
    document.getElementById("page-container").classList.add("hidden")
})

// //Blocks clicks on the login page from propagating to the back of the login area
// document.getElementById("login-container").addEventListener("click", (e) => {
//     //console.log("login area clicked");
//     e.stopPropagation();
// })



// // This registers the functionality for when the register form's submit button is hit
// document.getElementById("btn-register-form").addEventListener("click", (e) => {
//     username = document.getElementById('username-register-input').value
//     email = document.getElementById('email-register-input').value
//     password = document.getElementById('password-register-input').value
//     passwordc = document.getElementById('passwordc-register-input').value
//     if (password === passwordc) {
//         RegisterUser(username, email, password)
//         toggleRegisterPage()
//     } else {
//         document.getElementById('password-register-input').value = ''
//         document.getElementById('passwordc-register-input').value = ''
//         document.getElementById('password-register-input').style.border = '2px solid red'
//         document.getElementById('passwordc-register-input').style.border = '2px solid red'
//     }
// })
// // This registers the functionality for when the login form's submit button is hit
// document.getElementById("btn-login-form").addEventListener("click", (e) => {
//     email = document.getElementById('email-login-input').value
//     password = document.getElementById('password-login-input').value
//     LoginUser(email, password, authTokens, HandleLoginResponse)
// })

/**
 * Toggles the visibility of the side menu in the HTML document
 * @name toggleMenu
 * @memberof Main:main.js
 */
function toggleMenu() {
    const request = {
        message: "This is client 2",
        toid: 1111,
        fromid: 2222
    }

    ioClient.emit("sendmessage", request)
    //console.log("toggleMenu() Called")
    if (document.getElementById("menu").style.display == "none") {
        document.getElementById("menu").style.display = "block";

        document.getElementById("menu-btn").className = "menuBtnOpen";
    } else {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-btn").className = "menuBtnClosed";
    }

}

/**
 * Toggles the visibility of the login page over the main page
 * @name toggleLoginPage
 * @memberof Main:main.js
 */
function toggleLoginPage() {
    //console.log("toggleLoginPage() Called")
    if (document.getElementById("login-form").style.display == "none") {
        document.getElementById("login-form").style.display = "flex";

    } else {
        document.getElementById("login-form").style.display = "none";
        //TODO clear the inputs of the login page when it is closed
    }
}

/**
 * Toggles the visibility of the login page over the main page
 * @name toggleRegisterPage
 * @memberof Main:main.js
 */
function toggleRegisterPage() {
    //console.log("toggleSignupPage() Called")
    if (document.getElementById("signup-form").style.display == "none") {
        document.getElementById("signup-form").style.display = "flex";
    } else {
        document.getElementById("signup-form").style.display = "none";
        //TODO clear the inputs of the register page when it is closed
    }
}



function HandleLoginResponse(response) {
    console.log("HandleLoginResponse received: " + response)
    console.log("jwt_token: " + authTokens.jwt_token)
    if (response === 200) {
        toggleLoginPage()
        RenderLoggedIn()
        return
    } else {
        document.getElementById("alert-login").innerHTML = "Incorrect Username or Password"
        document.getElementById('password-login-input').value = ''
        document.getElementById('email-login-input').value = ''
        document.getElementById('password-login-input').style.border = '2px solid red'
        document.getElementById('email-login-input').style.border = '2px solid red'
    }

}

