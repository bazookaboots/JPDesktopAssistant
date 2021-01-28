
const { BrowserWindow } = require('electron').remote


function init() {    
    
    //
    if(window.navigator.onLine){
        document.getElementById("status").innerHTML = "online";
        document.getElementById("status").style.color = "greenyellow";
    }

    // EVENT LISTENERS

    //
    window.addEventListener('online', (e) => {
        document.getElementById("status").innerHTML = "online";
        document.getElementById("status").style.color = "greenyellow";
    })

    //
    window.addEventListener('offline', (e) => {
        document.getElementById("status").innerHTML = "offline";        
        document.getElementById("status").style.color = "red";
    })
    
    //
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")   
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    })
    document.getElementById("close-menu-btn").addEventListener("click", (e) => {
        console.log("close-menu-btn function called")   
        toggleMenu();
    })

    //
    document.getElementById("menu-btn").addEventListener("click", (e) => {
        console.log("menu-btn pressed");
        toggleMenu();
    })

    //
    document.getElementById("login-btn").addEventListener("click", (e) => {
        console.log("login-btn pressed");
        GetContacts();
        toggleLoginPage();
        toggleMenu();
        renderLogButton();
    })

    //
    document.getElementById("login-form").addEventListener("click", (e) => {
        console.log("exit login area clicked");
        toggleLoginPage();
    
    })

    //
    document.getElementById("login-container").addEventListener("click", (e) => {
        console.log("login area clicked");
        e.stopPropagation();    
    })

    //
    document.getElementById("signup-btn").addEventListener("click", (e) => {
        console.log("signup-btn pressed");
        toggleSignupPage();
        toggleMenu();
    })

    //
    document.getElementById("signup-form").addEventListener("click", (e) => {
        console.log("exit signup area clicked");
        toggleSignupPage();
    
    })

    //
    document.getElementById("signup-container").addEventListener("click", (e) => {
        console.log("signup area clicked");
        e.stopPropagation();    
    })

    document.getElementById("contacts-btn").addEventListener("click", (e) => {
        console.log("conatcts-btn pressed");
        createContactsWindow();
    })
}


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

function toggleLoginPage() {
    console.log("toggleLoginPage() Called")
    if(document.getElementById("login-form").style.display == "none")
    {
        document.getElementById("login-form").style.display = "flex"; 
    }
    else{
        document.getElementById("login-form").style.display = "none";
    }
}

function toggleSignupPage() {
    console.log("toggleSignupPage() Called")
    if(document.getElementById("signup-form").style.display == "none")
    {
        document.getElementById("signup-form").style.display = "flex"; 
    }
    else{
        document.getElementById("signup-form").style.display = "none";
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