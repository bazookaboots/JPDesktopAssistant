const { ipcRenderer } = require('electron')
const { LoggedInMenu } = require('./components/menu-loggedin/menu-loggedin-comp')
const { LoggedOutMenu } = require('./components/menu-loggedout/menu-loggedout-comp')
const { LoginPage } = require('./components/page-login/page-login-comp')
const { RegisterPage } = require('./components/page-register/page-register-comp')


function killChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

//LOAD COMPONENTS
ipcRenderer.send('get-state')

ipcRenderer.on('change-state', (event, arg) => {
    switch (arg) {
        case 'loggedin':
            console.log("rendering loggedin component")
            container = document.getElementById("menu-container")
            killChildren(container)
            menuLoggedIn = document.createElement('menu-logged-in')
            container.appendChild(menuLoggedIn)

            break;
        case 'loggedout':
            console.log("rendering loggedin component")
            container = document.getElementById("menu-container")
            killChildren(container)
            menuLoggedOut = document.createElement('menu-logged-out')
            container.appendChild(menuLoggedOut)

            break;

        default:
            break;
    }
})
ipcRenderer.on('login-user', () => {

})


// EVENT LISTENERS
//Calls the event to close the GUI
document.getElementById("close-btn").addEventListener("click", (e) => {
    ipcRenderer.send('close-app')
})

//Calls the IPC event to start the PAL Engine
document.getElementById("startpal-btn").addEventListener("click", (e) => {
    ipcRenderer.send('spawn-engine')
})

//initialize and watch online status
if (navigator.onLine) document.getElementById("online-tag").style.backgroundColor = "greenyellow";
else document.getElementById("online-tag").style.backgroundColor = "red";
window.addEventListener('online', (e) => { document.getElementById("online-tag").style.backgroundColor = "greenyellow"; })
window.addEventListener('offline', (e) => { document.getElementById("online-tag").style.backgroundColor = "red"; })



//Opens menu on menu-btn click event
document.getElementById("menu-btn").addEventListener("click", async (e) => {
    //console.log("menu-btn pressed");
    toggleMenu();
})

//Closes menu on close-menu-btn click event
document.getElementById("non-menu-area").addEventListener("click", (e) => {
    //console.log("non-menu-area function called")
    toggleMenu();
})

//Hides register page when back of register area is clicked
document.getElementById("signup-form").addEventListener("click", (e) => {
    //console.log("exit signup area clicked");
    toggleRegisterPage();
})

//Blocks clicks on the register page from propagating to the back of the register area
document.getElementById("signup-container").addEventListener("click", (e) => {
    //console.log("signup area clicked");
    e.stopPropagation();
})

//Hides login page when back of login area is clicked
document.getElementById("login-form").addEventListener("click", (e) => {
    //console.log("exit login area clicked");
    toggleLoginPage();
})

//Blocks clicks on the login page from propagating to the back of the login area
document.getElementById("login-container").addEventListener("click", (e) => {
    //console.log("login area clicked");
    e.stopPropagation();
})



// This registers the functionality for when the register form's submit button is hit
document.getElementById("btn-register-form").addEventListener("click", (e) => {
    username = document.getElementById('username-register-input').value
    email = document.getElementById('email-register-input').value
    password = document.getElementById('password-register-input').value
    passwordc = document.getElementById('passwordc-register-input').value
    if (password === passwordc) {
        RegisterUser(username, email, password)
        toggleRegisterPage()
    } else {
        document.getElementById('password-register-input').value = ''
        document.getElementById('passwordc-register-input').value = ''
        document.getElementById('password-register-input').style.border = '2px solid red'
        document.getElementById('passwordc-register-input').style.border = '2px solid red'
    }
})
// This registers the functionality for when the login form's submit button is hit
document.getElementById("btn-login-form").addEventListener("click", (e) => {
    email = document.getElementById('email-login-input').value
    password = document.getElementById('password-login-input').value
    LoginUser(email, password, authTokens, HandleLoginResponse)
})

/**
 * Toggles the visibility of the side menu in the HTML document
 * @name toggleMenu
 * @memberof Main:main.js
 */
function toggleMenu() {
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