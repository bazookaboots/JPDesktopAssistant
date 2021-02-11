
const { BrowserWindow } = require('electron').remote


function init() {    
    
    //Initializes the online status of the online text
    if(window.navigator.onLine){
        document.getElementById("status").innerHTML = "online";
        document.getElementById("status").style.color = "greenyellow";
    }

    // EVENT LISTENERS

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

    //Closes menu on close-menu-btn click event
    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
        console.log("close-menu-btn function called")   
        toggleMenu();
    })

    //Opens menu on menu-btn click event
    document.getElementById("menu-btn").addEventListener("click", async (e) => {
        console.log("menu-btn pressed");
        toggleMenu();
    })

    //Makes login page visible on login-btn click event
    document.getElementById("login-btn").addEventListener("click", (e) => {
        console.log("login-btn pressed");
        toggleLoginPage();
        toggleMenu();
        renderLogButton();
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

    //Makes register page visible on signup-btn click event
    document.getElementById("signup-btn").addEventListener("click", (e) => {
        console.log("signup-btn pressed");
        toggleRegisterPage();
        toggleMenu();
    })

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

    //Creates Contacts window when contacts-btn is clicked
    document.getElementById("contacts-btn").addEventListener("click", (e) => {
        console.log("conatcts-btn pressed");
        createContactsWindow();
    })

    //Creates Settings window when settings-btn is clicked
    document.getElementById("settings-btn").addEventListener("click", (e) => {
        console.log("settings-btn pressed");
        createSettingsWindow();
    })

    // This registers the functionality for when the register form's submit button is hit
    document.getElementById("register-form-btn").addEventListener("click", (e) => {
        username = document.getElementById('username-register-input').value
        email = document.getElementById('email-register-input').value
        password = document.getElementById('password-register-input').value
        passwordc = document.getElementById('passwordc-register-input').value
        CreateUser(username,email,password) //TODO find the proper way to use password confirmation
    })
    // This registers the functionality for when the login form's submit button is hit
    document.getElementById("login-form-btn").addEventListener("click", (e) => {
        email = document.getElementById('email-login-input').value
        password = document.getElementById('password-login-input').value
        LoginUser(email,password) //TODO find the proper way to use password confirmation
    })
    
}

/**
 * Toggles the visibility of the side menu in the HTML document
 * @name POST/login
 * @memberof Main:main.js
 */
function toggleMenu() {
    console.log("toggleMenu() Called")
    if(document.getElementById("menu").style.display == "none")
    {
        document.getElementById("menu").style.display = "block";
        
        document.getElementById("menu-btn").className = "menuBtnOpen";  
    }
    else{
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
    if(document.getElementById("login-form").style.display == "none")
    {
        document.getElementById("login-form").style.display = "flex"; 
    }
    else{
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
    if(document.getElementById("signup-form").style.display == "none")
    {
        document.getElementById("signup-form").style.display = "flex"; 
    }
    else{
        document.getElementById("signup-form").style.display = "none";
        //TODO clear the inputs of the register page when it is closed
    }
}

function renderLogButton() {
    console.log("renderLogButton() Called")
    if(document.isLoggedIn == true){
        document.getElementById("logbtn-container").innerHTML = document.getElementById("login-btn").innerHTML
    }
    else{
        document.getElementById("logbtn-container").innerHTML = document.getElementById("signup-btn").innerHTML
    }
}