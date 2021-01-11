const { BrowserWindow } = require('electron').remote

function init() {
    // Minimize task
    // document.getElementById("min-btn").addEventListener("click", (e) => {
    //     var window = BrowserWindow.getFocusedWindow();
    //     window.minimize();
    // });

    // Maximize window
    // document.getElementById("max-btn").addEventListener("click", (e) => {
    //     var window = BrowserWindow.getFocusedWindow();
    //     if(window.isMaximized()){
    //         window.unmaximize();
    //     }else{
    //         window.maximize();
    //     }
    // });

    // Close app
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")   
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    })

    // Menu button
    document.getElementById("menu-btn").addEventListener("click", (e) => {
        console.log("menu-btn pressed");
        toggleMenu();
    })

    // log In btn
    document.getElementById("login-btn").addEventListener("click", (e) => {
        console.log("login-btn pressed");
        toggleLoginPage();
        toggleMenu();
    })

    // Clicking outside the Log in form
    document.getElementById("login-form").addEventListener("click", (e) => {
        console.log("exit login area clicked");
        toggleLoginPage();
    
    })
    document.getElementById("login-container").addEventListener("click", (e) => {
        console.log("login area clicked");
        e.stopPropagation();    
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