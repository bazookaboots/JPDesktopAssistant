const { BrowserWindow } = require('electron').remote

const LoggedOutMenu = '<div id="btn-login">Log In</div>' +
    '<div id="btn-settings"> Settings</div>' +
    '<div style="margin-top:auto;padding-bottom:16px;">' +
    '<button id="btn-create-account" class="formBtn"> Create Account </button>' +
    '</div>'
const LoggedInMenu = '<div id="btn-account">Account</div>' +
    '<div id="btn-settings">Settings</div>' +
    '<div id="btn-contacts">Contacts</div>' +
    '<div style="margin-top:auto;padding-bottom:16px;">' +
    '<button id="btn-logout" class="formBtn red" style="margin-top:auto;"> Logout </button>' +
    '</div>'

function init() {

    RenderLoggedOut()

    //Initializes the online status of the online text
    if (window.navigator.onLine) {
        document.getElementById("status").innerHTML = "online";
        document.getElementById("status").style.color = "greenyellow";
    }



    // EVENT LISTENERS

    //Hides register page when back of register area is clicked
    document.getElementById("signup-form").addEventListener("click", (e) => {
        console.log("exit signup area clicked");
        toggleRegisterPage();
    })

    //Blocks clicks on the register page from propagating to the back of the register area
    document.getElementById("signup-container").addEventListener("click", (e) => {
        console.log("signup area clicked");
        e.stopPropagation();
    })

    //Hides login page when back of login area is clicked
    document.getElementById("login-form").addEventListener("click", (e) => {
        console.log("exit login area clicked");
        toggleLoginPage();
    })

    //Blocks clicks on the login page from propagating to the back of the login area
    document.getElementById("login-container").addEventListener("click", (e) => {
        console.log("login area clicked");
        e.stopPropagation();
    })

    //Watches for the app to go online and updates the indicator
    window.addEventListener('online', (e) => {
        document.getElementById("status").innerHTML = "online";
        document.getElementById("status").style.color = "greenyellow";
    })

    //Watches for the app to go offline and updates the indicator
    window.addEventListener('offline', (e) => {
        document.getElementById("status").innerHTML = "offline";
        document.getElementById("status").style.color = "red";
    })

    //Closes window on close button click
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    })

    //Opens menu on menu-btn click event
    document.getElementById("menu-btn").addEventListener("click", async(e) => {
        console.log("menu-btn pressed");
        toggleMenu();
    })

    //Closes menu on close-menu-btn click event
    document.getElementById("non-menu-area").addEventListener("click", (e) => {
        console.log("non-menu-area function called")
        toggleMenu();
    })




    // This registers the functionality for when the register form's submit button is hit
    document.getElementById("btn-register-form").addEventListener("click", (e) => {
            username = document.getElementById('username-register-input').value
            email = document.getElementById('email-register-input').value
            password = document.getElementById('password-register-input').value
            passwordc = document.getElementById('passwordc-register-input').value
            if (password === passwordc) {
                CreateUser(username, email, password)
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
        LoginUser(email, password) //TODO clear form if user is not found and make it red
        toggleLoginPage()
        RenderLoggedIn() //TODO add validation before this is ran
    })

}

/**
 * Toggles the visibility of the side menu in the HTML document
 * @name toggleMenu
 * @memberof Main:main.js
 */
function toggleMenu() {
    console.log("toggleMenu() Called")
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
    console.log("toggleLoginPage() Called")
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
    console.log("toggleSignupPage() Called")
    if (document.getElementById("signup-form").style.display == "none") {
        document.getElementById("signup-form").style.display = "flex";
    } else {
        document.getElementById("signup-form").style.display = "none";
        //TODO clear the inputs of the register page when it is closed
    }
}

function RenderLoggedIn() {
    document.getElementById('menu-container').innerHTML = LoggedInMenu

    //Creates Contacts window when btn-contacts is clicked
    document.getElementById("btn-contacts").addEventListener("click", (e) => {
        console.log("btn-contacts pressed");
        createContactsWindow();
    })

    //Creates Account window when btn-account is clicked
    document.getElementById("btn-account").addEventListener("click", (e) => {
        console.log("btn-account pressed");
        createAccountWindow();
    })


    //Creates Settings window when settings-btn is clicked
    document.getElementById("btn-settings").addEventListener("click", (e) => {
        console.log("btn-settings pressed");
        createSettingsWindow();
    })

    //Makes login page visible on login-btn click event
    document.getElementById("btn-logout").addEventListener("click", (e) => {
        console.log("btn-logout pressed");
        RenderLoggedOut()
    })
}

function RenderLoggedOut() {
    document.getElementById('menu-container').innerHTML = LoggedOutMenu

    //Makes login page visible on login-btn click event
    document.getElementById("btn-login").addEventListener("click", (e) => {
        console.log("btn-login pressed");
        toggleLoginPage();
        toggleMenu();
    })

    //Makes register page visible on signup-btn click event
    document.getElementById("btn-create-account").addEventListener("click", (e) => {
        console.log("btn-create-account pressed");
        toggleRegisterPage();
        toggleMenu();
    })


    //Creates Settings window when settings-btn is clicked
    document.getElementById("btn-settings").addEventListener("click", (e) => {
        console.log("btn-settings pressed");
        createSettingsWindow();
    })
}