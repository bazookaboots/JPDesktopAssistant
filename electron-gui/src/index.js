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

    // Sign In btn
    document.getElementById("signin-btn").addEventListener("click", (e) => {
        console.log("signin-btn pressed");
        document.getElementById("signin-form").style.display = "flex";
        toggleMenu();
    })

}


function toggleMenu() {
    
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